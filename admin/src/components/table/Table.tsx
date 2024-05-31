import React, { CSSProperties, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

interface Props {
  products: any;
  style: string;
  titleHead: Array<String>;
  pageTitle: string;
  deletedUserHandle?: (id: string, hotel: string | undefined) => Promise<any>;
  deletedProductAPI?: (id: string) => Promise<any>;
}

const Table: React.FC<Props> = ({
  products,
  titleHead,
  style,
  pageTitle,
  deletedUserHandle,
  deletedProductAPI,
}) => {
  const navigate = useNavigate();
  const navigationFormUpdated = async (id: any, flag: string) => {
    if (flag === "product") {
      return navigate("/new_product", {
        state: { updated: "product", idProduct: id },
      });
    } else {
      return navigate("/updated_user", {
        state: { updated: "user", idUser: id },
      });
    }
  };
  const deleteHandle = async (id: string, product?: string) => {
    const acceptDeleted = window.confirm("Do you want to deleted product?");
    if (acceptDeleted) {
      if (product && deletedUserHandle) {
        return deletedUserHandle(id, product)
          .then((res) => alert(res.message))
          .then(() => navigate("/"))
          .catch((err) => {
            console.log(err);
            alert("Có lỗi xảy ra, vui lòng kiểm tra lại đường truyền kết nối");
          });
      }
      if (!product && deletedProductAPI) {
        return deletedProductAPI(id)
          .then((res) => alert(res.message))
          .then(() => navigate("/"))
          .catch((err) => {
            console.log(err);
            alert("Có lỗi xảy ra, vui lòng kiểm tra lại đường truyền kết nối");
          });
      }
    }
  };
  const generateReactHTML = (): JSX.Element => {
    // const changeStyle = background-color: products[i].status ===
    //     ' Booked' ? 'red' : products[i].status==='Checkout' ? 'gray' : 'green' ; color: white; border: 0px; padding:
    //         5px; border-radius: 5px;
    // const changeStyleHotel = "
    //         background-color: red;
    //         color: white;
    //         border: 0px;
    //         padding: 5px;
    //         border-radius: 5px;
    //       "
    type Style = {
      backgroundColor: string;
      color: string;
      border: string;
      padding: string;
      borderRadius: string;
    };
    const StyleButtonDelete: Style = {
      backgroundColor: "red",
      color: "white",
      border: "0px",
      padding: "5px",
      borderRadius: "5px",
    };
    const StyleButtonUpdated: Style = {
      backgroundColor: "rgb(0, 255, 55)",
      color: "white",
      border: "0px",
      padding: "5px",
      borderRadius: "5px",
    };
    const getButtonStatusStyle = (statusRoom: string): CSSProperties => {
      return statusRoom === "Booked"
        ? { backgroundColor: "red", color: "white" }
        : statusRoom === "Checkout"
        ? { backgroundColor: "gray", color: "white" }
        : { backgroundColor: "green", color: "white" };
    };
    // const StyleButtonStatus: React.CSSProperties =
    //   getButtonStatusStyle(statusRoom);
    if (pageTitle === "Admin Page") {
      console.log(titleHead);
      return (
        <tbody id="1">
          {products.map((e: any, index: number) => {
            return (
              <tr key={index}>
                <th scope="row">
                  <input type="checkbox" />
                </th>
                <td>{e._id}</td>
                {/* <td>{}</td> */}
                <td>{e.user}</td>
                <td>{e.address}</td>
                <td>{e.voucher}</td>
                <td>{e.shipping}</td>
                <td>
                  {new Date(e?.createdAt).toLocaleDateString("en-GB")} -
                  {new Date(e.deliveryDate).toLocaleDateString("en-GB")}
                </td>
                <td>{e.methodPay}</td>
                <td>{e.progressingDelivery}</td>
                <td>${e.totalOrder}</td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    if (pageTitle === "Product List") {
      return (
        <tbody id="2">
          {products.map((e: any, index: number) => {
            return (
              <tr key={index}>
                <th scope="col">
                  <input type="checkbox" name="check" id="check" />
                </th>
                <td>{e._id}</td>
                <td>{e.name}</td>
                <td>{e.category}</td>
                <td>{e.new_price}</td>
                <td>{e.old_price}</td>
                <td>{e.amount}</td>
                <td>
                  <input
                    style={StyleButtonDelete}
                    type="button"
                    value="Delete"
                    onClick={() => deleteHandle(e._id)}
                  />
                </td>
                <td onClick={() => navigationFormUpdated(e._id, "product")}>
                  <input
                    style={StyleButtonUpdated}
                    type="button"
                    value="Edit"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    if (pageTitle === "rooms List") {
      return (
        <tbody id="3">
          {products.map((e: any, index: number) => {
            return (
              <tr key={index}>
                <th scope="col">
                  <input type="checkbox" name="check" id="check" />
                </th>
                <td>{e._id} </td>
                <td>{e.title} </td>
                <td>{e.desc} </td>
                <td>{e.price} </td>
                <td>{e.maxPeople}</td>
                <td>
                  <form id={e._id}>
                    <input
                      style={StyleButtonDelete}
                      type="button"
                      value="Delete"
                      onClick={() => deleteHandle(e._id, e.idHotel)}
                    />
                  </form>
                </td>
                <td onClick={() => navigationFormUpdated(e._id, "room")}>
                  <input
                    style={StyleButtonUpdated}
                    type="button"
                    value="Edit"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    if (pageTitle === "transaction List") {
      return (
        <tbody id="4">
          {products.map((e: any, index: number) => {
            return (
              <tr key={index}>
                <th scope="col">
                  <input type="checkbox" name="check" id="check" />
                </th>
                <td>{e._id}</td>
                <td>{e.user}</td>
                <td>{e.hotel}</td>
                <td>
                  {e.room.map((n: any, key: number) => (
                    <span key={key}>{n.numberRoom}, </span>
                  ))}
                </td>
                <td>
                  {new Date(e.dateStart).toLocaleDateString("en-GB")} -{" "}
                  {new Date(e.dateEnd).toLocaleDateString("en-GB")}
                </td>
                <td>${e.price}</td>
                <td>{e.payment}</td>
                <td>
                  <form id={e._id}>
                    <input
                      style={StyleButtonDelete}
                      type="button"
                      value="Delete"
                      // onClick={() => deleteHandle(e._id, e.idHotel)}
                    />
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    if (pageTitle === "User List") {
      return (
        <tbody id="5">
          {products.map((e: any, index: number) => {
            return (
              <tr key={index}>
                <th scope="col">
                  <input type="checkbox" name="check" id="check" />
                </th>
                <td>{e._id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.role}</td>
                <td>******</td>
                <td>
                  {e?.createdAt
                    ? new Date(e?.createdAt).toLocaleDateString("en-GB") + " -"
                    : ""}{" "}
                  {new Date(e?.updatedAt).toLocaleDateString("en-GB")}
                </td>
                {/* <td>{e.payment}</td> */}
                <td>
                  <form id={e._id}>
                    <input
                      style={StyleButtonDelete}
                      type="button"
                      value="Delete"
                      onClick={() => deleteHandle(e._id, e.idUser)}
                    />
                  </form>
                </td>
                <td onClick={() => navigationFormUpdated(e._id, "user")}>
                  <input
                    style={StyleButtonUpdated}
                    type="button"
                    value="Edit"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    return (
      <tbody>
        <tr>
          <th>Chưa nhận được dữ liệu</th>
        </tr>
      </tbody>
    );
  };

  return (
    <table
      style={{
        textAlign: "center",
        marginBottom: "4rem",
        marginLeft: style,
      }}
    >
      <thead>
        <tr>
          <th scope="col">
            <input type="checkbox" name="check" id="check" />
          </th>
          {/* fix */}
          {titleHead.map((e: String, key: number) => {
            return (
              <th key={key} scope="col">
                {e}
              </th>
            );
          })}
        </tr>
      </thead>
      {generateReactHTML()}
    </table>
  );
};

export default Table;
