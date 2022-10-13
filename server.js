const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { createProxyMiddleware } = require("http-proxy-middleware");

let userCount = 0;
let maxUserCount = 0;

io.on("connection", (socket) => {
  userCount++;
  if (userCount > maxUserCount) {
    maxUserCount = userCount;
  }
  io.emit("user-count-change", userCount, maxUserCount);

  socket.on("disconnect", () => {
    userCount--;
    io.emit("user-count-change", userCount, maxUserCount);
  });
});

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
  <head>
    <title>&lt;title&gt;&lt;/title&gt;</title>
  </head>
  <body>
    <div style="text-align:center">
      <img src="">
    </div>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      var socket = io();
      socket.on('user-count-change', function (userCount, maxUserCount) {
        console.log(userCount, maxUserCount);
        document.getElementsByTagName('img')[0].src="/image/homer.gif?v="+Date.now();
      });

    </script>
  </body>
</html>`);
});

const correct = function (req, res, next) {
  if (userCount < maxUserCount) {
    res.status(404).send("no");
    console.log("block image");
  } else {
    console.log("no block image");
    next();
  }
};

app.use("/image", correct);

app.use(
  "/image",
  correct,
  createProxyMiddleware({
    target:
      "https://cdn.glitch.global/a4beeb0c-adae-42cc-bbae-4c576d6a08f0/homer.gif?v=1656604635723",
    changeOrigin: true,
  })
);

server.listen(3000, () => {
  console.log("listening on *:3000 hello");
});
