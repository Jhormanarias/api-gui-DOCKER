import React from "react";
import { EncabezadoChat } from "./EncabezadoChat";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage";

export const ChatScreen = ({chatActivo}) => {
  return (
    <div className=" col-md-9 chatScreen">
      <EncabezadoChat chatActivo={chatActivo} />
      <Messages textMessage={"Holaaa"} />
      <Messages textMessage={"Mensaje de prueba"} />
      <Messages textMessage={"Pruebas y pruebas"} />
      <Messages textMessage={"No sé que hacer"} />
      <Messages textMessage={"Por favor"} />
      <Messages textMessage={'Ayuda :"(('} />
      
      <SendMessage />
    </div>
  );
};
