//Imports Components---------------------------------------------------------------------
import React from 'react';
import { PokemonContext } from '../../contexts/PokemonContext';
import {Busqueda} from './components/Search';
import { useContext } from 'react';
import {Card} from './components/Card';
import {Header} from './components/Header';
import {Pagination} from './components/Pagination';
//Imports Components---------------------------------------------------------------------


//Export Component Pokemon---------------------------------------------------------------
export const Pokemon = () => {
    const [{pokemos},{setpokemos}] = useContext(PokemonContext);
    return (
        <div className="container-fluid">
            <Header />
            <br />
            <Busqueda />
            <Pagination />
            <Card /> 
            <br /><br /><br /><br />
        </div>
    )
};
//Export Component Pokemon---------------------------------------------------------------
