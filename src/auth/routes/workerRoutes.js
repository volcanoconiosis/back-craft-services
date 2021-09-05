"use strict";
const express = require("express");
const Router = express.Router();
const { workerCollection, workerModel, users } = require("../models/index2");
const basicAuth = require("../middlewear/basicAuth");
const bearerAuth = require("../middlewear/bearerAuth");
const permissions = require("../middlewear/acl");

// >>>>>>>>>>>>>>>>>>>> worker end-points

Router.get("/worker", (req, res) => {
  res.send("hello from worker");
});
Router.post("/worker", bearerAuth, data);
Router.put("/worker/updateany/:id", bearerAuth, workerUpdate);
Router.delete("/worker/fav/:id", bearerAuth, deleteFavoriteWorker);
Router.post("/worker/fav/:id", bearerAuth, postFavoriteWorker);
Router.delete("/worker/favimg/:id", bearerAuth, deleteFavoriteImgWorker);

// >>>>>>>>>>>>>>>>>>>>>>>>  functions

// post data for worker
async function data(req, res) {
  let update = req.body;
  update.userId = req.userId;
  console.log(update);
  console.log(workerCollection);
  let worker = await workerCollection.create(update);
  res.status(200).json(worker);
}
// update any
async function workerUpdate(req, res) {
  let update = req.body;
  update.userId = req.userId;
  let id = req.params.id;
  console.log(update);
  console.log(workerCollection);
  let worker = await workerCollection.update(id, update);
  res.status(200).json(worker);
}
// delete one from favorite worker
async function deleteFavoriteWorker(req, res) {
  let id = req.userId;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findAll({ where: { id: id } });
  let item = data[0].dataValues.favoriteWorker;
  item.splice(arrayIndex, 1);
  //   console.log(data[0].dataValues.favoriteWorker);
  res.send(data);
}
// post one from favorite worker
async function postFavoriteWorker(req, res) {
  let id = Number(req.params.id);
  let obj = req.body;
  let data = await workerModel.findAll({ where: { id: id } });
  data[0].dataValues.favoriteWorker.push(obj);
  console.log();
//   data.save();

  res.send(data);
}
// delete one from favorite image worker
async function deleteFavoriteImgWorker(req, res) {
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findAll({ where: { id: id } });
  let item = data[0].dataValues.favoriteImg;
  item.splice(arrayIndex, 1);
  console.log(item);
  res.send(data);
}

module.exports = Router;
