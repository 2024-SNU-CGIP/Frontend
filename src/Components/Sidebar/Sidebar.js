import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column bg-light vh-100"
      // position always left
      style={{ width: '250px', position: 'fixed', top: 0, left: 0 }}
    >
      <div className="p-3">
        <h4 className="text-center">My App</h4>
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link active">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/learnmodel" className="nav-link">
            Learn Model
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/addphoto" className="nav-link">
            Add Photo
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/testpatient" className="nav-link">
            Test Patient
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/photodetail" className="nav-link">
            Photo Detail
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;