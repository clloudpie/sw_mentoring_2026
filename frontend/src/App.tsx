// src/App.tsx — POST 부분 추가

import { useState, useEffect } from 'react';
import type { User, UserCreate } from './types';

function App() {
  const [users, setUsers]   = useState<User[]>([]);
  const [name, setName]     = useState<string>('');
  const [email, setEmail]   = useState<string>('');

  // GET: 목록 조회 (위와 동일)
  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  // POST: 새 유저 생성
  const handleSubmit = async () => {
    const body: UserCreate = { name, email };

    const res = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),  // 객체 → JSON 문자열 변환
    });

    if (res.ok) {
      const newUser: User = await res.json();
      setUsers([...users, newUser]); // 기존 목록에 새 유저 추가
      setName('');                   // 입력창 초기화
      setEmail('');
    }
  };

  return (
    <div>
      <h1>유저 목록</h1>

      {/* 유저 추가 폼 */}
      <div>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmit}>추가</button>
      </div>

      {/* 유저 목록 */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            [{user.id}] {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;