import React from "react";

export const SendMessage = () => {
  return (
    <div className="align-items-end ">
      <form /* onSubmit={sendMessage} */>
        
        <div className="input-group mb-3 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Mensaje..."
          />
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
          >
            Enviar <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};
