import socketClient from "socket.io-client";
//
const socket = socketClient("https://heroku-seller-app.herokuapp.com");
socket.on("connection", () => {
  console.log(`I'm connected with the back-end`);
});

export default socket;
