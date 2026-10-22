import axios from 'axios';

const API = axios.create({
  baseURL: 'https://booknest-app-ihdv.onrender.com/api', // Pointing to your live Render backend
  withCredentials: true,
});

export default API;