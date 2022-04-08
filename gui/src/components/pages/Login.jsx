import React, {useContext} from "react";
import { AuthContext } from "../../contexts/AuthContext";


const Login = () => {
  const [
    { user, loginAuth},
    { setloginAuth, onClickCreateUser, setFieldUser},
  ] = useContext(AuthContext)

  const onClickButtonLog =(logOrCreate)=>{
    setloginAuth(true)
    if (logOrCreate==0) {
      alert('Ingresar');
    }
    else{
      alert('Crear usuario');

    }
    
  }
  return (
    <div className="container-fluid col-md-6 border mt-5 mb-5">
      <h1>Crear usuario</h1>

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
        <button className="btn btn-primary" type="button" onClick={()=>onClickButtonLog(0)}>
          Ingresar
        </button>
        <button className="btn btn-primary" type="button" onClick={()=>onClickCreateUser()}>
          Crear usuario
        </button>
        {loginAuth}
      </div>
      </form>

      
    </div>
  );
};

export default Login;
