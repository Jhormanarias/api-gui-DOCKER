import React from "react";

export const SendMessage = () => {
  return (
    <>
      <form /* onSubmit={sendMessage} */>
        
        <div class="input-group mb-3 mt-4">
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
            Enviar <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </>
  );
};
