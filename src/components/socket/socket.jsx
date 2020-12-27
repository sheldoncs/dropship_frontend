import socketClient from "socket.io-client";

const socket = socketClient("http://localhost:8080");
socket.on("connection", () => {
  console.log(`I'm connected with the back-end`);
});

export default socket;
