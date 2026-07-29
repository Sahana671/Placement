import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';
import './StudentModule.css';

const StudentModule = () => {
  const [formData, setFormData] = useState({ name: '', department: '', cgpa: '' });
  const [searchId, setSearchId] = useState('');
  const [studentProfile, setStudentProfile] = useState(null);
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_ENDPOINTS.students.base, {
        name: formData.name,
        department: formData.department,
        cgpa: parseFloat(formData.cgpa)
      });
      setMessage(`✔ Registered successfully! Assigned Student ID: ${res.data.id}`);
      setFormData({ name: '', department: '', cgpa: '' });
    } catch (err) {
      setMessage('❌ Registration failed.');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(API_ENDPOINTS.students.byId(searchId));
      setStudentProfile(res.data);
      setMessage('');
    } catch (err) {
      setStudentProfile(null);
      setMessage('❌ Student ID not found.');
    }
  };

  return (
    <div className="module-container">
      <h2>Student Module</h2>
      {message && <div className="alert">{message}</div>}

      <div className="grid-layout">
        <div className="card">
          <h3>1. Register Student</h3>
          <form onSubmit={handleRegister}>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
            <input 
              type="text" 
              placeholder="Department" 
              value={formData.department} 
              onChange={(e) => setFormData({ ...formData, department: e.target.value })} 
              required 
            />
            <input 
              type="number" 
              step="0.01" 
              placeholder="CGPA" 
              value={formData.cgpa} 
              onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })} 
              required 
            />
            <button type="submit">Submit Registration</button>
          </form>
        </div>

        <div className="card">
          <h3>2. View Profile & Status</h3>
          <form onSubmit={handleSearch}>
            <input 
              type="number" 
              placeholder="Enter Student ID" 
              value={searchId} 
              onChange={(e) => setSearchId(e.target.value)} 
              required 
            />
            <button type="submit">Search</button>
          </form>

          {studentProfile && (
            <div className="profile-details">
              <h4>Profile Summary</h4>
              <p><strong>ID:</strong> {studentProfile.id}</p>
              <p><strong>Name:</strong> {studentProfile.name}</p>
              <p><strong>Department:</strong> {studentProfile.department}</p>
              <p><strong>CGPA:</strong> {studentProfile.cgpa}</p>
              <p><strong>Status:</strong> <span className={`badge ${studentProfile.status.toLowerCase()}`}>{studentProfile.status}</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentModule;