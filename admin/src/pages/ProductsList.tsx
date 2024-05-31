import React, { useEffect, useState } from "react";
import Table from "../components/table/Table";
import Navigator from "../components/dashbroad/Navigator";
import { Managers } from "../apis/Managers";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const ProductsList = () => {
  const [dataProducts, setdataProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState("");
  const [page, setPage] = useState(1);
  const [Total, setTotal] = useState(0);
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
      .getProductsList(page, filterProducts)
      .then((res) => {
        setdataProducts(res.product);
        setTotal(res.total);
      })
      .catch((err) => console.error(err));
  }, [page, navigate, filterProducts]);

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
              <select
                value={filterProducts}
                onChange={(e) => setFilterProducts(e.target.value)}
                id="btn-newHotel"
              >
                <option value="">Filter</option>
                <option value="clothing">clothing</option>
                <option value="electronics">electronics</option>
                <option value="cosmetics">cosmetics</option>
              </select>
            </div>
          </div>
        </article>
        <Table
          style={styleTable}
          products={dataProducts}
          titleHead={titleHead}
          pageTitle={"Product List"}
          deletedProductAPI={Managers().deletedProduct}
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

export default ProductsList;
