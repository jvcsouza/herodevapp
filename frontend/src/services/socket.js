import socket from "socket.io-client";

const url =
  process.env.NODE_ENV === "development" ? "http://localhost:3333" : "";

const client = socket(url, {
  transports: ["websocket"]
});

client.on("connect", () => {
  client.emit("joinRoom", "ong");
});

export default client;
