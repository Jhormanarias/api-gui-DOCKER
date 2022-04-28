import React , { useState } from "react";
import { ChatScreen } from "./components/ChatScreen";
import { SelectChat } from "./components/SelectChat";
import { UserInfoChat } from "./components/UserInfoChat";




export const Chat = () => {

  const [chatActivo, setchatActivo] = useState(null);

  return (
    <div className="container-fluid pt-3 chat">
      <div className="row justify-content-center">
        <div className="col-md-3 border-end">
          <UserInfoChat />
          <SelectChat nameChat={'Juanito'} setchatActivo={setchatActivo}/>
          <SelectChat nameChat={'Jhorman'} setchatActivo={setchatActivo}/>
          <SelectChat nameChat={'Pepito Peréz'} setchatActivo={setchatActivo}/>

        </div>

        <ChatScreen chatActivo={chatActivo} />
      </div>
    </div>
  );
};
