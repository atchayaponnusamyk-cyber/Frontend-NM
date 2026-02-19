import api from './axiosConfig';

export const submitComplaint = (data) => api.post('/api/complaints', data);
export const getMyComplaints = () => api.get('/api/complaints/my');
export const getComplaintById = (id) => api.get(`/api/complaints/${id}`);