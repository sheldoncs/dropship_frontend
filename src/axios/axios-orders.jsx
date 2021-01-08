import axios from "axios";

const instance = axios.create({
  baseURL: "https://wizzywig-edc02-default-rtdb.firebaseio.com/",
});

export default instance;
