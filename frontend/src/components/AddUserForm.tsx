// src/components/AddUserForm.tsx

import { useState } from 'react';
import type { User } from '../types';
import { BASE_URL } from '../api/config';

interface AddUserFormProps {
  onAdd: (newUser: User) => void; // 생성된 유저를 부모로 전달
}

function AddUserForm({ onAdd }: AddUserFormProps) {
  const [name, setName]       = useState<string>('');
  const [email, setEmail]     = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!name || !email) {
      alert('이름과 이메일을 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        throw new Error(`생성 실패: ${res.status}`);
      }

      const newUser: User = await res.json(); // 서버가 반환한 유저 (id 포함)
      onAdd(newUser);   // 부모(App)에게 새 유저 전달
      setName('');      // 입력창 초기화
      setEmail('');

    } catch (err) {
      alert('유저 추가에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? '추가 중...' : '추가'}
      </button>
    </div>
  );
}

export default AddUserForm;