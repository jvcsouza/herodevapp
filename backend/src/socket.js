const container = require("static-vars");

/**
 * @type {SocketIO.Server}
 */
const io = container.get("socketio");

const Rooms = {
  USER: "user",
  ONG: "ong"
};

io.on("connect", socket => {
  socket.on("joinRoom", room => {
    socket.join(room);
    socket.send("connected as " + room);
  });
});

const notifyNewIncident = incident => {
  io.sockets.in(Rooms.USER).emit("newIncident", incident);
};

const notifyRemoveIncident = id => {
  io.sockets.in(Rooms.USER).emit("removeIncident", id);
};

module.exports = {
  notifyNewIncident,
  notifyRemoveIncident
};
