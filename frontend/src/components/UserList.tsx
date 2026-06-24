// src/components/UserList.tsx

import type { User } from '../types';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  onUpdate: (updatedUser: User) => void;
  onDelete: (id: number) => void;
}

function UserList({ users, onUpdate, onDelete }: UserListProps) {
  if (users.length === 0) return <p>등록된 유저가 없습니다.</p>;

  return (
    <div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default UserList;