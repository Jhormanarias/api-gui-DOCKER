import React, { useContext , useRef, useEffect } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
import { EncabezadoChat } from "./EncabezadoChat";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage";

export const ChatScreen = ({ chatActivo }) => {
  const [{ messagesState, messages , urlPhotoProfile }, {}] = useContext(PokemonContext);

  const dummy = useRef();

  useEffect(() => {
    if (messagesState) {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesState.messages])

  return (
    <div className=" col-md-9 chatScreen">
      {chatActivo === null ? (
        <>
        <h1>Bienvenido <i className="fa-solid fa-face-laugh-beam"></i></h1>
        </>
      ) : (
        <>
          <EncabezadoChat chatActivo={chatActivo} />

          <div className="chatScreenMessages">
          {messagesState.messages.map((message) => (
            <Messages
              key={message.id}
              textMessage={message.message}
              emisorMessage={message.emisor}
              status={message.status}
              image={message.image}
              messageTime={message.createdAt}
              photoProfile={urlPhotoProfile}
            />
          ))}
          <span ref={dummy}></span>
          </div>

          

          <SendMessage />
        </>
      )}
    </div>
  );
};
