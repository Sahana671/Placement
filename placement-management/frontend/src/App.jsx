import React, { useState } from 'react';
import Navbar from './components/Navbar';
import StudentModule from './components/StudentModule';
import CompanyModule from './components/CompanyModule';
import ManagementDashboard from './components/ManagementDashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('student');

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="content">
        {activeTab === 'student' && <StudentModule />}
        {activeTab === 'company' && <CompanyModule />}
        {activeTab === 'management' && <ManagementDashboard />}
      </main>
    </div>
  );
}

export default App;