import React, { useEffect, useState } from "react";
import Table from "../components/table/Table";
import Navigator from "../components/dashbroad/Navigator";
import { Managers } from "../apis/Managers";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const [dataProducts, setdataProducts] = useState([]);
  const navigate = useNavigate();
  const styleTable: string = "2rem";
  const navigationNewHotelHandle = () => {
    return navigate("/new_hotel");
  };
  const titleHead = [
    "ID",
    "Name",
    "Category",
    "New-Price",
    "Old-Price",
    "Amount",
    "Action",
    "Edit",
  ];
  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("access_user")!)?.meta[0];
    if (!account) {
      return navigate("/login");
    }
    Managers()
      .getProductsList()
      .then((res) => setdataProducts(res.product))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <article>
          <div className="headerHotel__list">
            <h2 style={{ color: "rgb(141, 141, 141)" }}>Products List</h2>
            <div style={{ paddingRight: "7rem" }}>
              <button id="btn-newHotel" onClick={navigationNewHotelHandle}>
                Add New
              </button>
              <select id="btn-newHotel">
                <option value="">Filter</option>
                <option value="">clothing</option>
                <option value="">electronics</option>
                <option value="">cosmetics</option>
              </select>
            </div>
          </div>
        </article>
        <Table
          style={styleTable}
          products={dataProducts}
          titleHead={titleHead}
          pageTitle={"Product List"}
          deletedHotelAPI={Managers().deletedProduct}
          deletedRoomAPI={Managers().deletedroomsList}
        />
      </main>
    </>
  );
};

export default ProductsList;
