import api from './axiosConfig';

export const submitFeedback = (complaintId, data) => api.post(`/api/feedback/${complaintId}`, data);