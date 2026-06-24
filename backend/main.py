# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users  # 라우터 파일 import

app = FastAPI(title="유저 관리 API")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록 — 여기에 한 줄씩 추가하면 됨
app.include_router(users.router)

# 기본 라우트
@app.get("/")
def root():
    return {"message": "서버 정상 동작 중"}