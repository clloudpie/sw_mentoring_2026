// src/components/Header.tsx — Link로 메뉴 만들기

import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      {/* <a href="..."> 대신 Link 사용 — 새로고침 없이 이동 */}
      <Link to="/">홈</Link>
      <Link to="/users">유저 목록</Link>
    </nav>
  );
}

export default Header;