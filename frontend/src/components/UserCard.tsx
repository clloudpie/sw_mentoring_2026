// src/components/UserCard.tsx

import { useState } from 'react';
import type { User } from '../types';
import { BASE_URL } from '../api/config';

interface UserCardProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onDelete: (id: number) => void;
}

function UserCard({ user, onUpdate, onDelete }: UserCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName]   = useState<string>(user.name);
  const [editEmail, setEditEmail] = useState<string>(user.email);
  const [loading, setLoading]     = useState<boolean>(false);

  // 수정 저장
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, email: editEmail }),
      });

      if (!res.ok) throw new Error('수정 실패');

      const updatedUser: User = await res.json();
      onUpdate(updatedUser); // 부모에게 수정된 유저 전달
      setIsEditing(false);

    } catch (err) {
      alert('수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 수정 취소 — 원래 값으로 되돌리기
  const handleCancel = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setIsEditing(false);
  };

  // 편집 모드
  if (isEditing) {
    return (
      <div style={{ border: '1px solid #4A90E2', padding: '12px', marginBottom: '8px', borderRadius: '8px' }}>
        <input value={editName} onChange={(e) => setEditName(e.target.value)} />
        <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
        <button onClick={handleUpdate} disabled={loading}>
          {loading ? '저장 중...' : '저장'}
        </button>
        <button onClick={handleCancel}>취소</button>
      </div>
    );
  }

  // 일반 모드
  return (
    <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px', borderRadius: '8px' }}>
      <strong>{user.name}</strong>
      <p style={{ margin: '4px 0', color: '#555' }}>{user.email}</p>
      <button onClick={() => setIsEditing(true)}>수정</button>
      <button onClick={() => onDelete(user.id)} style={{ color: 'red', marginLeft: '8px' }}>삭제</button>
    </div>
  );
}

export default UserCard;