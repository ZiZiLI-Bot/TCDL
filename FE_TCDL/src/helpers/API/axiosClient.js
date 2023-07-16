import axios from 'axios';
import qs from 'qs';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
});

// axiosClient.interceptors.request.use((config) => {
//   if (AuthStorage.getKey('token')) {
//     config.headers = {
//       Authorization: `Bearer ${AuthStorage.getKey('token')}`,
//     };
//   }
//   return config;
// });

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.error(error.response);
  },
);
export default axiosClient;
