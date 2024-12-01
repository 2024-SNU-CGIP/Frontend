import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Containers/Dashboard/Dashboard';
import Navbar from './Components/Navbar/Navbar';
import LearnModel from './Containers/LearnModel/LearnModel';
import AddPhoto from './Containers/AddPhoto/AddPhoto';
import TestPatient from './Containers/TestPatient/TestPatient';
import PhotoDetail from './Containers/PhotoDetail/PhotoDetail';



function App() {
  return (
    <div>
      {/* Sidebar */}
      <Sidebar />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div
        style={{
          marginLeft: '250px',
          marginTop: '56px',
          padding: '20px',
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center', /* Horizontally center */
          alignItems: 'flex-start', /* Align to the top */
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/learnmodel" element={<LearnModel />} />
          <Route path="/addphoto" element={<AddPhoto />} />
          <Route path="/testpatient" element={<TestPatient />} />
          <Route path="/photodetail" element={<PhotoDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
