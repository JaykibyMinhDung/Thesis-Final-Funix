import React from "react";

const NotAuthentication = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>You are not admin, please login with another</h1>
      <h3>
        Please contact hoteline:{" "}
        <a
          style={{ color: "red", textDecoration: "none", fontSize: "large" }}
          href="/"
        >
          01294294123
        </a>
      </h3>
    </div>
  );
};

export default NotAuthentication;
