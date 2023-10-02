// Navbar.tsx
import React from 'react';
interface NavbarProps {
  onSidebarToggle: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ onSidebarToggle }) => {
  return (
    <section className="header sticky-top">
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow" style={{ zIndex: 1 }}>
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <button id="menu-toggle" type="button" onClick={onSidebarToggle}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                All Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Categories 1</a></li>
                <li><a className="dropdown-item" href="#">Categories 2</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                All Time
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                <li><a className="dropdown-item" href="#">Time 1</a></li>
                <li><a className="dropdown-item" href="#">Time 2</a></li>
              </ul>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 mx-auto">
            <input className="form-control mr-sm-2" type="search" placeholder="Search book" aria-label="Search"/>
          </form>
        </div>
        <a className="navbar-brand" href="#">
          <img src="src/assets/bookshelf.png" alt="Bookshelf" className="bookshelf"/>
          Library
        </a>
      </div>
    </nav>
  </section>
  );
};

export default Navbar;
