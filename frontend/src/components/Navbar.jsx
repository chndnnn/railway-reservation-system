import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🚂 RailReserve</Link>
      <div className="navbar-links">
        <Link to="/" className={pathname === '/' ? 'active' : ''}>Search</Link>
        <Link to="/bookings" className={pathname === '/bookings' ? 'active' : ''}>My Bookings</Link>
      </div>
    </nav>
  );
}
