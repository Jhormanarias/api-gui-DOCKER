//Imports Components---------------------------------------------------------------------
import React , { useContext } from 'react';
import { PokemonContext } from '../../../contexts/PokemonContext';
import {Delete} from './Delete';
//Imports Components---------------------------------------------------------------------

//Export Component Card---------------------------------------------------------------
export const Card = ()=>{

    const [{pokemos},{setpokemos}] = useContext(PokemonContext);

    return(
        <div className="row mt-4">
            {/* //POKEMON.MAP */}
            {/* map recorre cada objeto que tiene pokemons */}
            {pokemos.pokemons.map(pokemon => {
                return (
                    <div id={"pokeCard_" + pokemon.name} className="col-md-4 mb-3 mt-3 card " pokemonsFilter={pokemon.name}>
                        <div class="card-body">
                            {/* Aquí traemos el nombre del pokemon */}
                            <h5 class="card-title">{pokemon.name}</h5>
                            {/* Imprimimos en consola lo que trae pokemon */}
                            <img className="pokeImg" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}></img>
                            <Delete pokemonName={pokemon.name}/>
                        </div>
                    </div>
                    
                ) // END RETURN
            })
            }

            {/* END POKEMON.MAP */}
        </div>
    )
}
//Export Component Card---------------------------------------------------------------