import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";

export const SendMessage = () => {
  const [
    { sendMessageState },
    {
      setsendMessageState,
      onChangeSendMessage,
      onCLickSendMessage,
      onClickSendImage,
    },
  ] = useContext(PokemonContext);

  const onClickUploadImage = (e) => {
    document.getElementById("uploadImage").click();
    e.preventDefault();
  };

  return (
    <div className="align-items-end ">
      <form /* onSubmit={sendMessage} */>
        <div className="input-group mb-3 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Mensaje..."
            value={sendMessageState.sendMessage}
            onChange={(e) => {
              onChangeSendMessage(e);
            }}
          />
          <div className="inputImage">
            <button
              className="btn btn-outline-secondary"
              onClick={(e) => {
                onClickUploadImage(e);
              }}
            >
              <i class="fa-solid fa-cloud-arrow-up"></i>
            </button>
            <input
              name="photo"
              id="uploadImage"
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                onClickSendImage(e);
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={() => {
              onCLickSendMessage();
            }}
          >
            Enviar <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};
