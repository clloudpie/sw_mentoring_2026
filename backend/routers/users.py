# backend/routers/users.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models import User, UserCreate, UserUpdate


# APIRouter 인스턴스 생성
# prefix="/users" → 이 파일의 모든 경로 앞에 /users 자동으로 붙음
router = APIRouter(prefix="/users", tags=["Users"])

# ── 데이터 모델 ────────────────────────────────────────────

class User(BaseModel):
    id: int
    name: str
    email: str

class UserCreate(BaseModel):
    name: str
    email: str

class UserUpdate(BaseModel):
    name: str | None = None
    email: str | None = None

# ── 임시 데이터 ────────────────────────────────────────────

fake_db: list[User] = [
    User(id=1, name="홍길동", email="hong@email.com"),
    User(id=2, name="김영희", email="kim@email.com"),
]

# ── 엔드포인트 ─────────────────────────────────────────────
# prefix="/users"가 붙으므로 여기선 경로를 짧게 쓸 수 있음

@router.get("", response_model=list[User])        # GET /users
def get_users():
    return fake_db

@router.get("/{user_id}", response_model=User)    # GET /users/{user_id}
def get_user(user_id: int):
    for user in fake_db:
        if user.id == user_id:
            return user
    raise HTTPException(status_code=404, detail="유저를 찾을 수 없습니다.")

@router.post("", response_model=User, status_code=201)  # POST /users
def create_user(body: UserCreate):
    new_id = max(u.id for u in fake_db) + 1
    new_user = User(id=new_id, name=body.name, email=body.email)
    fake_db.append(new_user)
    return new_user

@router.patch("/{user_id}", response_model=User)  # PATCH /users/{user_id}
def update_user(user_id: int, body: UserUpdate):
    for user in fake_db:
        if user.id == user_id:
            if body.name is not None:
                user.name = body.name
            if body.email is not None:
                user.email = body.email
            return user
    raise HTTPException(status_code=404, detail="유저를 찾을 수 없습니다.")

@router.delete("/{user_id}", status_code=204)     # DELETE /users/{user_id}
def delete_user(user_id: int):
    for index, user in enumerate(fake_db):
        if user.id == user_id:
            fake_db.pop(index)
            return
    raise HTTPException(status_code=404, detail="유저를 찾을 수 없습니다.")