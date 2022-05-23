import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
import { EncabezadoChat } from "./EncabezadoChat";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage";

export const ChatScreen = ({ chatActivo }) => {
  const [{ messagesState, messages }, {}] = useContext(PokemonContext);

  return (
    <div className=" col-md-9 chatScreen">
      {chatActivo === null ? (
        <>
        <h1>Bienvenido <i className="fa-solid fa-face-laugh-beam"></i></h1>
        </>
      ) : (
        <>
          <EncabezadoChat chatActivo={chatActivo} />

          {messagesState.messages.map((message) => (
            <Messages
              key={message.id}
              textMessage={message.message}
              emisorMessage={message.emisor}
              status={message.status}
              image={message.image}
              messageTime={message.createdAt}
            />
          ))}

          <SendMessage />
        </>
      )}
    </div>
  );
};
