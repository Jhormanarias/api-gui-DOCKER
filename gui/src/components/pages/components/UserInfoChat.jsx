import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export const UserInfoChat = () => {
  const [{ user }, {}] = useContext(AuthContext);

  let JSONuserName = JSON.stringify(user.user.name);
  let userName = JSON.parse(JSONuserName);

  return (
    <figure className="text-end border-bottom">
      <img src="./user.png" alt="user" width="64" height="64" />
      <h5>{userName}</h5>
      <p>
        <small>
          <em>
            <strong>ID:</strong> {localStorage.getItem("UserUid")}
          </em>
        </small>
      </p>
    </figure>
  );
};
