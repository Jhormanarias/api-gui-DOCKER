import React from "react";

export const SelectChat = ({nameChat}) => {
  return (
    <div className="input-group mb-3 input-group-sm mb-3 border-bottom pt-4 pb-4">
        <img
          className="me-2"
          src="./user.png"
          alt="user"
          width="50"
          height="50"
        />
        <p>{nameChat}</p>
    </div>
    );
};
