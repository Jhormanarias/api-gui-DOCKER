import React , { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
import { EncabezadoChat } from "./EncabezadoChat";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage";


export const ChatScreen = ({chatActivo}) => {

  const [{messagesState, messages},{}] = useContext(PokemonContext)


  /* messages.map(message => {
    console.log(message);
  }) */

  /* messagesState.messages.map(message => {
    console.log(message.message);
  }) */

  //console.log(messages);

  return (
    <div className=" col-md-9 chatScreen">
      <EncabezadoChat chatActivo={chatActivo} />

      {messagesState.messages.map(message => (
        <Messages  textMessage={message.message} emisorMessage={message.emisor} messageTime={message.createdAt} />
      ))}

      
      <SendMessage />
    </div>
  );
};
