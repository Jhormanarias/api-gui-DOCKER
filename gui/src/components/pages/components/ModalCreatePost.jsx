import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";

const ModalCreatePost = () => {
  const [
    { post, openmodal },
    { onclickCrearPost, setFieldPost, setopenmodal },
  ] = useContext(PokemonContext);
  return (
    <div className="container-fluid">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={() => setopenmodal(true)}
      >
        Crear Post
      </button>
      {openmodal && (
        <div
          className="modal fade show"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          style={{ display: "block" }}
          /* style={post.modalPost=="block" ? {display: "block"} : {display: "none" }} */
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Crear Post
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Titulo</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="titulo"
                      onChange={(e) => setFieldPost(e.target.value, "title")}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cuerpo del post</label>
                    <textarea
                      onChange={(e) => setFieldPost(e.target.value, "body")}
                      type="text-area"
                      className="form-control"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={(e) => setopenmodal(false)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => onclickCrearPost(e)}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalCreatePost;
