import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  // Vui lòng dán access token ở đây
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjQzZThiZDYxNDBhMWY2ZTU5YTYzNyIsImlhdCI6MTcyNzI5OTM1OSwiZXhwIjoxNzI3MzAyOTU5fQ.xPoMqB6uQd397SsB6R8_JjUsHxQc6oL1J0YjAKZNUJQ";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
