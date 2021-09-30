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
app.use(cors());

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
// routes
app.get("/", (req, res) => {
  res.send("Welcome to home  🥶🔧👿");
});

// start port
const start = (port) => {
  app.listen(port, () => {
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

module.exports = {
  app: app,
  start: start,
};
