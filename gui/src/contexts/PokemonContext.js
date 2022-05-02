import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import axiosClient from "../contexts/axios/cliente";
import swal from "sweetalert";
import { AuthContext } from "./AuthContext";
import appFirebase from "../firebase";
import { getFirestore, doc, getDoc, onSnapshot, collection, query, where, orderBy, limitToLast } from "firebase/firestore";
import {useCollectionData} from 'react-firebase-hooks/firestore';

const initialState = {
  pokemon: {
    pokemons: [],
    status: "Noloaded",
    searchtext: "",
    offsett: 0,
    limit: 6,
    paginador: 0,
    count: 0,
  },
  post: {
    posts: [],
    status: "Noloaded",
    comment: "",
    commentStatus: "nadaComentado",
    savePost: {
      title: "",
      body: "",
    },
    createPostStatus: "",
    modalPost: "none",
  },
  chat: {
    messages: [],
    sendMessage: "",
    status: "noLoading",
  },
  messages: {},
  users: {
    users: [],
    status: 'noLoading'
  }
};

//FireStore---------------------------------------------------------------------
const firestore = getFirestore(appFirebase);
//FireStore---------------------------------------------------------------------

export const PokemonContext = createContext([]);

export const PokemonContextProvider = ({ children }) => {
  const [{ user, loginAuth, forToken }, { history, setloginAuth }] =
    useContext(AuthContext);

  const [pokemos, setpokemos] = useState(initialState.pokemon);
  const [searchPokemon, setsearchPokemon] = useState("");
  const [post, setpost] = useState(initialState.post);
  const [openmodal, setopenmodal] = useState(false);
  const [tokenState, settokenState] = useState(forToken);
  const [sendMessageState, setsendMessageState] = useState(initialState.chat);
  const [messagesState, setmessagesState] = useState(initialState.chat);
  const [messages, setmessages] = useState(initialState.messages);
  const [users, setusers] = useState(initialState.users);
  const [chatActivo, setchatActivo] = useState(null);


  useEffect(async () => {
    //Solo se va a ejecutar la peticion cuando el estado pokemon aún no haya cargado
    if (pokemos.status == "Noloaded") {
      let count = await getCount();

      //peticion
      let data = await getPokemons();

      //Asignamos el estado pokemon, 1 los pokemons que trajo de la petición
      //2 cambiar el status a cargado, para que NO ejecute la petición infinitamente
      setpokemos({
        ...pokemos,
        pokemons: data,
        status: "loaded",
        count,
      });
    }
  }, [pokemos]); //Aquí pongo a escuchar al useEffect con el estado pokemon

  //Para searchtext------------------------------------------------------------------------
  useEffect(() => {
    if (pokemos.searchtext.length > 2) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemos.searchtext}`)
        .then(({ data }) => {
          let array = [data.species];
          console.log(data);
          setpokemos({
            ...pokemos,
            pokemons: array,
          });
        })
        .catch((e) => console.log(e));
    }
    if (pokemos.searchtext.length === 0) {
      setpokemos({ ...pokemos, status: "Noloaded" });
    }
  }, [pokemos.searchtext]);
  //Para searchtext------------------------------------------------------------------------

  //Para count---------------------------------------------------------------
  //Count
  const getCount = () => {
    const url = "https://pokeapi.co/api/v2/pokemon";
    return axios
      .get(url)
      .then(({ data }) => {
        return data.count;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  };

  //Para Obtener pokemons--------------------------------------------------------------
  //Count
  const getPokemons = () => {
    return axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${pokemos.limit}&offset=${pokemos.offsett}`
      )

      .then(({ data }) => {
        return data.results;
      })
      .catch((e) => {
        alert("Algo salio mal");
      });
  };

  //Para cuando se elimina un pokemon-------------------------------------------------
  const functionPokemon = (pokemonName) => {
    let pokemonsWithout = pokemos.pokemons.filter((p) => p.name != pokemonName);
    console.log(pokemonsWithout);
    setpokemos({
      ...pokemos,
      pokemons: pokemonsWithout,
    });
  };
  //Para cuando se elimina un pokemon-------------------------------------------------

  //Para cuando se hace click en el botón regresar-------------------------------------
  const onClickRegresar = () => {
    changePage(
      pokemos.offsett - pokemos.limit,
      parseInt(pokemos.paginador) - 1
    );
  };
  //FIN Para cuando se hace click en el botón regresar-------------------------------------

  //Para boton avanzar----------------------------------------------------------------
  const onClickAvanzar = () => {
    changePage(
      pokemos.offsett + pokemos.limit,
      parseInt(pokemos.paginador) + 1
    );
  };
  //FIn Para boton avanzar-----------------------------------------------------------

  //Para cuando se hace click en algún boton de paginación------------------------------------
  const onClickCurrentPage = (pagina, e) => {
    //Aquí comparo el estado paginador y el click del boton para no ejecutar petición
    if (pokemos.paginador != e.target.value) {
      changePage(pagina * pokemos.limit, parseInt(pagina) + 1);
    }
  };
  //FIn Para cuando se hace click en algún boton de paginación-----------------------------------

  //Cambiar de pagina-----------------------------------------------------------------------
  const changePage = (offset, paginador) => {
    setpokemos({
      ...pokemos,
      status: "Noloaded",
      offsett: offset,
      paginador: paginador,
      searchtext: "",
    });
  };

  //Cambiar de pagina-----------------------------------------------------------------------

  //Para refescar la pagina----------------------------------------------------------------
  const onClickRefresh = () => {
    setpokemos({
      ...pokemos,
      status: "Noloaded",
    });
  };
  //Fin Para refescar la pagina----------------------------------------------------------------

  //FiltroNPokemon---------------------------------------------------------------------
  const handleChangeFilter = (e) => {
    let selectValue = e.value;
    setpokemos({
      ...pokemos,
      limit: selectValue,
      status: "Noloaded",
    });
  };
  //FiltroNPokemon---------------------------------------------------------------------

  //Esto es para saber si el localStorage esta disponible

  /* if (typeof(Storage) !== "undefined") {
      console.log('LocalStorage disponible');
      // LocalStorage disponible
  } else {
      console.log('LocalStorage ---NO--- disponible');
      // LocalStorage no soportado en este navegador
  } */

  // localStorage.setItem("Token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjQ5NzA5MDMzLCJleHAiOjE2NDk3MTI2MzMsIm5iZiI6MTY0OTcwOTAzMywianRpIjoiTWdOalVxc3huTk90NjdsTSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.lKyMc9C8WmHzjlRVqWSeH95NDwSteTTG0dMHAYPBTTw");

  //console.log(localStorage.getItem('Token'));

  //Para obtener todos los post y comentarios-----------------------------------------
  const getPost = async () => {
    if (loginAuth) {
      return axiosClient()
        .get(`/allposts`)

        .then(({ data }) => {
          return data;
        })
        .catch((e) => {
          if (e.response.status == 401) {
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
    }
  };
  //Para obtener todos los post y comentarios-----------------------------------------

  //Para crear post--------------------------------------------------------------

  useEffect(async () => {
    setpost({ ...post, title: post.title, body: post.body });
  }, [post.title, post.body]);

  const postPost = async ({ title, body }) => {
    return axiosClient
      .post(`/createpost`, {
        title,
        body,
        users_id: 1,
      })

      .then(({ data }) => {
        return data;
      })
      .catch((e) => {
        /* console.log(e.response.data); */

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
            /* Texto */
            text: `${concatMessage}`,

            /* `${e.response.data.title==undefined ? ('') : e.response.data.title} 
             \n ${e.response.data.body==undefined ?('') : e.response.data.body}`, */
            /* Texto */
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

  const onclickCrearPost = async (e) => {
    let createPost = await postPost({
      title: post.title,
      body: post.body,
    });

    if (createPost) {
      swal({
        icon: "success",
        title: "Todo bien",
        text: "Post subido correctamente :)",
        timer: "5000",
      });
      console.log(post);
      setpost({
        ...post,
        title: "",
        body: "",
        status: "Noloaded",
        modalPost: "none",
      });
      setopenmodal(false);
    }
  };

  const setFieldPost = (value, field) => {
    setpost({ ...post, [field]: value });
  };

  //Para crear post--------------------------------------------------------------

  //Para Mandar el comentario----------------------------------------------------
  const postComment = async ({ comment, comment_id, post_id }) => {
    return axiosClient
      .post(`/createcomment`, {
        comment,
        comment_id,
        post_id,
        users_id: 1,
      })

      .then(({ data }) => {
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

  const enterComment = async (e, comment_id, post_id) => {
    if (e.key === "Enter") {
      let comment = await postComment({
        comment: e.target.value,
        comment_id: comment_id,
        post_id: post_id,
      });
      if (comment) {
        swal({
          title: "Correcto",
          text: "Comentario Subido :) ",
          icon: "success",
          button: "Aceptar",
          timer: "2000",
        });
        e.target.value = "";
        setpost({ ...post, status: "Noloaded" });
      }
    }
  };

  //Para Mandar el comentario----------------------------------------------------

  //Para eliminar el comentario----------------------------------------------------
  const deleteComment = async (id) => {
    return axiosClient
      .delete(`/deletecomment/${id}`)

      .then(({ data }) => {
        return data;
      })
      .catch((e) => {
        if (e.response.status == 409) {
          return 409;
        }
        if (e.response.status == 422) {
          return 422;
        } else {
          swal({
            title: "Error!",
            text: "Algo salio mal en la llamada al servidor",
            icon: "error",
          });
        }
      });
  };

  const onclickDeleteComment = async (id) => {
    setloginAuth(true);
    swal({
      title: "Eliminar",
      text: "Estas seguro de eliminar?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then(async (respuesta) => {
      if (respuesta) {
        let onDeleteComment = await deleteComment(id);
        if (onDeleteComment) {
          setpost({ ...post, status: "Noloaded" });
          swal({
            title: "Correcto",
            text: "Comentario Eliminado :) ",
            icon: "success",
            button: "Aceptar",
            timer: "2000",
          });
        }
      }
    });
  };

  //Para eliminar el comentario----------------------------------------------------

  //Para cargar post--------------------------------------------------------------------
  useEffect(async () => {
    if (loginAuth) {
      if (post.status == "Noloaded") {
        async function getData() {
          let posts = await getPost();

          if (posts) {
            setpost({ ...post, posts, status: "loaded" });
          }
        }
        getData();
      }
    }
  }, [post]);

  useEffect(() => {}, [loginAuth]);

  //Para cargar comentarios-------------------------------------------------------------

  //Para mandar mensaje en chat--------------------------------------------------------

  //Input Message---------------------
  const onChangeSendMessage = (e) => {
    setsendMessageState({ ...sendMessageState, sendMessage: e.target.value });
    console.log(sendMessageState);
  };
  //Input Message---------------------

  //Prueba---------------------------
  const onCLickSendMessage = () => {
    const newMessage = {
      id: sendMessageState.sendMessage.length,
      text: sendMessageState.sendMessage
    }

    /* messagesRef.add({
      message: trimmedMessage,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    }); */



    swal("Message: " + sendMessageState.sendMessage);
  };
  //Prueba---------------------------

  //Para mandar mensaje en chat--------------------------------------------------------

  //Para ver mensaje en chat--------------------------------------------------------


  /* const getMessage = async () => {
    const docRef = doc(firestore, `messages/O2Essqk31DqgzWCwIhTe`);
    const docuCifrada = await getDoc(docRef);
    const infoFInal = docuCifrada.data().message;
    return infoFInal;
  }; */

  useEffect(async () => {
    if (messagesState.status == "noLoading") {
      if (messagesState.messages) {
        setmessagesState({
          ...messagesState,
          status: "loading",
        });
        console.log(messagesState);
      }
    }
  }, [messagesState.messages]);

  //Consulta que me trae toda la coleccion de mensajes-----------------------------------

  useEffect(() => {
    const q = query(collection(firestore, "chats/frailejon-juanito/mensajes"), orderBy('createdAt'), limitToLast(25));
    let messages = []
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.map(d => {
        let message = d.data().message;
        messages.push(message)
        setmessages(d.data())
        setmessagesState({...messagesState,
        messages,
        })
      })
    });
  }, [])
  
  //Consulta que me trae toda la coleccion de mensajes-----------------------------------

  //Consulta que me trae toda la coleccion de usuarios-----------------------------------
  useEffect(() => {
    const q = query(collection(firestore, "usuarios"));
    const usersArr = []
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.map(d => {
        let user = d.data().name;
        usersArr.push(user)
        setmessages(d.data())
        setusers({...users,
        users: usersArr,
        })
      })
    });
  }, [])


  useEffect(() => {
    if (users.status == "noLoading") {
      if (users.users) {
        setusers({
          ...users,
          status: "loading",
        });
        console.log(users);
      }
    }
  }, [users])
  


  //Consulta que me trae toda la coleccion de usuarios-----------------------------------



  /* useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = query.onSnapshot((querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
    setsendMessageState(data);
    console.log(sendMessageState);
    });

    // Detach listener
    return unsubscribe;
  }, []); */

  //Para ver mensaje en chat--------------------------------------------------------

  return (
    <PokemonContext.Provider
      value={[
        {
          pokemos,
          searchPokemon,
          post,
          openmodal,
          sendMessageState,
          messagesState,
          messages,
          users,
          chatActivo,
        },
        {
          setpokemos,
          setsearchPokemon,
          setpost,
          functionPokemon,
          onClickRegresar,
          handleChangeFilter,
          onClickCurrentPage,
          onClickRefresh,
          onClickAvanzar,
          postComment,
          enterComment,
          onclickDeleteComment,
          onclickCrearPost,
          setFieldPost,
          setopenmodal,
          onChangeSendMessage,
          onCLickSendMessage,
          setchatActivo,
        },
      ]}
    >
      {children}
    </PokemonContext.Provider>
  );
};
