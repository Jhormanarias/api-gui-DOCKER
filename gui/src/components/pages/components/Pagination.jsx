//Imports Components---------------------------------------------------------------------
import React, { useContext } from 'react';
import { PokemonContext } from '../../../contexts/PokemonContext';
import Select from 'react-select';
//Imports Components---------------------------------------------------------------------

//Export Component Pagination-------------------------------------------------------------
export const Pagination = () => {

    const [{ pokemos }, 
            { setpokemos, onClickRegresar, 
                handleChangeFilter, onClickCurrentPage, onClickRefresh,
                onClickAvanzar }] = useContext(PokemonContext);
    const maxCount = 1126;

    // Botón Regresar---------------------------------------------------------------------
    const BtnRegresar = () => {

        
            return (
                <div className="col-md-5">
                    {pokemos.offsett > 0 && (<button
                        type="button"
                        class="btn btn-dark"
                        onClick={() => onClickRegresar()}
                    >⬅️</button>)}
                    
                </div>
            )
        
        
    };
    // Fin Botón Regresar---------------------------------------------------------------------

    //Filtro de cuantos pokemon Mostrar------------------------------------------------
    const FiltroNpokemon = () => {

        const options = [
            { value: 6, label: '6' },
            { value: 30, label: '30' },
            { value: 120, label: '120' }
        ];

        return (
            <div className="col-md-2">
                <Select
                    placeholder={pokemos.limit}
                    defaultValue={pokemos.limit}
                    options={options}
                    onChange={handleChangeFilter}
                />
            </div>

        )
    };

    //Fin Filtro de cuantos pokemon Mostrar------------------------------------------------

    // Botón Avanzar---------------------------------------------------------------------

    const BtnAvanzar = () => {

        

        if (pokemos.offsett + pokemos.limit <= pokemos.count) {
            return (
                <div className="col-md-5">
                    <button
                        type="button"
                        class="btn btn-dark"
                        onClick={() => onClickAvanzar()}
                    >➡️</button>
                </div>
            )
        }
        else {
            return (
                <div className="col-md-5">

                </div>
            )
        }
    };

    // Fin Botón Avanzar---------------------------------------------------------------------


    //Boton Groups-------------------------------------------------------------------
    const BtnGroups = () => {
        return (
            <div className='btn-toolbar justify-content-center mt-4'>
                {
                Array(Math.round(pokemos.count / pokemos.limit)).fill(1)
                    .map((num, pagina) => { 
                            /* En el className hago una condicion para pintar el boton al que le hice click con el estado paginador */
                        return <button className={`btn btn-outline-secondary${pagina+1==pokemos.paginador ?' active' : ''} `} onClick={(e) => onClickCurrentPage(pagina,e)} value={parseInt(pagina)+1}>{pagina + 1}</button>
                    })
            }
            </div>
        )
    }


    const BtnRefresh = ()=>{

        return (
        <div className="col-md-1 justify-content-center">
            <button className='btn' onClick={()=>onClickRefresh()}>🔄</button>    
        </div>
        )
    }

    return (
        <div className='row'>

            <BtnRegresar />
            <FiltroNpokemon />
            <BtnAvanzar />
            <BtnGroups />
            <BtnRefresh />
        </div>
    )

}
//Export Component Pagination-------------------------------------------------------------