//Importamos Librerias
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from 'react-router-dom';

//Iniciamos un estado con variable contador(No se usa) 
//y variable/objeto pokemon donde tiene:
//pokemons(donde trae todos los pokemon), 
//status(para saber si ya cargo o no cargo y así ejecutar el useEffect solo con una condición),
//pokeimg(variable pa probar(pero tampoco se usa))
const initialState = {
  count : 0,
  pokemon : {
    pokemons : [],
    status : "Noloaded",
    searchtext : "",
    offsett : 0,
    limit: 6,
    paginador : 0
  }
};
//Para exportar el inicio
export const Inicio = () => {
  //Aquí asignamos el estado inicial para el useEffect
  const [pokemos, setpokemos] = useState(initialState.pokemon); 
  //No se usa
  const [contador, setContador] = useState(initialState.count);
  const [esconderPokemon, setesconderPokemon] = useState(true);
  const [searchPokemon, setsearchPokemon] = useState("");
  useEffect(() => {
    //Solo se va a ejecutar la peticion cuando el estado pokemon aún no haya cargado
    if(pokemos.status=="Noloaded"){
      //peticion
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemos.limit}&offset=${pokemos.offsett}`)
    .then(({data}) => {
    //let pokemosApi = data.results;

    //Asignamos el estado pokemon, 1 los pokemons que trajo de la petición
    //2 cambiar el status a cargado, para que no ejecute la petición infinitamente
    setpokemos({...pokemos,
      pokemons:data.results,
      status: "loaded"}
    );

  })
    }

  }, [pokemos]); //Aquí pongo a escuchar al useEffect con el estado pokemon



  useEffect(() => {
    if(pokemos.searchtext.length>2){
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemos.searchtext}`)
      .then(({data})=>{
        let array = [data.species];
        setpokemos({...pokemos,
        pokemons: array})
      })
    }
    if(pokemos.searchtext.length===0){
      setpokemos({...pokemos,status:"Noloaded"})
    }
    
  }, [pokemos.searchtext])
  



  // //Esto es de una prueba anterior
  // const cambiarpokemon = () => {
  //   let pokemosApi = ["4", "5"];
  //   setpokemos(pokemosApi);
  // };

//Input para busqueda-----------------------------------------------------------------------
//        {pokemonsFilter}
const Busqueda = ({pokemonsFilter}) => {
  const handleChange = (e) =>{
    setpokemos({...pokemos,
      searchtext: e.target.value
    })
    // let pokemonsWithout = pokemos.pokemons.filter(p=>p.name!=pokemonName);
    let pokemonFilter = pokemos.pokemons.filter(p => p.name == pokemonsFilter);
  };

  const BuscaPokemonPrueba = (searchValue) =>{
    setsearchPokemon(searchValue);
  }


  return(
    <div className="input-group mb-3 campoSearch">
      {/* {pokemos.searchtext} */}
      <input 
        className='search form-control'
        type='search' 
        onChange={(e)=>{handleChange(e)}}
        value={pokemos.searchtext}
        placeholder="Search Pokemon"
    />
      {/* <button className="btn btn-primary">
      🔍
      </button> */}
      {/* <input 
      className='search form-control'
      type='text'
      placeholder="Search Pokemon 2"
      onChange={(e)=>BuscaPokemonPrueba(e.target.value)}
      value={searchPokemon}
      /> */}
      {searchPokemon}
    </div>
      
  );
};
//Fin input busqueda-----------------------------------------------------------------------

// returnamos boton eliminar---------------------------------------------------------------
const Button = ({ pokemonName }) => {
  const functionPokemon = ()=>{
    let pokemonsWithout = pokemos.pokemons.filter(p=>p.name!=pokemonName);
    setpokemos({...pokemos,
    pokemons: pokemonsWithout})
  }
  
 return (
   <button className="btn btn-danger"
   onClick={()=>functionPokemon()}>
     X
   </button>
 );
};
//Fin botón eliminar-------------------------------------------------------------------

// Botón Regresar---------------------------------------------------------------------

const BtnRegresar = () => {
  const onClickRegresar = ()=>{
    setpokemos({...pokemos,
      status: "Noloaded",
      offsett: pokemos.offsett-pokemos.limit,
      paginador: parseInt(pokemos.paginador)-1,
      searchtext : ""});
  };

  if(pokemos.offsett>0){
    return(
      <div className="col-md-5">
        <button 
        type="button" 
        className="btn btn-dark"
        onClick={()=>onClickRegresar()}
        >⬅️</button>
      </div>
    )
  }
  else{
    return(
      <div className="col-md-5">
        
      </div>
    )
  }

  
};

// Fin Botón Regresar---------------------------------------------------------------------

//Filtro de cuantos pokemon Mostrar------------------------------------------------
const FiltroNpokemon = ()=>{

  const options = [
    { value: 6 , label: '6' },
    { value: 30 , label: '30' },
    { value: 120 , label: '120' }
  ];

  const handleChange = (e)=>{
    let selectValue = e.value;
    setpokemos({...pokemos,
      limit: selectValue,
      status: "Noloaded",
    })
  }

  return(
    <div className="col-md-1">
      <Select 
        placeholder={pokemos.limit}
        defaultValue={pokemos.limit}
        options={options}
        onChange={handleChange}
      />
    </div>
    
  )
};

//Fin Filtro de cuantos pokemon Mostrar------------------------------------------------

// Paginador------------------------------------------------------------------------------
// const Paginador = ()=>{

//   const handleChange = (e)=>{
//     let page = e.target.value;
//     setpokemos({...pokemos,
//     paginador: page,
//     offsett: page*6,
//     status: "Noloaded"})
//   }

//   return(
//     <div className="col-md-2">
//       <input
//         className='search form-control text-center'
//         type='text'
//         onChange={handleChange}
//         value={pokemos.paginador}
//       />
//     </div>
//   )
// }
// Fin Paginador------------------------------------------------------------------------

// Botón Avanzar---------------------------------------------------------------------

const BtnAvanzar = () => {

  const onClickAvanzar = ()=>{
    setpokemos({...pokemos,
      status: "Noloaded",
      offsett: pokemos.offsett+pokemos.limit,
      paginador: parseInt(pokemos.paginador)+1,
      searchtext : ""});
  };

  if(pokemos.offsett<1126){
    return(
      <div className="col-md-5">
        <button 
        type="button" 
        className="btn btn-dark"
        onClick={()=>onClickAvanzar()}
        >➡️</button>
      </div>
    )
  }
  else{
    return(
      <div className="col-md-5">
        
      </div>
    )
  }


  
};

// Fin Botón Avanzar---------------------------------------------------------------------

//Inicio del return del inicio(página inicio, componente)------------------------------------
  return (
    <div>
        {/* Titulo en imagen */}
        <Link className="nav-link" to="/">
        <img
          style={{ cursor: "pointer" }}
          src="./logoPokemon.png"
          width="500"
        />
        </Link>
        
        <br />
        {/* Llamo al componente busqueda */}
        {/*  */}
        <Busqueda />
        {/* Aquí recorremos cada uno de los pokemon que trajo con la funcion map(que sirve para recorrer un objeto)*/}
        <div className="container-fluid">
          <div className="row">
            <BtnRegresar />
            {/* <Paginador /> */}
            <FiltroNpokemon />
            <BtnAvanzar />
            {pokemos.pokemons.map(pokemon=>{
              return(
                    <div key={pokemon.name} className="col-md-4 mb-5">
                      <div id={"pokeCard_"+pokemon.name} >
                        {/* Aquí traemos el nombre del pokemon */}
                        <h2>{pokemon.name}</h2>
                        {/* Aquí para la src de la imagen lo traemos de la we pokemondb y para saber que pokemon es le asignamos el nombre que anteriormente traimos */}
                        <img className="pokeImg" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}></img>
                        <Button pokemonName={pokemon.name} />
                      </div>
                    </div>
              ) // END RETURN
            })}
            {/* END POKEMON.MAP */}
          </div>
        </div>
      
    </div>
  );
  
};
//Fin return del inicio(página inicio, componente)------------------------------------------





