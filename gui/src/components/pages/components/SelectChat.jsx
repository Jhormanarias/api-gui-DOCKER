import React , { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";

export const SelectChat = ({id, nameChat, setchatActivo}) => {
  const [{ }, {setreceptor}] = useContext(PokemonContext)

  const handleSelectChat = ()=>{
    setchatActivo(nameChat);
    setreceptor(id);
  }

  return (
    <div 
    onClick={()=>{handleSelectChat()}}
    className="input-group mb-3 input-group-sm mb-3 border-bottom pt-4 pb-4 selectChat">
        <img
          className="me-2"
          src="./user.png"
          alt="user"
          width="50"
          height="50"
        />
        <p>{nameChat}</p>
    </div>
    );
};
