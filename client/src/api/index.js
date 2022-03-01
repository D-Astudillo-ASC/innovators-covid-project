// import https from 'https';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  hostname: process.env.REACT_APP_API_HOST || 'http://localhost:3000/',
  // httpsAgent: https.Agent({
  //     rejectUnauthorized: false,
  // }),
});

// TODO - use interceptors for better error handling: https://masteringjs.io/tutorials/axios/interceptors#error-handling

export const getAllExams = payload => api.get(`/Exams`, payload);
export const createExams = payload => api.get(`/CreateExams`, payload);
// export const displayExam = payload => api.get(`/DisplayExam`, payload);
export const getExam = payload => api.get('/Exam', { params: payload });
<<<<<<< HEAD
export const getByPatientId = payload => api.get(`/patient`, { params: payload });
export const deleteExam = payload => api.delete('/exam', { params: payload}); 
// export const getAllItems = payload => api.get(`/items`, payload);

// export const getItemById = id => api.get(`/item/${id}`);
// export const insertItem = payload => api.post(`/item`, payload);
// export const updateItemById = (id, payload) => api.put(`/item/${id}`, payload);
// export const deleteItemById = id => api.delete(`/item/${id}`);
=======
export const getPatByPatientId = payload => api.get(`/patient`, { params: payload });
export const getExamsByPatientId = payload => api.get('/exams/patient/', { params: payload });
>>>>>>> origin

const apis = {
  getAllExams,
  getExam,
  createExams,
<<<<<<< HEAD
  getByPatientId,
  deleteExam, 
=======
  getPatByPatientId,
  getExamsByPatientId,
>>>>>>> origin
  // displayExam,
};

export default apis;
