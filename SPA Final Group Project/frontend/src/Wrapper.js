import { Link, Outlet } from 'react-router-dom';

export default function Wrapper() {
  return (
    <>
      <header>
        <Link to="/stores">View all stores</Link>
        <Link to="/stores/new">Create new store</Link>
      </header>

      <Outlet />
    </>
  );
}