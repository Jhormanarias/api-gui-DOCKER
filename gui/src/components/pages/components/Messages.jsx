import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";


export const Messages = ({textMessage, emisorMessage}) => {
  
  const [{messagesState},{}] = useContext(PokemonContext)

  return (
    <div className="col-md-12">
      {/* <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </main> */}

      <div className={`input-group mb-3 input-group-sm mb-3 ${emisorMessage==localStorage.getItem('UserUid') && 'justify-content-md-end'}`}>
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
        </div>
      </div>
    </div>
  );
};
