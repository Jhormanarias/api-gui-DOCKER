import React, { useContext } from "react";
//import appFirebase from "../../../firebase";
//import { getFirestore, doc, getDoc } from "firebase/firestore";

//const firestore = getFirestore(appFirebase);

export const Messages = ({textMessage}) => {
  //const messageRef = firestore.collection("messages");
  //const query = messageRef.orderBy("createdAt").limitToLast(25);

  //const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <div className="col-md-5">
      {/* <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </main> */}

      <div className="input-group mb-3 input-group-sm mb-3">
        <img
          className="me-2"
          src="./user.png"
          alt="user"
          width="50"
          height="50"
        />
        <p className="squareMessage">{textMessage}</p>
      </div>
    </div>
  );
};
