"use strict";

const exprees = require("express");
const errorHandler = require('./error-handler/500');
const notFound = require('./error-handler/404');
const app = exprees();

app.use(exprees.json());
app.use(exprees.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.send("Welcome to home m3lem ashraf w3rd o5tee 🥶🔧👿");
});

// start port
const start = (port) => {
  app.listen(port, () => {
    console.log("The server is started running at port", port);
  });
};

// use middleware
app.use(notFound);
app.use(errorHandler);



// exporting

module.exports = {
  app: app,
  start: start,
};