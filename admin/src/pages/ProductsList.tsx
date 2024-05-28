import React, { useEffect, useState } from "react";
import Table from "../components/table/Table";
import Navigator from "../components/dashbroad/Navigator";
import { Managers } from "../apis/Managers";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const [dataHotels, setdataHotels] = useState([]);
  const navigate = useNavigate();
  const styleTable: string = "2rem";
  const navigationNewHotelHandle = () => {
    return navigate("/new_hotel");
  };
  const titleHead = ["ID", "Name", "Type", "Title", "City", "Action", "Edit"];
  useEffect(() => {
    Managers()
      .getProductsList()
      .then((res) => setdataHotels(res.product))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <article>
          <div className="headerHotel__list">
            <h2 style={{ color: "rgb(141, 141, 141)" }}>Products List</h2>
            <button
              id="btn-newHotel"
              style={{ padding: "5px" }}
              onClick={navigationNewHotelHandle}
            >
              Add New
            </button>
          </div>
        </article>
        <Table
          style={styleTable}
          products={dataHotels}
          titleHead={titleHead}
          pageTitle={"hotel List"}
          deletedHotelAPI={Managers().deletedProduct}
          deletedRoomAPI={Managers().deletedroomsList}
        />
      </main>
    </>
  );
};

export default ProductsList;
