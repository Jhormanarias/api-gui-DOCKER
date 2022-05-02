import React , {useContext} from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";

export const SendMessage = () => {

  const [{sendMessageState}, {setsendMessageState, onChangeSendMessage, onCLickSendMessage}] = useContext(PokemonContext)

  return (
    <div className="align-items-end ">
      <form /* onSubmit={sendMessage} */>
        
        <div className="input-group mb-3 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Mensaje..."
            onChange={(e)=>{onChangeSendMessage(e)}}
          />
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={()=>{onCLickSendMessage()}}
          >
            Enviar <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};
