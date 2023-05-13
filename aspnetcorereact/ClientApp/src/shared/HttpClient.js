import axios from "axios";

const httpClient = axios.create({
  // baseURL: window.location.protocol + '//' + window.location.host,
})

httpClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})

export default httpClient;