import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  user?: string | null;
  openAddBookModal: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ user, isOpen, openAddBookModal }) => {
  const sidebarClass = isOpen ? 'sidebar close' : 'sidebar';
  // const navigate = useNavigate();

  const isAdminUser = user && user.substring(0, 5) === 'admin';
  const handleLogout = () => {
    localStorage.clear();
    location.reload();
    // navigate('/home');
  };

  return (
    <div className={sidebarClass}>
      <div className="mt-5">
        <div className="sidebar-logo">
          {user === 'Guest' ? (
          <Link to="/">
          <button type='button' className="btn btn-outline-dark border-3 btn-lg login-link" id="login-link">
            <div className="login-text text-black">Login</div>
          </button>
          </Link>
          ) : (
          <>
            <img src="src/assets/niki.jpeg" alt="User Image" className="user-image" />
            <h3 id="user-fullname">{user}</h3>
          </>
          )}
        </div>

        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <a href="#" className="sidebar-link">
              Explore
            </a>
          </li>
          <li className="sidebar-menu-item">
            <a href="#" className="sidebar-link">
              History
            </a>
          </li>
          {isAdminUser && (
          <li className="sidebar-menu-item" id="add-book-trigger">
            <a href="#" className="sidebar-link" onClick={openAddBookModal}>
              Add Book
            </a>
          </li>
          )}
        </ul>
      </div>

      <div className="sidebar-logout">
        {user && user !== 'Guest' && (
        <button type='button' className="btn btn-danger" id="logout-link" onClick={handleLogout}>
          <div className="text-center">Logout</div>
        </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
