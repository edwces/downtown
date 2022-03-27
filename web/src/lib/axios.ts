import axiosFactory from 'axios';

const axios = axiosFactory.create({ url: 'http://localhost:3001' });

export default axios;
