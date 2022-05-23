//Imports Components---------------------------------------------------------------------
import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
//Imports Components---------------------------------------------------------------------


//Export Component Busqueda---------------------------------------------------------------
export const Busqueda = () => {
  const [{ pokemos, searchPokemon }, { setpokemos, setsearchPokemon }] = useContext(PokemonContext)
  const handleChange = (e) => {
    setpokemos({
      ...pokemos,
      searchtext: e.target.value
    })
    // let pokemonsWithout = pokemos.pokemons.filter(p=>p.name!=pokemonName);
    let pokemonFilter = pokemos.pokemons.filter(p => p.name == pokemos.searchtext);
  };

  const BuscaPokemonPrueba = (searchValue) => {
    setsearchPokemon(searchValue);
  }


  return (
    <div className="row">
      <div className="input-group mb-3 campoSearch">
        <input
          className='search form-control'
          type='search'
          onChange={(e)=>{handleChange(e)}}
          value={pokemos.searchtext}
          placeholder="Search Pokemon"
        />
        {searchPokemon}
      </div>
    </div>



  );
};
//Export Component Busqueda---------------------------------------------------------------
