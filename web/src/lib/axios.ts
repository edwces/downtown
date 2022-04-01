import axiosFactory from 'axios';

const axios = axiosFactory.create({ baseURL: 'http://localhost:3001' });

export default axios;
