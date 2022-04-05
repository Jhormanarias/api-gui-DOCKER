import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { NavBar } from './components/navigation/NavBar';
import { Inicio } from './components/pages/Inicio';
import { Pokemon } from './components/pages/Pokemon';
import { Items} from './components/pages/Items';
import { PokemonContextProvider } from './contexts/PokemonContext';



function App() {
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
      </Router>

    </div>
  );
}

export default App;
