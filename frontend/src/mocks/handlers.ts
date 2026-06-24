// src/mocks/handlers.ts

import { http, HttpResponse } from 'msw';
import type { User } from '../types';

// 임시 데이터 저장소 (메모리 기반)
const users: User[] = [
  { id: 1, name: '홍길동', email: 'hong@email.com' },
  { id: 2, name: '김영희', email: 'kim@email.com' },
  { id: 3, name: '이철수', email: 'lee@email.com' },
];

let nextId = 4;

export const handlers = [

  // GET /api/users — 전체 목록 조회
  http.get('/api/users', () => {
    return HttpResponse.json(users);
  }),

  // GET /api/users/:id — 단건 조회
  http.get('/api/users/:id', ({ params }) => {
    const id = Number(params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return HttpResponse.json(
        { detail: '유저를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json(user);
  }),

  // POST /api/users — 유저 생성
  http.post('/api/users', async ({ request }) => {
    const body = await request.json() as { name: string; email: string };

    const newUser: User = {
      id: nextId++,
      name: body.name,
      email: body.email,
    };

    users.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),

  // PATCH /api/users/:id — 유저 수정
  http.patch('/api/users/:id', async ({ params, request }) => {
    const id = Number(params.id);
    const body = await request.json() as { name?: string; email?: string };

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { detail: '유저를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    users[index] = { ...users[index], ...body };
    return HttpResponse.json(users[index]);
  }),

  // DELETE /api/users/:id — 유저 삭제
  http.delete('/api/users/:id', ({ params }) => {
    const id = Number(params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { detail: '유저를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    users.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];