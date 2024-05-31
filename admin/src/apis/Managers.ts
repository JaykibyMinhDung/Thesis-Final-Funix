import { instanceAxios } from "../config/axios";

export const Managers = () => {
  async function getDashbroad() {
    const { data } = await instanceAxios.get("api/admin/order");
    return data;
  }
  async function getTransactions() {
    const { data } = await instanceAxios.get("transactionlist");
    return data;
  }
  async function getProductsList(page: number, filter?: string) {
    const filterData = filter ? `&filter=${filter}` : ""
    const { data } = await instanceAxios.get(`api/products?page=${page}${filterData}`);
    return data;
  }
  async function getDetailProduct(id: string) {
    const { data } = await instanceAxios.get(`api/admin/product/${id}`);
    return data;
  }
  async function postNewProduct(request: any) {
    const { data } = await instanceAxios.post("api/admin/product", request);
    return data;
  }
  async function updatedProductsList(request: any, id: string) {
    const { data } = await instanceAxios.put(
      `api/admin/product/${id}`,
      request
    );
    return data;
  }
  async function deletedProduct(id: string) {
    const { data } = await instanceAxios.delete(`api/admin/product/${id}`);
    return data;
  }
  async function userList() {
    const { data } = await instanceAxios.get("api/admin/user");
    return data;
  }

  async function updatedUser(id: string, params: any) {
    const { data } = await instanceAxios.put(`api/admin/user/${id}`, { ...params });
    return data;
  }

  async function deletedUser(id: string) {
    const { data } = await instanceAxios.delete(`api/admin/user/${id}`)
    return data
  }
  async function getDetailUser(id: string) {
    const { data } = await instanceAxios.get(`api/admin/user/${id}`);
    return data;
  }

  return {
    getDashbroad,
    getTransactions,
    // getRoomsList,
    getProductsList,
    getDetailProduct,
    getDetailUser,
    postNewProduct,
    updatedProductsList,
    deletedProduct,
    // postNewrooms,
    // updatedroomsList,
    // deletedroomsList,
    // optionhotelsList,
    userList,
    updatedUser,
    deletedUser
  };
};
