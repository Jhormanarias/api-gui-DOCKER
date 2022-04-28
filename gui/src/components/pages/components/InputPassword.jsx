import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export const InputPassword = () => {
    const [
        { user, viewpassword },
        { setFieldUser, onClickViewPass },
      ] = useContext(AuthContext);
  return (
    <>
        <div className="mb-3">
          <label className="form-label">
            Contraseña
          </label>
        </div>
        <div className="input-group mb-3">
          <input
            type={viewpassword ? "text" : "password"}
            className="form-control"
            placeholder="Contraseña"
            value={user.password}
            onChange={(e) => setFieldUser(e.target.value, "password")}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => onClickViewPass()}
          >
            {viewpassword ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-solid fa-eye"></i>
            )}
          </button>

        </div>
    </>
  )
}
