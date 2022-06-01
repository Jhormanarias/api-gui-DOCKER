import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";

export const Messages = ({
  textMessage,
  emisorMessage,
  status,
  image,
  messageTime,
  photoProfile,
}) => {
  const [{ messagesState, uid }, {}] = useContext(PokemonContext);

  return (
    <div className="col-md-12">
      <div
        className={`input-group mb-3 input-group-sm mb-3 ${
          emisorMessage === uid &&
          "justify-content-md-end justify-content-sm-end"
        }`}
      >
        <img
          className="me-2"
          src={emisorMessage === uid ? photoProfile : "./user.png"}
          alt="user"
          width="50"
          height="50"
        />
        <div className="squareMessage">
          {/* <h6 className="d-md-block">{emisorMessage}</h6 > */}
          <p>
            {textMessage == "image" ? (
              <img src={image} width="100%" height="120" />
            ) : (
              textMessage
            )}{" "}
            <br />
            {status}{" "}
            {emisorMessage === uid &&
              (status === "leido" ? (
                <i className="fa-solid fa-circle-check"></i>
              ) : (
                <i className="fa-regular fa-circle-check"></i>
              ))}{" "}
            {/* <i className="fa-regular fa-circle-check"></i>   <i className="fa-solid fa-circle-check"></i> */}
          </p>
          <p className="fechaSquareMessage justify-content-sm-end">
            <small>
              {messageTime}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};
