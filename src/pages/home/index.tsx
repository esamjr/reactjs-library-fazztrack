import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Carousel from '../../components/Carousel';
import BookList from '../../components/BookList';
import './index.css';

const Home: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Navbar onSidebarToggle={toggleSidebar} />
      <div className="container-fluid">
        <div className="carousel" style={{ marginTop: '20px' }}>
          <Carousel />
        </div>
        {/* <div className="container" style={{ marginTop: '2%' }}> */}
          {/* <h2>List Book</h2> */}
          <BookList />
        {/* </div> */}
        <Sidebar isOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default Home;
