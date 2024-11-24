import axios from 'axios';
import { Evento } from '../models/Types';

const apiClient = axios.create({
  baseURL: 'https://localhost:7193/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(response => {
  console.log('Datos API:', response); 
  return response;
}, error => {
  console.error('Response Error:', error); 
  return Promise.reject(error);
});

const api = {
  getEventos: () => apiClient.get('/eventos').then(response => Array.isArray(response.data) ? response.data : []),
  createEvento: (data: Omit<Evento, 'id'>) => apiClient.post('/eventos', data).then(response => response.data),

  getSalas: () => apiClient.get('/salas').then(response => Array.isArray(response.data) ? response.data : []),
  
  getTipoEventos: () => apiClient.get('/tipoeventos').then(response => Array.isArray(response.data) ? response.data : []),
  
};

export default api;
