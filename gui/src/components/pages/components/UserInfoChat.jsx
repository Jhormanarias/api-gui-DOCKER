import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { PokemonContext } from "../../../contexts/PokemonContext";

export const UserInfoChat = () => {
  const [{ user }, {}] = useContext(AuthContext);
  const [{}, {onClickUploadImage}] = useContext(PokemonContext);

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
      <p>Cambiar foto de perfil</p>
      <div class="input-group mb-3">
        <input type="file" class="form-control" accept="image/*"/>
        <button class="input-group-text" for="inputGroupFile02" onClick={(e)=>{onClickUploadImage(e)}}>
          Upload
        </button>
      </div>
    </figure>
  );
};
