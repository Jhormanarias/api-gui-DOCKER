import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { PokemonContext } from "../../../contexts/PokemonContext";

export const UserInfoChat = () => {
  const [{ user }, {}] = useContext(AuthContext);
  const [{urlPhotoProfile}, {subirArchivos, onClickUploadImage}] = useContext(PokemonContext);

  let JSONuserName = JSON.stringify(user.user.name);
  let userName = JSON.parse(JSONuserName);

  return (
    <figure className="text-end border-bottom">
      <img src={urlPhotoProfile} alt="user" width="64" height="64" />
      <h5>{userName}</h5>
      <p>
        <small>
          <em>
            <strong>ID:</strong> {localStorage.getItem("UserUid")}
          </em>
        </small>
      </p>
      <p>Cambiar foto de perfil</p>
      <div className="input-group mb-3">
        <input type="file" name="photo" className="form-control" accept="image/*" onChange={(e)=>onClickUploadImage(e)}/>
      </div>
    </figure>
  );
};
