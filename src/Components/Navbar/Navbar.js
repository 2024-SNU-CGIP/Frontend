import React from 'react';

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-light bg-light"
      style={{
        marginLeft: '250px',
        position: 'fixed',
        width: 'calc(100% - 250px)',
        zIndex: 2,
        top: 0,
        borderRight: '1px solid #ddd',
      }}
    >
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">서울관악치과병원</span>
        <div>
          {/* <button className="btn btn-outline-primary me-2">🔔 Notifications</button> */}
          {/* <button className="btn btn-outline-secondary">⚙️ Settings</button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;