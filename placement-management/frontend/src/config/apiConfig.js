const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const API_ENDPOINTS = {
  students: {
    base: `${BASE_URL}/students`,
    byId: (id) => `${BASE_URL}/students/${id}`,
    updateStatus: (id) => `${BASE_URL}/students/${id}/status`,
    eligible: (minCgpa) => `${BASE_URL}/students/eligible?minCgpa=${minCgpa}`,
  },
  companies: {
    base: `${BASE_URL}/companies`,
  },
};