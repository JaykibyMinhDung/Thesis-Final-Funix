import axios, { AxiosRequestConfig } from "axios";

export const instanceAxios = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
  timeout: 60000,
});

type Access_Token = {
  cookie: string,
  email: string
  id: string
  message: string
  role: string
};

instanceAxios.interceptors.request.use(
  async (config) => {
    const cookie = document.cookie;
    // Handle token here ...
    // const configCookie = decodeURIComponent(cookie).split(";");
    // console.log(configCookie)
    if (cookie?.length > 0) {
      config.headers["Cookie"] = `${cookie}`; // set cookie send to server
    }
    const access_Token: string | null = localStorage.getItem("access_user");
    if (access_Token) {
      const key_access: Access_Token = await JSON.parse(access_Token);
      config.headers["Authorization"] = `Bearer ${key_access.cookie}`;
    }
    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      alert("Tài khoản đã hết phiên đăng nhập");
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      alert("Tài khoản đã hết phiên đăng nhập");
      window.location.assign("/login");
      return localStorage.removeItem("id_user");
    }
    return Promise.reject(error);
  }
);
