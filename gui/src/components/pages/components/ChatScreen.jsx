import React , { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
import { EncabezadoChat } from "./EncabezadoChat";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage";


export const ChatScreen = ({chatActivo}) => {

  const [{messagesState},{}] = useContext(PokemonContext)

  return (
    <div className=" col-md-9 chatScreen">
      <EncabezadoChat chatActivo={chatActivo} />

      {messagesState.messages.map(message => (
        <Messages key={message.id} textMessage={message.message} emisorMessage={message.emisor} />
      ))}

      
      <SendMessage />
    </div>
  );
};
