import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { PokemonContext } from "../../../contexts/PokemonContext";

export const UserInfoChat = () => {
  const [{ user }, {}] = useContext(AuthContext);
  const [{ urlPhotoProfile }, { subirArchivos, onClickUploadImage }] =
    useContext(PokemonContext);

  const onClickUpload = () => {
    document.getElementById("uploadImage").click();
  };

  let JSONuserName = JSON.stringify(user.user.name);
  let userName = JSON.parse(JSONuserName);

  return (
    <figure className="text-end border-bottom">
      <img className="photoProfile" src={urlPhotoProfile} alt="user" width="64" height="64" />
      <h5>{userName}</h5>
      <p>Cambiar foto de perfil</p>
      <div className="input-group mb-3 inputImage justify-content-md-end">
        <button
          className="btn btn-outline-secondary"
          onClick={(e) => {
            onClickUpload(e);
          }}
        >
          <i class="fa-solid fa-cloud-arrow-up"></i>
        </button>
        <input
          type="file"
          id="uploadImage"
          name="photo"
          className="form-control"
          accept="image/*"
          onChange={(e) => onClickUploadImage(e)}
        />
      </div>
    </figure>
  );
};
