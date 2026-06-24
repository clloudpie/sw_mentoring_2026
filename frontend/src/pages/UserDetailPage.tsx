// src/pages/UserDetailPage.tsx

import { useParams } from 'react-router-dom';

function UserDetailPage() {
  // /users/42 → params.id = "42" (항상 string)
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>{id}번 유저 상세 페이지</h1>
    </div>
  );
}

export default UserDetailPage;