import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { InputPassword } from "./components/InputPassword";

export const Login = () => {
  const [
    { user, viewpassword },
    { onClickSignIn, setFieldUser, onClickViewPass },
  ] = useContext(AuthContext);

  const signUp = () => {
    window.location = "/createuser";
  };

  return (
    <div className="container-fluid col-md-6 border mt-5 mb-5">
      <h1>Ingresa a la app</h1>

      <form>
        <div className="mb-3">
          <label className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={user.email}
            onChange={(e) => setFieldUser(e.target.value, "email")}
          />
        </div>
        <InputPassword />
        <div className="d-grid gap-2 mt-4 mb-3">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              onClickSignIn();
            }}
          >
            Ingresar
          </button>
        <span>O si no tienes una cuenta...</span>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => signUp()}
          >
            Crea una cuenta
          </button>
        </div>
      </form>
    </div>
  );
};
