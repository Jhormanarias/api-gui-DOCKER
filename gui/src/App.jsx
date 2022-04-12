import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import { NavBar } from "./components/navigation/NavBar";
import { Inicio } from "./components/pages/Inicio";
import { Pokemon } from "./components/pages/Pokemon";
import { Items } from "./components/pages/Items";
import { PokemonContextProvider } from "./contexts/PokemonContext";
import { CreateUser } from "./components/pages/CreateUser";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AuthContext } from "./contexts/AuthContext";
import { Login } from "./components/pages/Login";
import { Chat } from "./components/pages/Chat";

//FIREBASE--------------------------------------------------------------------
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from "./firebase";
//FIREBASE--------------------------------------------------------------------

//appFirebase;
const auth = getAuth(appFirebase);

function App() {
  let token = localStorage.getItem("Token");

  const [userAuth, setuserAuth] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setuserAuth(userFirebase);
    } else {
      setuserAuth(null);
    }
    console.log(userFirebase);
  });

  return (
    <div className="App">
      {/* {token==='null' ? 
      <Router>
        <AuthContextProvider>
          {window.location.pathname=='/login' ?
            <Login path='/login' component={Login}/>
          :
            <CreateUser path='/createuser' component={CreateUser}/>
          }
        </AuthContextProvider>
      </Router>
      :
      <Router>
        <NavBar/>
        <Switch>
          <PokemonContextProvider>
          <Route path='/' exact component={Inicio} />
          <Route path='/pokemon' component={Pokemon} />
          <Route path='/items' component={Items} />
          <Route path='/chat' component={Chat} />
          </PokemonContextProvider>
        </Switch>
      </Router>
      } */}

      {userAuth ? 
      <Router>
          <NavBar />
          <Switch>
            <PokemonContextProvider>
              <Route path="/" exact component={Inicio} />
              <Route path="/pokemon" component={Pokemon} />
              <Route path="/items" component={Items} />
              <Route path="/chat" component={Chat} />
            </PokemonContextProvider>
          </Switch>
        </Router>
      : 
        <Router>
          <AuthContextProvider>
            {window.location.pathname == "/login" ? (
              <Login path="/login" component={Login} />
            ) : (
              <CreateUser path="/createuser" component={CreateUser} />
            )}
          </AuthContextProvider>
        </Router>
      }
    </div>
  );
}

export default App;
