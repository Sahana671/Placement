import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';
import './CompanyModule.css';

const CompanyModule = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({ name: '', role: '', minCgpa: '', packageLPA: '' });
  const [message, setMessage] = useState('');

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.companies.base);
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_ENDPOINTS.companies.base, {
        name: formData.name,
        role: formData.role,
        minCgpa: parseFloat(formData.minCgpa),
        packageLPA: parseFloat(formData.packageLPA)
      });
      setMessage(`✔ Posted Job Requirement! ID: ${res.data.id}`);
      setFormData({ name: '', role: '', minCgpa: '', packageLPA: '' });
      fetchCompanies();
    } catch (err) {
      setMessage('❌ Failed to post requirement.');
    }
  };

  return (
    <div className="module-container">
      <h2>Company Management Module</h2>
      {message && <div className="alert">{message}</div>}

      <div className="grid-layout">
        <div className="card">
          <h3>Post New Job Requirement</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Company Name" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
            <input 
              type="text" 
              placeholder="Job Role" 
              value={formData.role} 
              onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
              required 
            />
            <input 
              type="number" 
              step="0.01" 
              placeholder="Minimum CGPA Cutoff" 
              value={formData.minCgpa} 
              onChange={(e) => setFormData({ ...formData, minCgpa: e.target.value })} 
              required 
            />
            <input 
              type="number" 
              step="0.01" 
              placeholder="Package (LPA)" 
              value={formData.packageLPA} 
              onChange={(e) => setFormData({ ...formData, packageLPA: e.target.value })} 
              required 
            />
            <button type="submit">Post Job Requirement</button>
          </form>
        </div>

        <div className="card full-width">
          <h3>Active Job Postings</h3>
          {companies.length === 0 ? (
            <p>No job requirements posted yet.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Company Name</th>
                  <th>Role</th>
                  <th>CGPA Cutoff</th>
                  <th>Package (LPA)</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.role}</td>
                    <td>{c.minCgpa}</td>
                    <td>{c.packageLPA} LPA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyModule;