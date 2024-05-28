import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Dashbroad from "./pages/Dashbroad";
import Transaction from "./pages/Transactions";
import Login from "./pages/Login";
import RoomsList from "./pages/RoomsList";
import AddnewRoom from "./pages/AddnewRoom";
import AddNewProduct from "./pages/AddNewProduct";
import ProductsList from "./pages/ProductsList";
import UserList from "./pages/User";

export interface IAppProps {}

export interface useStatePropsIsAccess {
  message: string;
  id: string;
  fullname: string;
  role: string;
  email: string;
  cookie: string;
}

const App: React.FunctionComponent<IAppProps> = () => {
  const [accessToken, setAccessToken] = useState<useStatePropsIsAccess>({
    message: "",
    id: "",
    fullname: "",
    role: "",
    email: "",
    cookie: "",
  });

  useEffect(() => {
    setAccessToken(JSON.parse(localStorage.getItem("access_user")!)?.meta[0]);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {accessToken?.role === "2" && (
          <Route>
            {/* <Route index element={} /> */}
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/room_list" element={<RoomsList />} />
            <Route path="/hotel_list" element={<ProductsList />} />
            <Route path="/new_room" element={<AddnewRoom />} />
            <Route path="/new_hotel" element={<AddNewProduct />} />
            <Route path="/user" element={<UserList />} />
          </Route>
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashbroad />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
