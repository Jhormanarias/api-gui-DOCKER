import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import swal from "sweetalert";


const initialState = {
  user: {
    users: [],
    status: "Noloaded",
    name: "",
    email: "",
    password: ""
  },
};



export const AuthContext = createContext([]);

export const AuthContextProvider = ({ children })=>{

    const [loginAuth, setloginAuth] = useState(false);
    const [user, setuser] = useState(initialState);


    useEffect(() => {
      setuser({ ...user, name: user.name, email: user.email, password: user.password });
      console.log(user);
    }, [user.name, user.email, user.password]);





    const postUser = async ({ name, email, password }) => {
      return axios
        .post(`${process.env.REACT_APP_HOST_LUMEN_API}/createuser`, {
          name,
          email,
          password,
        })
  
        .then(({ data }) => {
          return data;
        })
        .catch((e) => {
          if (e.response.status == 422) {
  
            let dataArray = Object.keys(e.response.data);
  
            let concatMessage = '';
  
            const concatObjectError = ()=>{
              dataArray.forEach(field => {
                concatMessage = concatMessage+'\n'+e.response.data[field][0];
              });
            }

            concatObjectError()
  
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




    const onClickCreateUser = async (e) => {
      let createUser = await postUser({
        name: user.name,
        email: user.email,
        password: user.password
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



    const setFieldUser = (value, field) => {
      setuser({ ...user, [field]: value });
    };


    return(
        <AuthContext.Provider
        value={[
          { user, loginAuth},
          {
            setloginAuth,
            onClickCreateUser,
            setFieldUser
          },
        ]}
      >
        {children}
      </AuthContext.Provider>
    )

}