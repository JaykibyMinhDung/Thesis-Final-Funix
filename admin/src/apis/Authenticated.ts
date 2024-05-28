import { instanceAxios } from "../config/axios";

// type Props = {};

export const fetchAuthenticated = () => {
  // Ghi các api và các tham số truyền vào đây
  async function postLogin(request: any) {
    const { data } = await instanceAxios.post("admin/login", request);
    return data;
  }
  return {
    postLogin,
  };
};
