import axios from "axios";
const instance = axios.create({
  //   baseURL: "http://localhost:3000",
  baseURL: "https://shopipi.herokuapp.com/",
});
export default instance;
