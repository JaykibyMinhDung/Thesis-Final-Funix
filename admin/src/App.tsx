import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  Navigate,
} from "react-router-dom";
import Dashbroad from "./pages/Dashbroad";
import Transaction from "./pages/Transactions";
import Login from "./pages/Login";
import RoomsList from "./pages/RoomsList";
import AddnewRoom from "./pages/AddnewRoom";
import AddNewProduct from "./pages/AddNewProduct";
import ProductsList from "./pages/ProductsList";
import UserList from "./pages/User";
import NotAuthentication from "./pages/NotAuthentication";

export interface IAppProps {}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
    const account = JSON.parse(localStorage.getItem("access_user")!)?.meta[0];
    if (account) {
      setAccessToken(account);
    }
  }, []);

  // if (accessToken?.email.trim() === "") {
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/login" element={<Login />} />
  //       </Routes>
  //     </BrowserRouter>
  //   );
  // }

  console.log(accessToken?.email.trim() === "");
  return (
    <BrowserRouter>
      <Routes>
        {/* {accessToken?.email.trim() === "" ? (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) :  */}
        {accessToken?.role === "2" ? (
          <Route>
            {/* <Route index element={} /> */}
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/room_list" element={<RoomsList />} />
            <Route path="/products_list" element={<ProductsList />} />
            <Route path="/new_room" element={<AddnewRoom />} />
            <Route path="/new_hotel" element={<AddNewProduct />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/" element={<Dashbroad />} />
            <Route path="*" element={<NotAuthentication />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashbroad />} />
            <Route path="/products_list" element={<ProductsList />} />
            <Route path="*" element={<NotAuthentication />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
