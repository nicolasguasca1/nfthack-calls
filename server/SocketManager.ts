// const io = require("./index").io;

import * as socketio from "socket.io";

const io: socketio.Server = new socketio.Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// module.exports = (socket: socketio.Socket) => {
//   try {
//     socket.emit("me", socket.id);

//     socket.on("disconnect", () => {
//       socket.broadcast.emit("callEnded");
//     });

//     socket.on("callUser", ({ userToCall, signalData, from, name }) => {
//       io.to(userToCall).emit("callUser", { signal: signalData, from, name });
//     });

//     socket.on("answerCall", (data) => {
//       io.to(data.to).emit("callAccepted", data.signal);
//     });
//   } catch (ex) {
//     console.log(ex);
//   }
// };

export default function SockerManager(socket: socketio.Socket) {
  try {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });
  } catch (ex) {
    console.log(ex);
  }
}
