import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React, { useContext } from 'react';
import { NavBar } from './components/navigation/NavBar';
import { Inicio } from './components/pages/Inicio';
import { Pokemon } from './components/pages/Pokemon';
import { Items} from './components/pages/Items';
import { PokemonContextProvider } from './contexts/PokemonContext';
import Login from './components/pages/Login';
import { AuthContextProvider } from './contexts/AuthContext';
import { AuthContext } from "./contexts/AuthContext";



function App() {

  /* const [
    { loginAuth },
    {},
  ] = useContext(AuthContext) */

  let loginAuth = false;
  

  const logOrApp = ()=>{
    if (loginAuth) {
      return(
        <div className="App">
          <Router>
            <NavBar/>
            <Switch>
              <PokemonContextProvider>
              <Route path='/' exact component={Inicio} />
              <Route path='/pokemon' component={Pokemon} />
              <Route path='/items' component={Items} />
              </PokemonContextProvider>
            </Switch>
          </Router>
        </div>
      )
    }
    else{
      return(
        <div className="App">
          <AuthContextProvider>
            <Login path='/login' component={Login}/>
          </AuthContextProvider>
        </div>
      )
    }
  };

  return logOrApp();
}

export default App;
