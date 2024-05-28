import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigator from "../components/dashbroad/Navigator";
import { Managers } from "../apis/Managers";
import Table from "../components/table/Table";

const UserList = () => {
  const [dataUser, setdataUser] = useState([]);
  const navigate = useNavigate();
  const styleTable: string = "2rem";
  const navigationUpdatedHandle = () => {
    return navigate("/new_hotel");
  };
  const titleHead = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Role",
    "StartAt",
    "Deleted",
    "Updated",
  ];
  useEffect(() => {
    Managers()
      .userList()
      .then((res) => setdataUser(res.user))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <article>
          <div className="headerHotel__list">
            <h2 style={{ color: "rgb(141, 141, 141)" }}>User List</h2>
            <button
              id="btn-newHotel"
              style={{ padding: "5px" }}
              onClick={navigationUpdatedHandle}
            >
              Add New
            </button>
          </div>
        </article>
        <Table
          style={styleTable}
          products={dataUser}
          titleHead={titleHead}
          pageTitle={"User List"}
          // deletedHotelAPI={Managers().deletedhotelsList}
          deletedRoomAPI={Managers().deletedroomsList}
        />
      </main>
    </>
  );
};

export default UserList;
