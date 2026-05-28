from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS 설정 (지난 시간과 동일)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── 데이터 모델 정의 ──────────────────────────────────────

class User(BaseModel):
    id: int
    name: str
    email: str

# 임시 데이터 (나중에 DB로 교체)
fake_users: list[User] = [
    User(id=1, name="홍길동", email="hong@email.com"),
    User(id=2, name="김영희", email="kim@email.com"),
    User(id=3, name="이철수", email="lee@email.com"),
]

# ── API 엔드포인트 ────────────────────────────────────────

# GET /users → 전체 유저 목록
@app.get("/users", response_model=list[User])
def get_users() -> list[User]:
    return fake_users

# GET /users/{user_id} → 특정 유저 1명
@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: int) -> User:
    for user in fake_users:
        if user.id == user_id:
            return user
    # 못 찾으면 404 에러 반환
    raise HTTPException(status_code=404, detail="유저를 찾을 수 없습니다.")

# 추가: 유저 생성 요청에 사용할 모델 (id는 서버가 자동 부여)
class UserCreate(BaseModel):
    name: str
    email: str

# POST /users → 새 유저 추가
@app.post("/users", response_model=User, status_code=201)
def create_user(body: UserCreate) -> User:
    new_id = max(u.id for u in fake_users) + 1  # 가장 큰 id + 1
    new_user = User(id=new_id, name=body.name, email=body.email)
    fake_users.append(new_user)
    return new_user