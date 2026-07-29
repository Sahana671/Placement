import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';
import './ManagementDashboard.css';

const ManagementDashboard = () => {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [matches, setMatches] = useState({});
  const [statusUpdate, setStatusUpdate] = useState({ id: '', status: 'Placed' });
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const [sRes, cRes] = await Promise.all([
        axios.get(API_ENDPOINTS.students.base),
        axios.get(API_ENDPOINTS.companies.base)
      ]);
      setStudents(sRes.data);
      setCompanies(cRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_ENDPOINTS.students.updateStatus(statusUpdate.id), {
        status: statusUpdate.status
      });
      setMessage(`✔ Status updated for Student ID ${statusUpdate.id}`);
      fetchData();
    } catch (err) {
      setMessage('❌ Failed to update student status.');
    }
  };

  const runAutoMatch = async () => {
    const matchedData = {};
    for (let comp of companies) {
      try {
        const res = await axios.get(API_ENDPOINTS.students.eligible(comp.minCgpa));
        matchedData[comp.id] = res.data;
      } catch (err) {
        console.error(err);
      }
    }
    setMatches(matchedData);
  };

  const placedCount = students.filter(s => s.status === 'Placed').length;
  const placementRate = students.length > 0 ? ((placedCount / students.length) * 100).toFixed(2) : 0;

  return (
    <div className="module-container">
      <h2>Placement Cell Management Dashboard</h2>
      {message && <div className="alert">{message}</div>}

      <div className="stats-card">
        <h3>📈 Overall Placement Statistics</h3>
        <p><strong>Total Students:</strong> {students.length} | <strong>Placed:</strong> {placedCount} | <strong>Placement Rate:</strong> {placementRate}%</p>
      </div>

      <div className="grid-layout">
        <div className="card">
          <h3>Manual Status Update</h3>
          <form onSubmit={handleUpdateStatus}>
            <input 
              type="number" 
              placeholder="Student ID" 
              value={statusUpdate.id} 
              onChange={(e) => setStatusUpdate({ ...statusUpdate, id: e.target.value })} 
              required 
            />
            <select 
              value={statusUpdate.status} 
              onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
            >
              <option value="Placed">Placed</option>
              <option value="Unplaced">Unplaced</option>
            </select>
            <button type="submit">Update Status</button>
          </form>
        </div>

        <div className="card">
          <h3>Drive Matching Engine</h3>
          <button onClick={runAutoMatch} className="btn-match">Process Auto-Matching</button>
        </div>

        {Object.keys(matches).length > 0 && (
          <div className="card full-width">
            <h3>Matching Engine Results</h3>
            {companies.map(comp => (
              <div key={comp.id} className="match-group">
                <h4>{comp.name} - {comp.role} (Cutoff: {comp.minCgpa})</h4>
                {matches[comp.id] && matches[comp.id].length > 0 ? (
                  <ul>
                    {matches[comp.id].map(s => (
                      <li key={s.id}>ID: {s.id} | {s.name} (CGPA: {s.cgpa})</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No unplaced students meet the criteria.</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="card full-width">
          <h3>Total Student Database</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>CGPA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.department}</td>
                  <td>{s.cgpa}</td>
                  <td>
                    <span className={`badge ${s.status.toLowerCase()}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;