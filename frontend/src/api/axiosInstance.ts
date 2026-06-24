// src/api/axiosInstance.ts — baseURL에서 localhost 제거

import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL을 비워두면 상대 경로로 요청
  // 나중에 백엔드 배포 시 여기에 백엔드 URL 입력
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;