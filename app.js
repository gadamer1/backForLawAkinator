/* socket\app.js */
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const results = [
  "판례 A와 연관이 있습니다",
  "판례 B와 연관이 있습니다",
  "판례 C와 연관이 있습니다",
  ,
  "판례 D와 연관이 있습니다",
  ,
  "판례 E와 연관이 있습니다",
];
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("request question", () => {
    console.log("request question");
    io.emit("receive question", "~와 연관이 있습니까?");
  });
  socket.on("answer", (number) => {
    io.emit("result", results);
    console.log("number", number);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
http.listen(5000, () => {
  console.log("Connected at 5000");
});
