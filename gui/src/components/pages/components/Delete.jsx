//Imports Components---------------------------------------------------------------------
import React, { useContext } from 'react';
import { PokemonContext } from '../../../contexts/PokemonContext';
//Imports Components---------------------------------------------------------------------

//Export Component Botón Delete----------------------------------------------------------
export const Delete = ({pokemonName}) => {

    const [{pokemos},{setpokemos,functionPokemon}] = useContext(PokemonContext);

   return (
    // <div class="d-grid gap-2 mt-3">
        <button className="btn btn-danger"
            onClick={() => functionPokemon(pokemonName)}>
            X
            <icon setpokemos={setpokemos}></icon>
        </button>
    // {/* </div> */}



     
   );
};
//Export Component Botón Delete----------------------------------------------------------