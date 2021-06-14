import axios from 'axios';

const api = axios.create({
   baseURL: 'https://server.app-com.digital',
   // baseURL: 'http://xinei1.ddns.net:3333',
});

export default api;
