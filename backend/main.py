from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS 설정 (React에서 API 호출을 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 응답 모델 정의 (TypeScript의 interface와 유사한 역할)
class HelloResponse(BaseModel):
    message: str

# 기본 라우트 (GET /hello)
@app.get("/hello", response_model=HelloResponse)
def say_hello() -> HelloResponse:
    return HelloResponse(message="안녕하세요, FastAPI!")