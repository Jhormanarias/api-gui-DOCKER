import React, { useState, useContext } from "react";
import { PokemonContext } from "../../contexts/PokemonContext";
import { ChatScreen } from "./components/ChatScreen";
import { SelectChat } from "./components/SelectChat";
import { UserInfoChat } from "./components/UserInfoChat";

export const Chat = () => {
  const [{ users, chatActivo }, {setchatActivo}] = useContext(PokemonContext);

  return (
    <div className="container-fluid pt-3 chat">
      <div className="row justify-content-center">
        <div className="col-md-3 border-end">
          <UserInfoChat />

          {users.users.map((user) => (
          <SelectChat key={user.id} nameChat={user} setchatActivo={setchatActivo} />
          )
          )}
        </div>

        <ChatScreen chatActivo={chatActivo} />
      </div>
    </div>
  );
};
