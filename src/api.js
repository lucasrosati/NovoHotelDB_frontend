// src/api.js
import axios from 'axios';

// URL base para o backend
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Altere o localhost e a porta, se necessário
});

export default api;
