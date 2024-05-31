import React, { useEffect, useState } from "react";
import "../components/css/addnew.css";
import Navigator from "../components/dashbroad/Navigator";
import { useForm } from "react-hook-form";
import { Managers } from "../apis/Managers";
import { useLocation, useNavigate } from "react-router-dom";

interface userProps {
  name: String;
  email: string;
  phone: String;
  role: String;
  password: String;
}

const UpdatedUser = () => {
  // const [defaultHotels, setDefaultHotels] = useState([]);
  const [updatedUser, setUpdatedUser] = useState<userProps>({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("role", data.role);
    formData.append("password", data.password);
    // formData.append("hotel", data.hotel);
    if (location.state?.updated === "user") {
      Managers()
        .updatedUser(location.state?.idUser, formData)
        .then((res) => {
          alert(res.message);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }
    Managers()
      .addUser(formData)
      .then((res) => {
        alert(res.message);
      })
      .then(() => navigate("/user_list"))
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };
  useEffect(() => {
    if (location.state?.updated === "user") {
      Managers()
        .getDetailUser(location.state.idUser)
        .then((res) => {
          console.log(res);
          setUpdatedUser(res.user);
        })
        .catch((err) => console.error(err));
    }
  }, [location.state?.updated]);

  useEffect(() => {
    setValue("name", updatedUser.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("email", updatedUser.email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("phone", updatedUser.phone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("role", updatedUser.role, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [updatedUser]);

  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <header className="heading">
          <h2 style={{ color: "rgb(141, 141, 141)" }}>
            {location.state?.updated === "user" ? "Update" : "Add"} User
          </h2>
        </header>
        <article className="form__input">
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input--flex">
              <div>
                <label htmlFor="name">name</label> <br />
                <input
                  type="text"
                  placeholder="your name"
                  {...register("name")}
                />
                <label htmlFor="email">email</label> <br />
                <input type="text" placeholder="email" {...register("email")} />
              </div>
              <div>
                <label htmlFor="phone">phone</label> <br />
                <input
                  type="text"
                  placeholder="+83249012423"
                  {...register("phone")}
                />
                {!updatedUser.role && (
                  <>
                    <label htmlFor="numberPeople">Password</label> <br />
                    <input
                      type="password"
                      placeholder="******"
                      {...register("password")}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="foot__newrooms">
              <div>
                <label htmlFor="role">Role</label> <br />
                <input
                  disabled={updatedUser.role === "2"}
                  type="text"
                  placeholder="admin"
                  {...register("role")}
                />
              </div>
              {/* <div className="foot__newrooms--align">
                <label htmlFor="hotel">Choose a hotel</label>
                <br />
                <select {...register("hotel")}>
                  {defaultHotels.map((hotel) => (
                    <option value={hotel}>{hotel}</option>
                  ))}
                </select>
                <br />
              </div> */}
              <div className="foot__newrooms--align">
                <button type="submit">Send</button>
              </div>
            </div>
          </form>
        </article>
      </main>
    </>
  );
};

export default UpdatedUser;
