import React, { useState, useContext } from "react";
import { PokemonContext } from "../../contexts/PokemonContext";
import { ChatScreen } from "./components/ChatScreen";
import { SelectChat } from "./components/SelectChat";
import { UserInfoChat } from "./components/UserInfoChat";

export const Chat = () => {
  const [{ users, chatActivo }, { setchatActivo }] = useContext(PokemonContext);

  return (
    <div className="container-fluid pt-3 chat">
      <div className="row justify-content-center">
        <div className="col-md-3 border-end left-page">
          <UserInfoChat />
          <div className="scrollSelectChat">
            {users.users.map((user) => (
              <SelectChat
                key={user.id}
                id={user.id}
                nameChat={user.name}
                setchatActivo={setchatActivo}
              />
            ))}
          </div>
        </div>

        <ChatScreen chatActivo={chatActivo} />
      </div>
    </div>
  );
};
