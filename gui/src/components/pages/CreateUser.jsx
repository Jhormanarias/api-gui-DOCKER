import React, {useContext} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { InputPassword } from "./components/InputPassword";


export const CreateUser = () => {
  const [
    { user, loginAuth},
    { onClickCreateUser, setFieldUser},
  ] = useContext(AuthContext)

  const signIn =()=>{
    window.location = '/login';
  }
  return (
    <div className="container-fluid col-md-6 border mt-5 mb-5">
      <h1>Crea tu cuenta</h1>

      <form>
      <div className="mb-3">
          <label for="exampleInputName" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            aria-describedby="emailHelp"
            value={user.name}
            onChange={(e)=>setFieldUser(e.target.value, "name")}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={user.email}
            onChange={(e)=>setFieldUser(e.target.value, "email")}
          />
        </div>
        <InputPassword />
        <div className="d-grid gap-2 mt-4 mb-3">
        <button className="btn btn-primary" type="button" onClick={()=>onClickCreateUser()}>
          Crear cuenta
        </button>
        <span>O si ya tienes una cuenta...</span>
        <button className="btn btn-secondary" type="button" onClick={()=>signIn()}>
          Ingresa
        </button>
        {loginAuth}
      </div>
      </form>

      
    </div>
  );
};
