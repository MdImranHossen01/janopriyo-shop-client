import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'; // Correct import for react-router-dom v6
import useAuth from './useAuth';

// Create the axios instance
export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. REQUEST Interceptor: Add authorization header before request is sent
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token'); // Get token from local storage
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 2. RESPONSE Interceptor: Handle errors after response is received
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log('Error caught from axios interceptor-->', error.response);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Log out the user automatically
          await logOut();
          // Navigate to the login page
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;