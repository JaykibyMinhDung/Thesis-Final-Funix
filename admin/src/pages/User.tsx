import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigator from "../components/dashbroad/Navigator";
import { Managers } from "../apis/Managers";
import Table from "../components/table/Table";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const UserList = () => {
  const [dataUser, setdataUser] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [page, setPage] = useState(0);
  const [Total, setTotal] = useState(0);
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
    "password",
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
            <div style={{ paddingRight: "7rem" }}>
              <button id="btn-newHotel" onClick={navigationUpdatedHandle}>
                Add New
              </button>
              <span>
                <input type="text" name="search" id="" />
                <button>Ssearch</button>
              </span>
              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                id="btn-newHotel"
              >
                <option value="">Filter</option>
                <option value="admin">admin</option>
                <option value="CTV">CTV</option>
                <option value="customer">customer</option>
              </select>
            </div>
          </div>
        </article>
        <Table
          style={styleTable}
          products={dataUser}
          titleHead={titleHead}
          pageTitle={"User List"}
          deletedUserHandle={Managers().deletedUser}
        />
        <div
          style={{
            textAlign: "right",
            // margin: "0rem 8rem",
            marginRight: "10rem",
            marginLeft: "8rem",
            // fontSize: "large",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <FaAngleLeft
              onClick={() => {
                if (page === 1) return;
                setPage(page - 1);
              }}
            />
            <span style={{ marginRight: "1rem;" }}>
              {page} - {Total}
            </span>
            <FaAngleRight
              onClick={() => {
                if (page === Total) return;
                setPage(page + 1);
              }}
            />
          </span>
        </div>
      </main>
    </>
  );
};

export default UserList;
