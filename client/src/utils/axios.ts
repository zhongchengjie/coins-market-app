import axios from "axios";
import { getBrowserFingerPrint } from "./common";

const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
api.interceptors.request.use(
  async (config) => {
    // console.log(`🚀 发送请求: ${config.method?.toUpperCase()} ${config.url}`);
    config.headers["X-User-Browser-ID"] = await getBrowserFingerPrint();
    return config;
  },
  (error) => {
    // console.error("❌ 请求错误:", error);
    return Promise.reject(error);
  },
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // console.log(`✅ 收到响应: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // console.error("❌ 响应错误:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
