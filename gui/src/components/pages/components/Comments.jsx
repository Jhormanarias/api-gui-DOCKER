import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
export const Comments = ({ comments }) => {
  const [{ post }, { setpost, enterComment, onclickDeleteComment}] = useContext(PokemonContext);

  
  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <div className="card text-white bg-secondary mb-3">
              <div className="card-body">
                <p className="card-text">{comment.comment}</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="button" className="btn btn-success"><i className="fa-solid fa-pen"></i></button>  {/* editar */}
                  <button type="button" className="btn btn-danger" onClick={()=>onclickDeleteComment(comment.id)}><i className="fa-solid fa-trash"></i></button>  {/* eliminar */}
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              
              <input
                type="text"
                className="form-control"
                placeholder="Aquí va tu comentario :) "
                aria-label="Aquí va tu comentario :) "
                onKeyPress={e=>enterComment(e,comment.id,comment.post_id)}
              />
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
              >
                Comentar
              </button>
            </div>
            <ol>
              {comment.comentarios.length > 0 && (
                <ol>
                  <Comments comments={comment.comentarios} />
                </ol>
              )}
            </ol>
          </div>
        );
      })}
    </div>
  );
};
