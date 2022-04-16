import React from "react";
import { Messages } from "./components/Messages";
import { SendMessage } from "./components/SendMessage";

export const Chat = () => {
  return (
    <div className="container-fluid pt-3 chat">
      <div className="row justify-content-center">
        {/* Donde aparece la información del usuario */}
        <div className="col-md-3 border-end">
          <figure className="text-end border-bottom">
            <img src="./user.png" alt="user" width="64" height="64" />
            <h5>{localStorage.getItem("UserName")}</h5>
            <p>
              <small>
                <em>
                  <strong>ID:</strong> {localStorage.getItem("UserUid")}
                </em>
              </small>
            </p>
          </figure>
        </div>
        {/* Donde aparece la información del usuario */}

        <div className=" col-md-9 messages">
          Messages
          <Messages textMessage={'Holaaa'}/>
          <Messages textMessage={'Mensaje de prueba'}/>
          <Messages textMessage={'Pruebas y pruebas'}/>
          <Messages textMessage={'No sé que hacer'}/>
          <Messages textMessage={'Por favor'}/>
          <Messages textMessage={'Ayuda :"(('}/>

          <SendMessage />
        </div>
      </div>
    </div>
  );
};
