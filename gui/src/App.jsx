import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { NavBar } from "./components/navigation/NavBar";
import { Inicio } from "./components/pages/Inicio";
import { Pokemon } from "./components/pages/Pokemon";
import { Items } from "./components/pages/Items";
import { PokemonContextProvider } from "./contexts/PokemonContext";
import { CreateUser } from "./components/pages/CreateUser";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Login } from "./components/pages/Login";
import { Chat } from "./components/pages/Chat";

//FIREBASE--------------------------------------------------------------------
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from "./firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
//FIREBASE--------------------------------------------------------------------

//appFirebase;
const auth = getAuth(appFirebase);
const firestore = getFirestore(appFirebase);

const App = () => {
  let history = useHistory();
  let token = localStorage.getItem("Token");

  const [userAuth, setuserAuth] = useState(null);
  const [loginAuth, setloginAuth] = useState(false);

  const getName = async (uid) => {
    const docRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docRef);
    const infoFInal = docuCifrada.data().name;
    return infoFInal;
  };

  const setUserWithNameFireStore = (userFirebase) => {
    getName(userFirebase.uid).then((name) => {
      const userData = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        name: name,
      };
      setuserAuth(userData);
      localStorage.setItem("UserUid", userData.uid);
      localStorage.setItem("UserEmail", userData.email);
      localStorage.setItem("UserName", userData.name);
      console.log("Datos de usuario: ", userData);
    });
  };

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (!userAuth) {
        setUserWithNameFireStore(userFirebase);
      }
    } else {
      setuserAuth(null);
    }
    console.log(userFirebase);
  });

  return (
    <div className="App">
      {/* <Router>
        <AuthContextProvider>
          <Login path="/login" component={Login} />

          <CreateUser path="/createuser" component={CreateUser} />

          <NavBar />
          <PokemonContextProvider>
            <Route path="/" exact component={Inicio} />
            <Route path="/pokemon" component={Pokemon} />
            <Route path="/items" component={Items} />
            <Route path="/chat" component={Chat} />
          </PokemonContextProvider>
        </AuthContextProvider>
      </Router> */}

      {token === "null" ? (
        <Router>
          <AuthContextProvider>
            {window.location.pathname == "/login" ? (
              <Login path="/login" component={Login} />
            ) : (
              <CreateUser path="/createuser" component={CreateUser} />
            )}
          </AuthContextProvider>
        </Router>
      ) : (
        <Router>
          <Switch>
            <AuthContextProvider>
              <NavBar />
              <PokemonContextProvider>
                <Route path="/" exact component={Inicio} />
                <Route path="/pokemon" component={Pokemon} />
                <Route path="/items" component={Items} />
                <Route path="/chat" component={Chat} />
              </PokemonContextProvider>
            </AuthContextProvider>
          </Switch>
        </Router>
      )}

      {/* {token ?? (
        <Router>
          <Switch>
            <AuthContextProvider>
            <Login path="/login" component={Login} />
            <CreateUser path="/createuser" component={CreateUser} />
              <NavBar />
              <PokemonContextProvider>
                <Route path="/" exact component={Inicio} />
                <Route path="/pokemon" component={Pokemon} />
                <Route path="/items" component={Items} />
                <Route path="/chat" component={Chat} />
              </PokemonContextProvider>
            </AuthContextProvider>
          </Switch>
        </Router>
      )} */}

      {/* {userAuth ? (
        <Router>
          <NavBar />
          <Switch>
            <AuthContextProvider>
              <NavBar />
              <PokemonContextProvider>
                <Route path="/" exact component={Inicio} />
                <Route path="/pokemon" component={Pokemon} />
                <Route path="/items" component={Items} />
                <Route path="/chat" component={Chat} />
              </PokemonContextProvider>
            </AuthContextProvider>
          </Switch>
        </Router>
      ) : (
        <Router>
          <AuthContextProvider>
            {window.location.pathname == "/login" ? (
              <Login path="/login" component={Login} />
            ) : (
              <CreateUser path="/createuser" component={CreateUser} />
            )}
          </AuthContextProvider>
        </Router>
      )} */}
    </div>
  );
};

export default App;
