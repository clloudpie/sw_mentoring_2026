// src/api/users.ts

import axiosInstance from './axiosInstance';
import type { User } from '../types';

// BASE_URL 없이 상대 경로 사용
export const fetchUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get<User[]>('/api/users');
  return res.data;
};

export const createUser = async (name: string, email: string): Promise<User> => {
  const res = await axiosInstance.post<User>('/api/users', { name, email });
  return res.data;
};

export const updateUser = async (id: number, name: string, email: string): Promise<User> => {
  const res = await axiosInstance.patch<User>(`/api/users/${id}`, { name, email });
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/users/${id}`);
};