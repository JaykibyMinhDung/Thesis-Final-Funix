import React, { useEffect, useState } from "react";
import Navigator from "../components/dashbroad/Navigator";
import { useForm } from "react-hook-form";
import { Managers } from "../apis/Managers";
import { useLocation, useNavigate } from "react-router-dom";

interface productProps {
  name: String;
  category: String;
  image: String;
  new_price: number;
  old_price: number;
  amount: number;
  description: String;
}

const AddNewProduct = () => {
  const [UpdatedProduct, setUpdatedProduct] = useState<productProps>({
    name: "",
    image: "",
    category: "",
    new_price: 0,
    old_price: 0,
    amount: 0,
    description: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("category", data.category);
    // formData.append("image", data.image);
    formData.append("new_price", data.new_price);
    formData.append("old_price", data.old_price);
    formData.append("description", data.description);
    formData.append("amount", data.amount);
    if (location.state?.updated === "product") {
      return Managers()
        .updatedProductsList(formData, location.state.idProduct)
        .then((res) => {
          alert(res.message);
        })
        .then(() => navigate("/products_list"))
        .catch((err) => {
          alert(err.message);
          console.error(err);
        });
    }
    Managers()
      .postNewProduct(formData)
      .then((res) => {
        alert(res.message);
      })
      .then(() => navigate("/products_list"))
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  };
  useEffect(() => {
    if (location.state?.updated === "product") {
      Managers()
        .getDetailProduct(location.state.idProduct)
        .then((res) => {
          console.log(res);
          setUpdatedProduct(res.product);
        })
        .catch((err) => console.error(err));
    }
  }, [location.state?.updated]);

  useEffect(() => {
    setValue("name", UpdatedProduct.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("category", UpdatedProduct.category, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("image", UpdatedProduct.image, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("description", UpdatedProduct.description, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("new_price", UpdatedProduct.new_price, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("old_price", UpdatedProduct.old_price, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("amount", UpdatedProduct.amount, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [UpdatedProduct]);

  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <header className="heading">
          <h2 style={{ color: "rgb(141, 141, 141)" }}>
            {location.state?.updated ? "Updated" : "Add New"} Product
          </h2>
        </header>
        {/* Hiển thị lỗi sai ở đây */}
        <article className="form__input">
          {/* {errors.exampleRequired && <span>This field is required</span>} */}
          <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input--flex">
              <div>
                <label htmlFor="name">Name</label> <br />
                <input type="text" {...register("name")} placeholder="hoodle" />
                <label htmlFor="category">Category</label> <br />
                <input
                  type="text"
                  placeholder="clother"
                  {...register("category")}
                />
                <label htmlFor="description">Description</label> <br />
                <input
                  type="text"
                  placeholder="description"
                  id="description"
                  {...register("description")}
                />
                {/* {!location.state?.updated && ( */}
                <>
                  <label htmlFor="image">Images</label> <br />
                  <input
                    type="file"
                    // value="<%= updated.photos %>"
                    placeholder="image"
                    {...register("image")}
                    multiple
                  />
                </>
                {/* )} */}
              </div>
              <div>
                <label htmlFor="new_price">New_price</label> <br />
                <input
                  type="text"
                  placeholder="new_price"
                  {...register("new_price")}
                />
                <label htmlFor="old_price">Old_price</label> <br />
                <input
                  type="text"
                  placeholder="old_price"
                  {...register("old_price")}
                />
                <label htmlFor="amount">Amount</label> <br />
                <input type="text" placeholder="0" {...register("amount")} />
                {/* <label htmlFor="Price">Price</label> <br />
                <input type="text" placeholder="100" {...register("Price")} />
                <label htmlFor="Feature">Feature</label> <br />
                <select {...register("Feature")}>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </select> */}
              </div>
            </div>
            {/* <label htmlFor="Rooms">Rooms</label>
            <textarea {...register("Rooms")} cols={30} rows={5}></textarea> */}
            <br />
            <button type="submit">Send</button>
          </form>
        </article>
      </main>
    </>
  );
};

export default AddNewProduct;
