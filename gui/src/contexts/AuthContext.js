import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import appFirebase from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const initialState = {
  user: {
    users: [],
    status: "Noloaded",
    name: "",
    email: "",
    password: "",
  },
};

const auth = getAuth(appFirebase);
//FireStore---------------------------------------------------------------------
const firestore = getFirestore(appFirebase);
//FireStore---------------------------------------------------------------------

export const AuthContext = createContext([]);

export const AuthContextProvider = ({ children }) => {
  //UseState---------------------------------------------------------
  const [loginAuth, setloginAuth] = useState(false);
  const [user, setuser] = useState(initialState);
  const [viewpassword, setviewpassword] = useState(false);
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
    return axios
      .post(`${process.env.REACT_APP_HOST_LUMEN_API}/createuser`, {
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
  const logFirebase = async () => {
    const userInfoLog = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    ).then((userResponseLog)=>{
      console.log(userResponseLog);
    });
  };

  //para loguear en firebase---------------------------------------------------------

  //Para loguear usuario(API POSTGRES)-----------------------------------------------------------------

  const postLog = async ({ email, password }) => {
    return axios
      .post(`${process.env.REACT_APP_HOST_LUMEN_API}/login`, {
        email,
        password,
      })

      .then(({ data }) => {
        //console.log(data.token);
        localStorage.setItem("Token", data.token);
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
        title: "Todo bien",
        text: `Logueado correctamente :)`,
        timer: "5000",
      });
    logFirebase();
      setuser({
        ...user,
        email: "",
        password: "",
      });
      window.location = "/items";
    }
  };

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

  return (
    <AuthContext.Provider
      value={[
        { user, loginAuth, viewpassword },
        {
          setloginAuth,
          onClickCreateUser,
          setFieldUser,
          onClickSignIn,
          onClickViewPass,
        },
      ]}
    >
      {children}
    </AuthContext.Provider>
  );
};
