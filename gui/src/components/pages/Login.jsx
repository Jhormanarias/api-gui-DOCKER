import React, {useContext} from "react";
import { AuthContext } from "../../contexts/AuthContext";


export const Login = () => {
    const [
        { user},
        { onClickSignIn, setFieldUser},
      ] = useContext(AuthContext)

    const signUp = ()=>{
        alert("Crear usuario");
    }

    return (
        <div className="container-fluid col-md-6 border mt-5 mb-5">
          <h1>Login</h1>
    
          <form>
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
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={user.password}
                onChange={(e)=>setFieldUser(e.target.value, "password")}
              />
            </div>
            <div className="d-grid gap-2 mt-4 mb-3">
            <button className="btn btn-primary" type="button" onClick={()=>{onClickSignIn()}}>
              Ingresar
            </button>
            <button className="btn btn-primary" type="button" onClick={()=>signUp()} >
              Crear usuario
            </button>
          </div>
          </form>
    
          
        </div>
      );
}
