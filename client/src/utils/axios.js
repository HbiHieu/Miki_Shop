import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': ' http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true',
  },
  withCredentials: true, // Để request gửi kèm cookie
});

axiosClient.interceptors.request.use(async (config) => {
  let accessToken = window.localStorage.getItem('accessToken');
  if (accessToken) {
    const utcStr = new Date().toUTCString();
    const timeNow = Date.parse(utcStr);
    const user = JSON.parse(localStorage.getItem('user'));
    const expireTime = Date.parse(user.accessExpire);
    if (expireTime < timeNow) {
      try {
        const newAccessToken = await axios({
          method: 'POST',
          url: `https://localhost:7226/api/Users/refreshToken?userId=${user.userInforId}`,
        });
        localStorage.setItem('accessToken', newAccessToken.data);
        accessToken = newAccessToken.data;
      } catch (e) {
        if ((e.response.data = 'Refresh token was expired')) {
          localStorage.clear();
          window.location.replace('/login');
        }
      }
    }
    config.headers.Authorization = 'Bearer ' + accessToken;
  }
  return config;
});
