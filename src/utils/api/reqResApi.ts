import axios, { AxiosInstance } from 'axios';

const reqResApi: AxiosInstance = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Интерсептор запросов (для добавления токенов, если нужно)
// reqResApi.interceptors.request.use(
//   (config) => {
//     // Если нужен токен авторизации, добавьте его здесь
//     // config.headers.Authorization = `Bearer ${yourToken}`;
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// Интерсептор ответов (для обработки ошибок)
reqResApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default reqResApi;
