import React, { useContext } from "react";
//import appFirebase from "../../../firebase";
//import { getFirestore, doc, getDoc } from "firebase/firestore";

//const firestore = getFirestore(appFirebase);

export const Messages = () => {
  //const messageRef = firestore.collection("messages");
  //const query = messageRef.orderBy("createdAt").limitToLast(25);

  //const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <div className="container messages">
      {/* <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </main> */}

      <div class="input-group mb-3 input-group-sm mb-3">
        <img src="./user.png" alt="user" width="45" height="45" />
        <p className="squareMessage">Mensaje de prueba</p>
      </div>
      <div class="input-group mb-3 input-group-sm mb-3">
        <img src="./user.png" alt="user" width="45" height="45" />
        <p className="squareMessage">Mensaje de prueba</p>
      </div>
    </div>
  );
};
