import React, { useContext, useState, useEffect } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../contexts/AuthContext";
import { PokemonContext } from "../../contexts/PokemonContext";
import { Comments } from "./components/Comments";
import ModalCreatePost from "./components/ModalCreatePost";

export const Items = () => {
  const [{ user }, {  }] = useContext(AuthContext);
  const [{ post }, { enterComment }] = useContext(PokemonContext);
  const [noloaded, setnoloaded] = useState(true);
  const userName = localStorage.getItem("UserName");

  if (noloaded) {
    if (userName) {
      swal({
        icon: "success",
        title: `Hola ${userName}`,
        text: `Bienvenido...`,
        timer: "6000",
      });
      setnoloaded(false);
    }
  }

  return (
    <div className="container-fluid pt-3">
      <h1>Post</h1>
      <br />
      <br />
      {JSON.stringify(user)}
      <ModalCreatePost />
      <br />
      <br />
      {post.posts.map((post) => {
        return (
          <div key={post.id}>
            <div className="card text-white bg-dark mb-3">
              <div class="card-header">
                <h5 className="card-title">{post.title}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{post.body}</p>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Aquí va tu comentario :) "
                aria-label="Aquí va tu comentario :) "
                onKeyPress={(e) => enterComment(e, null, post.id)}
              />
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
              >
                Comentar
              </button>
            </div>

            <br />
            <Comments comments={post.comentarios} />
          </div>
        );
      })}
    </div>
  );
};
