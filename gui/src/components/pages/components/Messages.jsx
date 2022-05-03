import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";


export const Messages = ({textMessage, emisorMessage, /* messageTime */}) => {
  
  const [{messagesState, uid},{}] = useContext(PokemonContext)

  /* let date = new Date(messageTime.seconds * 1000 + messageTime.nanoseconds/1000000);
  var timenow = [date.getHours(),date.getMinutes()].join(':');
  let dateString = date.toDateString(); */

  return (
    <div className="col-md-12">

      <div className={`input-group mb-3 input-group-sm mb-3 ${emisorMessage===uid && 'justify-content-md-end justify-content-sm-end'}`}>
        <img
          className="me-2"
          src="./user.png"
          alt="user"
          width="50"
          height="50"
        />
        <div className="squareMessage">
          {/* <h6 className="d-md-block">{emisorMessage}</h6 > */}
          <p>{textMessage}</p>
          {/* <p className="fechaSquareMessage justify-content-sm-end"><small>{dateString} {timenow}</small></p> */}
        </div>
      </div>
    </div>
  );
};
