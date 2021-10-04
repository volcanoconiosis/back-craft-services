"use strict";

const exprees = require("express");
const errorHandler = require("./error-handler/500");
const notFound = require("./error-handler/404");
const routes = require("./auth/routes/routes");
const workerRoutes = require("./auth/routes/workerRoutes");
const clientRoutes = require("../src/auth/routes/clientRouter");
const adminRoutes = require("../src/auth/routes/adminRoutes");
const usersRoute = require("../src/auth/routes/usersRoutes");
const uploadImges = require("../src/auth/routes/uploadImges");
const app = exprees();
const cors = require("cors");
const http = require("http");
app.use(cors());
const server = http.createServer(app);

app.use(exprees.json());
app.use(exprees.urlencoded({ extended: true }));
app.use(routes);
app.use(workerRoutes);
app.use(clientRoutes);
app.use(adminRoutes);
app.use(usersRoute);
app.use(uploadImges);

// make the uploads folder is static (accessble)
app.use("/uploads", exprees.static("uploads"));
app.use("/images", exprees.static("images"));
app.use("/userImges", exprees.static("userImges"));
// routes
app.get("/", (req, res) => {
  res.send("Welcome to home  🥶🔧👿");
});

// start port
const start = (port) => {
  server.listen(port, () => {
    console.log("The server is started running at port", port);
  });
};

// bad router
app.get("/badmethod", (req, res) => {
  throw new Error("Error");
});
// use middleware
app.use(notFound);
app.use(errorHandler);

// exporting

// =========================== socket ===============================

const io = require("socket.io")(server);
const uuid = require("uuid").v4;

const msgQueue = {
  chores: {},
};

let target;
let target2;
const messanger = io.of("/messanger"); //namespace
messanger.on("connection", (socket) => {
  console.log("CONNECTED", socket.id);
  // when the parent adds a new chore
  socket.on("new_chore", (payload) => {
    const id = uuid();
    msgQueue.chores[id] = payload;
    target = msgQueue.chores[id][2];
    socket.emit("added", payload); // telling the parent a task was added
    messanger.emit("chore", { id: id, payload: msgQueue.chores[id][0] });
    let result = {
      event: "chore",
      payload: payload,
    };

    console.log(result);
  });

  socket.on("sendWorkerID", (workerID, clientID) => {
    if (workerID == target) {
      socket.on("get_all", () => {
        Object.keys(msgQueue.chores).forEach((id) => {
          if (
            msgQueue.chores[id].includes(workerID) &&
            msgQueue.chores[id].includes(clientID)
          ) {
            socket.emit("chore", { id: id, payload: msgQueue.chores[id][0] });
            // let result1= payload
            // console.log('Event', result1)
          }
        });
      });
    }
  });

  socket.on("responsMsg", (payload) => {
    const id = uuid();
    msgQueue.chores[id] = payload;
    target2 = msgQueue.chores[id][2];
    socket.emit("added_2", payload); // telling the parent a task was added
    messanger.emit("chore_2", { id: id, payload: msgQueue.chores[id][0] });
    let result = payload;
    console.log(result);
  });

  socket.on("sendClientID", (clientID, workerID) => {
    if (clientID == target2) {
      socket.on("get_all_2", () => {
        Object.keys(msgQueue.chores).forEach((id) => {
          if (
            msgQueue.chores[id].includes(clientID) &&
            msgQueue.chores[id].includes(workerID)
          ) {
            socket.emit("chore_2", { id: id, payload: msgQueue.chores[id][0] });
          }
        });
      });
    }
  });
});

// =========================== socket ===============================

module.exports = {
  app: server,
  start: start,
};
