import React from 'react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">🎓 Placement Portal</div>
      <div className="nav-links">
        <button 
          className={activeTab === 'student' ? 'active' : ''} 
          onClick={() => setActiveTab('student')}
        >
          Student Module
        </button>
        <button 
          className={activeTab === 'company' ? 'active' : ''} 
          onClick={() => setActiveTab('company')}
        >
          Company Module
        </button>
        <button 
          className={activeTab === 'management' ? 'active' : ''} 
          onClick={() => setActiveTab('management')}
        >
          Management Dashboard
        </button>
      </div>
    </nav>
  );
};

export default Navbar;