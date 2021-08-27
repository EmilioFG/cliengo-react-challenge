import React from "react";

import "./User.scss";

const User = ({ name, email, phone }) => {
  return (
    <div className="product">
      <span>{name}</span>
      <span>{email}</span>
      <span>{phone}</span>
    </div>
  );
};

export default User;
