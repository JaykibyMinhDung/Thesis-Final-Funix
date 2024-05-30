import { instanceAxios } from "../config/axios";

export const Managers = () => {
  async function getDashbroad() {
    const { data } = await instanceAxios.get("api/admin/order"); // Nhận 8 giao dịch gần nhất
    return data;
  }
  async function getTransactions() {
    const { data } = await instanceAxios.get("transactionlist");
    return data;
  }
  async function getProductsList() {
    const { data } = await instanceAxios.get("api/products");
    return data;
  }
  async function getDetailProduct(id: string) {
    const { data } = await instanceAxios.get(`api/admin/product/${id}`);
    return data;
  }
  async function postNewProduct(request: any) {
    const { data } = await instanceAxios.post("api/admin/product/", request);
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
  async function getRoomsList() {
    const { data } = await instanceAxios.get("room");
    return data;
  }
  async function getDetailRoomsList(id: string) {
    const { data } = await instanceAxios.get(`room/${id}`);
    return data;
  }
  async function postNewrooms(request: any) {
    const { data } = await instanceAxios.post("room/new-room", request);
    return data;
  }
  async function updatedroomsList(request: any, id: string) {
    const { data } = await instanceAxios.put(
      `room-list/updated/${id}`,
      request
    );
    return data;
  }
  async function deletedroomsList(idRoom: string, idHotel: string | undefined) {
    const query = "?" + `idHotel=${idHotel}`;
    const { data } = await instanceAxios.delete(
      `room-list/deleted/${idRoom + query}`
    );
    return data;
  }
  async function optionhotelsList() {
    const { data } = await instanceAxios.get("room-list/new-room");
    return data;
  }

  async function userList() {
    const { data } = await instanceAxios.get("api/admin/user");
    return data;
  }

  async function updatedUser(id: string) {
    const { data } = await instanceAxios.put(`api/admin/user/${id}`);
    return data;
  }

  async function deletedUser(id: string) {
    const { data } = await instanceAxios.delete(`api/admin/user/${id}`)
    return data
  }

  return {
    getDashbroad,
    getTransactions,
    getRoomsList,
    getProductsList,
    getDetailProduct,
    getDetailRoomsList,
    postNewProduct,
    updatedProductsList,
    deletedProduct,
    postNewrooms,
    updatedroomsList,
    deletedroomsList,
    optionhotelsList,
    userList,
    updatedUser,
    deletedUser
  };
};
