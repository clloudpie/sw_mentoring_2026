// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div>
      <Header />  {/* 모든 페이지에서 공통으로 보이는 헤더 */}

      <Routes>
        {/* path: URL 경로 / element: 보여줄 컴포넌트 */}
        <Route path="/"             element={<UsersPage />} />
        <Route path="/users"        element={<UsersPage />} />
        <Route path="/users/:id"    element={<UserDetailPage />} />  {/* :id = URL 파라미터 */}
        <Route path="*"             element={<NotFoundPage />} />    {/* 없는 경로 처리 */}
      </Routes>
    </div>
  );
}

export default App;