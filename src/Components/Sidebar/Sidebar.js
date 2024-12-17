import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SNUDHLogo from '../../img/SNUDH.png';
import styles from './Sidebar.module.css';
import { useState } from 'react';

const Sidebar = () => {

    const MAXNAV = 5;

    const location = useLocation(); // Access the current route


    const isActive = (path) => {
        return "nav-link " + (location.pathname === path ? "active" : "");
    };


  return (
    <div
      className="d-flex flex-column bg-light vh-100"
      // position always left
      style={{ width: '250px', position: 'fixed', top: 0, left: 0 }}
    >
      <div className="p-3 d-flex justify-content-center">
        <img src={SNUDHLogo} alt="SNUDH" width="144px" />
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className={isActive("/")}>
            Predict History
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/learnmodel" className={isActive("/learnmodel")}>
            Learn Model
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/addphoto" className={isActive("/addphoto")}>
            Add Photo
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/testpatient" className={isActive("/testpatient")}>
            Test Patient
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/imagelist" className={isActive("/imagelist")}>
            Image List
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;