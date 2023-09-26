import React from 'react';

interface User {
  username: string;
}

interface SidebarProps {
  user?: User | null;
  onLogoutClick?: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogoutClick, isOpen }) => {
  const sidebarClass = isOpen ? 'sidebar close' : 'sidebar';
  return (
    <div className={sidebarClass}>
      <div className="mt-5">
        <div className="sidebar-logo">
          {user && (
            <>
              <img src="src/assets/niki.jpeg" alt="User Image" className="user-image" id="user-image" />
              <h3 id="user-fullname">{user.username}</h3>
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
          <li className="sidebar-menu-item" id="add-book-trigger">
            <a href="#" className="sidebar-link">
              Add Book
            </a>
          </li>
        </ul>
      </div>

      <div className="sidebar-logout">
        {user && (
          <a href="#" className="logout-link" id="logout-link" onClick={onLogoutClick}>
            <div className="logout-text">Logout</div>
          </a>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
