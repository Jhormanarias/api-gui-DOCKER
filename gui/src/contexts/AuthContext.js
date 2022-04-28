import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosClient from "../contexts/axios/cliente";
import swal from "sweetalert";
import appFirebase from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export const STATUS_NO_LOADED = 'Noloaded';

export const STATUS_LOADING = 'loading';

export const STATUS_LOGIN = 'login';


const initialState = {
  user: {
    users: [],
    status: STATUS_NO_LOADED,
    name: "",
    email: "",
    password: "",
    user: {}
  },
};

const auth = getAuth(appFirebase);
//FireStore---------------------------------------------------------------------
const firestore = getFirestore(appFirebase);
//FireStore---------------------------------------------------------------------

export const AuthContext = createContext([]);

export const AuthContextProvider = ({ children }) => {
  let history = useHistory();

  //UseState---------------------------------------------------------
  const [loginAuth, setloginAuth] = useState(false);
  const [user, setuser] = useState(initialState);
  const [viewpassword, setviewpassword] = useState(false);
  const [localToken, setlocalToken] = useState(null);
  const [forToken, setforToken] = useState(initialState.token)
  //UseState---------------------------------------------------------

  //useEffect---------------------------------------------------------
  useEffect(() => {
    setuser({
      ...user,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }, [user.name, user.email, user.password]);
  //useEffect---------------------------------------------------------


  useEffect(() => {
    /* setuser({
      ...user,
      name: user.name,
      email: user.email,
      password: user.password,
    }); */

    console.log(user.user.status);

      if (user.user.status===STATUS_NO_LOADED) {
        axiosClient().get(`getUser`)
        .then(({data})=>{
          //seteador de estado de campos del login
          setuser({
            ...user,
            status: STATUS_LOGIN,
            user: data
          })
        })
      }

  }, [user.user.status])
  

  //Para crear usuario en firebase--------------------------------------------------
  const registroUserFirebase = async () => {
    const userInfo = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    ).then((userFirebase) => {
      return userFirebase;
    });
    console.log(userInfo.user.uid);
    const docRef = doc(firestore, `usuarios/${userInfo.user.uid}`);
    console.log(docRef);
    setDoc(docRef, {
      name: user.name,
      email: user.email,
    });
  };
  //Para crear usuario en firebase--------------------------------------------------

  //para crear usuario(API POSTGRES)---------------------------------------------------------

  const postUser = async ({ name, email, password }) => {
    return axiosClient
      .post(`/createuser`, {
        name,
        email,
        password,
      })

      .then(({ data }) => {
        //Crear usuario en firebase
        registroUserFirebase();
        return data;
      })
      .catch((e) => {
        if (e.response.status == 422) {
          let dataArray = Object.keys(e.response.data);

          let concatMessage = "";

          const concatObjectError = () => {
            dataArray.forEach((field) => {
              concatMessage = concatMessage + "\n" + e.response.data[field][0];
            });
          };

          concatObjectError();

          swal({
            icon: "error",
            title: "Oops...",
            text: `${concatMessage}`,
            timer: "5000",
          });
        } else {
          alert("Algo salio muy mal");
        }
      });
  };

  //cuando se da click en crear usuario---------------------------------------------

  const onClickCreateUser = async (e) => {
    let createUser = await postUser({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    if (createUser) {
      swal({
        icon: "success",
        title: "Todo bien",
        text: `usuario ${user.name} creado correctamente :)`,
        timer: "5000",
      });
      setuser({
        ...user,
        name: "",
        email: "",
        password: "",
      });
    }
  };
  //cuando se da click en crear usuario---------------------------------------------

  //para crear usuario---------------------------------------------------------

  //para loguear en firebase---------------------------------------------------------
  const logFirebase = () => {
    signInWithEmailAndPassword(auth, user.email, user.password);
  };

  //para loguear en firebase---------------------------------------------------------

  //Para loguear usuario(API POSTGRES)-----------------------------------------------------------------

  const postLog = async ({ email, password }) => {
    setuser({...{user, status: STATUS_LOADING}});
    return axiosClient()
      .post(`/login`, {
        email,
        password,
      })

      .then(({ data }) => {
        localStorage.setItem("Token", data.token);
        setuser({...{user, status: STATUS_LOGIN}});
        logFirebase();
        console.log(logFirebase());
        return data;
      })
      .catch((e) => {
        if (e.response.status == 422) {
          let dataArray = Object.keys(e.response.data);

          let concatMessage = "";

          const concatObjectError = () => {
            dataArray.forEach((field) => {
              concatMessage = concatMessage + "\n" + e.response.data[field][0];
            });
          };

          concatObjectError();

          swal({
            icon: "error",
            title: "Oops...",
            text: `${concatMessage}`,
            timer: "5000",
          });
        } else if (e.response.status == 401) {
          swal({
            title: "Error!",
            text: e.response.data.message,
            icon: "error",
          });
        } else {
          swal({
            title: "Error!",
            text: "Algo salio mal en la llamada al servidor",
            icon: "error",
          });
        }
      });
  };
  const onClickSignIn = async () => {
    let logUser = await postLog({
      email: user.email,
      password: user.password,
    });
    if (logUser) {
      swal({
        icon: "success",
        title: "Cargando...",
        timer: "5000",
      });
      setloginAuth(true);
      history.push("/items");
    }
  };

  useEffect(() => {
    setforToken(localToken);
    setloginAuth(true);

  }, [forToken]);

  //Para loguear usuario-----------------------------------------------------------------

  //Para recibir el tipo de valor y el valor de los Input Text------------------------
  const setFieldUser = (value, field) => {
    setuser({ ...user, [field]: value });
  };
  //Para recibir el tipo de valor y el valor de los Input Text------------------------

  //boton para  ver contraseña-------------------------------------------------
  const onClickViewPass = () => {
    if (viewpassword) {
      setviewpassword(false);
    } else {
      setviewpassword(true);
    }
  };
  //boton para  ver contraseña-------------------------------------------------

  //Para cerrar sesion-----------------------------------------------------------------
  const onClickSingOut = () => {
    localStorage.setItem("Token", null);
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("UserUid");

    signOut(auth);
    setloginAuth(false);
    window.location = "/login";
  };
  //Para cerrar sesion-----------------------------------------------------------------



  return (
    <AuthContext.Provider
      value={[
        { user, loginAuth, viewpassword, forToken },
        {
          setloginAuth,
          onClickCreateUser,
          setFieldUser,
          onClickSignIn,
          onClickViewPass,
          onClickSingOut,
          history,
        },
      ]}
    >
      {children}
    </AuthContext.Provider>
  );
};