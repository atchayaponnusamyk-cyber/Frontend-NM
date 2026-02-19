import api from './axiosConfig';

export const getAllComplaints = () => api.get('/api/admin/complaints');
export const assignComplaint = (id, staffId) => api.put(`/api/admin/complaints/${id}/assign`, { staffId });
export const getAllStaff = () => api.get('/api/admin/staff');