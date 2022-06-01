import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import axios from "axios";
import axiosClient from "../contexts/axios/cliente";
import swal from "sweetalert";
import { AuthContext } from "./AuthContext";
import appFirebase from "../firebase";
import {
  getFirestore,
  doc,
  getDoc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limitToLast,
  serverTimestamp,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import moment from "moment";
import { Messages } from "../components/pages/components/Messages";

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
  messages: [],
  users: {
    users: [],
    status: "noLoading",
  },
  usersFirebase: [],
  notifications: [],
};

//FireStore---------------------------------------------------------------------
const firestore = getFirestore(appFirebase);
const storage = getStorage(appFirebase);
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
  const [receptor, setreceptor] = useState(null);
  const [notifications, setnotifications] = useState(
    initialState.notifications
  );
  const [photo, setphoto] = useState(null);
  const [urlPhotoProfile, seturlPhotoProfile] = useState(null);
  const [urlSendImage, seturlSendImage] = useState(null);

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
          setpokemos({
            ...pokemos,
            pokemons: array,
          });
        });
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
    return axiosClient()
      .post(`/createpost`, {
        title,
        body,
        users_id: user.user.id,
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
    return axiosClient()
      .post(`/createcomment`, {
        comment,
        comment_id,
        post_id,
        users_id: user.user.id,
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
    return axiosClient()
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

  //Datos usuraio autenticado------------------------------------------------------------

  const [uid, setuid] = useState(localStorage.getItem("UserUid"));

  //const uid = localStorage.getItem("UserUid");

  //Datos usuraio autenticado------------------------------------------------------------

  //Para mandar mensaje en chat--------------------------------------------------------

  //Input Message---------------------
  const onChangeSendMessage = (e) => {
    setsendMessageState({ ...sendMessageState, sendMessage: e.target.value });
  };
  //Input Message---------------------

  //Prueba---------------------------
  const onCLickSendMessage = () => {
    const newMessage = {
      id: sendMessageState.sendMessage.length,
      text: sendMessageState.sendMessage,
    };

    const ChatCollection = collection(
      firestore,
      `chats/${uid}-${receptor}/mensajes`
    );
    addDoc(ChatCollection, {
      emisor: uid,
      message: newMessage.text,
      receptor,
      createdAt: moment().format("DD/MM/YYYY HH:mm:ss"),
      status: "enviado",
    });

    const ChatCollection2 = collection(
      firestore,
      `chats/${receptor}-${uid}/mensajes`
    );
    addDoc(ChatCollection2, {
      emisor: uid,
      message: newMessage.text,
      receptor,
      createdAt: moment().format("DD/MM/YYYY HH:mm:ss"),
      status: "enviado",
    });
    setsendMessageState({ ...sendMessageState, sendMessage: "" });
  };
  //Prueba---------------------------

  //Para mandar mensaje en chat--------------------------------------------------------

  //Consulta que me trae toda la coleccion de mensajes-----------------------------------

  useEffect(() => {
    if (receptor) {
      const q = query(
        collection(firestore, `chats/${uid}-${receptor}/mensajes`),
        orderBy("createdAt"),
        limitToLast(25)
      );
      const unsub = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.docs === []) {
          setmessagesState({ ...messagesState, messages: [] });
        } else {
          let docs = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setmessagesState({ ...messagesState, messages: docs });
        }
      });
    }
  }, [chatActivo]);

  useEffect(() => {
    console.log(messagesState.messages);
    //console.log(dateTimeNow);
  }, [messagesState]);

  //Consulta que me trae toda la coleccion de mensajes-----------------------------------

  //Consulta que me trae toda la coleccion de usuarios-----------------------------------
  useEffect(() => {
    const q = query(collection(firestore, "usuarios"));
    let usersArr = [];
    const unsub = onSnapshot(q, (querySnapshot) => {
      let docs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setusers({ ...users, users: docs, status: "noLoading" });
    });
  }, []);

  useEffect(() => {
    if (users.status === "noLoading") {
      setusers({
        ...users,
        users: users.users,
        status: "loading",
      });
    }
  }, [users]);
  //Consulta que me trae toda la coleccion de usuarios-----------------------------------

  //Notificaciones----------------------------------------------------------------------
  useEffect(() => {
    const q = query(
      collection(firestore, "notificaciones"),
      orderBy("createdAt"),
      limitToLast(10)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let docs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setnotifications(docs);
    });
  }, []);

  useEffect(() => {
    swal("Se ha creado un nuevo Post");
    setpost({ ...post, status: "Noloaded" });
  }, [notifications]);
  //Notificaciones----------------------------------------------------------------------

  const onclickChatMessagesStatus = () => {
    messagesState.messages.map((docMap) => {
      //console.log(docMap.emisor);
      if (docMap.receptor === uid) {
        if (docMap.status === "leido") {
          const docRef = doc(
            firestore,
            `chats/${receptor}-${uid}/mensajes/${docMap.id}`
          );
          //console.log(docRef);
          updateDoc(docRef, {
            status: "leido",
          });
          /* const docRef2 = doc(
            firestore,
            `chats/${uid}-${receptor}/mensajes/${docMap.id}`
          );
          //console.log(docRef);
          updateDoc(docRef2, {
            status: "leido",
          }); */
        }
        //console.log('leido');
        //console.log(docMap);
      }
      //console.log(docMap);

      /* if (doc.status==='enviado') {
      //setmessagesState({...messagesState,messages:{status: 'leido'}})
      const docRef = doc(
        firestore,
        `chats/${uid}-${receptor}/mensajes/`,
        `${doc.id}`
      );
      updateDoc(docRef, {
        status: 'leido',
      }); */

      /* const ChatCollection2 = getDoc(
        firestore,
        `chats/${receptor}-${uid}/mensajes/${doc.id}`
      );
      updateDoc(ChatCollection2, {
        status: 'leido',
      }); */
      //swal('enviado');
      //setsendMessageState({ ...sendMessageState, sendMessage: "" });
      //}
      //setmessagesState({...messagesState.messages, status: 'leido'})
    });
  };

  //Para subir imagen----------------------------------------------------------------------

  const postImage = async (image) => {
    return axiosClient()
      .post(`/createpictureprofile/${user.user.id}`, image)
      .then((data) => {
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

  const onClickUploadImage = (image) => {
    if (!image.target.files[0]) {
      swal("nada seleccionado");
      return false;
    }

    let photoForm = new FormData();
    photoForm.append("photo", image.target.files[0]);
    let postImageOk = postImage(photoForm);
    if (postImageOk) {
      swal("Imagen insertada correctamente");
    }
  };

  //Para subir imagen----------------------------------------------------------------------

  //Obtener imagen-------------------------------------------------------------------------

  const getImage = async () => {
    return axiosClient()
      .get(`/getPhotoProfile`)
      .then(({ data }) => {
        seturlPhotoProfile(null);
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

  useEffect(async () => {
    let getNamePhotoProfile = await getImage();
    seturlPhotoProfile(
      `${process.env.REACT_APP_HOST_LUMEN_WITH_PREFIX}/images/${getNamePhotoProfile}`
    );
  }, []);

  //Obtener imagen-------------------------------------------------------------------------

  //Mandar imagenes Chat-------------------------------------------------------------------

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const onClickSendImage = (e) => {
    const storageRef = ref(storage, `${random(1, 1000)}-${uid}-${receptor}`);
    let file = e.target.files[0];
    //Sube la imagen
    uploadBytes(storageRef, file).then((snapshot) => {
      //Descarga url para mostrar las imagenes después de haber subido la imagen
      getDownloadURL(storageRef).then((url) => {
        const ChatCollection = collection(
          firestore,
          `chats/${uid}-${receptor}/mensajes`
        );
        addDoc(ChatCollection, {
          emisor: uid,
          message: "image",
          image: url,
          receptor,
          createdAt: moment().format("DD/MM/YYYY HH:mm:ss"),
          status: "enviado",
        });

        const ChatCollection2 = collection(
          firestore,
          `chats/${receptor}-${uid}/mensajes`
        );
        addDoc(ChatCollection2, {
          emisor: uid,
          message: "image",
          image: url,
          receptor,
          createdAt: moment().format("DD/MM/YYYY HH:mm:ss"),
          status: "enviado",
        });
      });
    });
  };
  //Mandar imagenes Chat-------------------------------------------------------------------

  //Auto-scroll------------------------------------------------------------------------------

  

  /* const useChatScroll = ()=>{
    const dummy = useRef(<Messages/>);

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messagesState])
  } */

  /* const useChatScroll = () => {
    const ref =
      React.useRef <HTMLDivElement>
      React.useEffect(() => {
        if (ref.current) {
          ref.current.scrollTop = ref.current.scrollHeight;
        }
      }, [dep]);
    return ref;
  }; */
  //Auto-scroll------------------------------------------------------------------------------

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
          receptor,
          uid,
          urlPhotoProfile,
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
          setreceptor,
          onclickChatMessagesStatus,
          onClickUploadImage,
          onClickSendImage,
        },
      ]}
    >
      {children}
    </PokemonContext.Provider>
  );
};
