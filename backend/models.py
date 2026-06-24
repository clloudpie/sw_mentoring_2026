# backend/models.py

from pydantic import BaseModel

# TypeScript의 interface User와 동일한 역할
class User(BaseModel):
    id: int
    name: str
    email: str

# 유저 생성 시 요청 body 모델 (id는 서버에서 자동 부여)
class UserCreate(BaseModel):
    name: str
    email: str

# 유저 수정 시 요청 body 모델 (모든 필드 선택적)
class UserUpdate(BaseModel):
    name: str | None = None   # None이 기본값 = 안 보내도 됨
    email: str | None = None