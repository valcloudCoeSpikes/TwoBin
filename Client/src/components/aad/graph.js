import axios from 'axios';
import { acquireGraphToken } from './authContext';



const graphConfig = {
  baseURL: 'https://graph.microsoft.com/v1.0'
};

const Graph = axios.create(graphConfig);

// Intercepts requests to Microsoft Graph and attempts to acquire/refresh
// an access token.
Graph.interceptors.request.use(
  (config) => {
    return new Promise((resolve, reject) => {
      acquireGraphToken((error, token) => {
        if (error || !token) {
          console.log(error);
          reject(error);
        } else {
          config.headers.Authorization = `Bearer ${token}`;
          resolve(config);
        }
      })
    });
  },
  (error) => Promise.reject(error)
);

export default Graph;