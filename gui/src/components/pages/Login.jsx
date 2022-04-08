import React, {useContext} from "react";
import { AuthContext } from "../../contexts/AuthContext";


const Login = () => {
  const [
    { loginAuth },
    { setloginAuth},
  ] = useContext(AuthContext)
  return (
    <div className="container-fluid col-md-6 border mt-5 mb-5">
      <h1>Login</h1>

      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="d-grid gap-2 mt-5 mb-3">
        <button className="btn btn-primary" type="button" onClick={()=>setloginAuth(true)}>
          Login
        </button>
        {loginAuth}
      </div>
      </form>

      
    </div>
  );
};

export default Login;
