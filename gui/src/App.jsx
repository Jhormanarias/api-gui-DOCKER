import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React, { useContext } from 'react';
import { NavBar } from './components/navigation/NavBar';
import { Inicio } from './components/pages/Inicio';
import { Pokemon } from './components/pages/Pokemon';
import { Items} from './components/pages/Items';
import { PokemonContextProvider } from './contexts/PokemonContext';
import { CreateUser } from './components/pages/CreateUser';
import { AuthContextProvider } from './contexts/AuthContext';
import { AuthContext } from "./contexts/AuthContext";
import { Login } from './components/pages/Login';



function App() {

  /* const [
    { loginAuth },
    {},
  ] = useContext(AuthContext) */

  /* let loginAuth = true; */
  

  /* const logOrApp = ()=>{
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

  return logOrApp(); */

  return (
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
        <AuthContextProvider>
            <CreateUser path='/createuser' component={CreateUser}/>
            <Login path='/login' component={Login}/>
        </AuthContextProvider>
      </Router>

    </div>
  );



}

export default App;
