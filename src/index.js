const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

// Emitting the bot location using socket.
io.on("connection", (socket) => {
  console.log("New WebSocket Connection");
  socket.on(
    "coordinateUpdate",
    (xdata, ydata, xdataFinal, ydataFinal, value, status) => {
      console.log(xdata);
      console.log(ydata);
      console.log(xdataFinal);
      console.log(ydataFinal);
      console.log(value);
      console.log(status);
      let args = [
        [xdata, ydata],
        [xdataFinal, ydataFinal],
      ];
      socket.emit("coordinateUpdate", value, args, status);
    }
  );
});

server.listen(port, () => {
  console.log("Server is up and running");
});
