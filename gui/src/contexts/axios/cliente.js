import axios from "axios";

const client = () => {
    let token = '';
  if (localStorage) {
      token = localStorage.getItem("Token");
  }
    return axios.create({
        baseURL: process.env.REACT_APP_HOST_LUMEN_API,
        headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      }})
}

export default client

