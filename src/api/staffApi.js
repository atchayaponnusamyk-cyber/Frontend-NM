import api from './axiosConfig';

export const getAssignedComplaints = () => api.get('/api/staff/complaints');
export const updateComplaintStatus = (id, data) => api.put(`/api/staff/complaints/${id}/status`, data);