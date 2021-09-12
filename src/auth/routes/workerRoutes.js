"use strict";
require("dotenv").config();
const express = require("express");
const Router = express.Router();
const { workerCollection, workerModel, users } = require("../models/index");
const bearerAuth = require("../middlewear/bearerAuth");
const permissions = require("../middlewear/acl");

// >>>>>>>>>>>>>>>>>>>> worker end-points

Router.get("/worker", bearerAuth, permissions("readWorker"), getData);
Router.get("/getCurrentWorker", bearerAuth, getCurrentData);
Router.get("/workerForClient/:id", bearerAuth, getDataForClient);
Router.post("/worker", bearerAuth, data);
Router.put("/worker/updateany/:id", bearerAuth, workerUpdate);// RETURN BACK TO THIS FUN  
Router.delete("/worker/fav", bearerAuth, deleteFavoriteWorker);
Router.post("/worker/fav", bearerAuth, postFavoriteWorker);
Router.delete("/worker/favimg", bearerAuth, deleteFavoriteImgWorker);
Router.post("/worker/favimg", bearerAuth, postFavoriteImgWorker);
Router.delete("/worker/recently", bearerAuth, deleteRecently);
Router.post("/worker/recently", bearerAuth, postRecently);
Router.delete("/worker/notification", bearerAuth, deleteNotification);
Router.post("/worker/notification", bearerAuth, postNotification);
Router.delete("/worker/schedulework", bearerAuth, deleteScheduleWork);
Router.post("/worker/schedulework", bearerAuth, postScheduleWork);
Router.delete("/worker/hiswork", bearerAuth, deleteHisWork);
Router.post("/worker/hiswork", bearerAuth, postHisWork);
Router.delete("/worker/offers", bearerAuth, deleteOffers);
Router.post("/worker/offers", bearerAuth, postOffers);
Router.delete("/worker/tools", bearerAuth, deleteTools);
Router.post("/worker/tools", bearerAuth, postTools);
Router.delete("/worker/reviews", bearerAuth, deleteReviews);
Router.post("/worker/reviews", bearerAuth, postReviews);
Router.delete("/worker/chat", bearerAuth, deleteChat);
Router.post("/worker/chat", bearerAuth, postChat);
Router.delete("/worker/post", bearerAuth, deletePost);
Router.post("/worker/post", bearerAuth, postPost);

// >>>>>>>>>>>>>>>>>>>>>>>>  functions

// get all data for worker
async function getData(req, res) {
  let id = req.userId;
  let worker = await workerCollection.read(id);
  res.send(worker);
}

// =========== start the data that client will see it
async function getDataForClient(req, res) {
  let id = req.params.id;
  let worker = await workerCollection.read(id);
  let obj = {
    status: worker[0].dataValues.status,
    scheduleWork: worker[0].dataValues.scheduleWork,
    hisWork: worker[0].dataValues.hisWork,
    offers: worker[0].dataValues.offers,
    bio: worker[0].dataValues.bio,
    tools: worker[0].dataValues.tools,
    reviews: worker[0].dataValues.reviews,
  };
  res.send(obj);
}
// =========== end

// ======== start get worker from user schema========
async function getCurrentData(req, res) {
  let id = req.userId;
  let user = await users.findOne({ where: { id: id } });
  res.status(200).send(user);
}

// ========== end ==========

// post data for worker
async function data(req, res) {
  let update = req.body;
  update.userId = req.userId;
  let worker = await workerCollection.create(update);
  res.status(200).json(worker);
}

// update any
async function workerUpdate(req, res) {
  let update = req.body;
  update.userId = req.userId;
  let id = req.params.id;
  let worker = await workerCollection.update(id, update);
  res.status(200).json(worker);
}
// delete one from favorite worker
async function deleteFavoriteWorker(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.favoriteWorker;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { favoriteWorker: item });
  res.send(worker);
}
// post one from favorite worker
async function postFavoriteWorker(req, res) {
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let id=data.dataValues.id
  let item = data.dataValues.favoriteWorker;
  let arres = [...item, update];
  let worker = await workerCollection.update(id, { favoriteWorker: arres });
  res.send(worker);
}
// ----------------------------------------------------------------------------

// post one from favorite image worker
async function postFavoriteImgWorker(req, res) {
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let id=data.dataValues.id
  let item = data.dataValues.favoriteImg;
  let arres = [...item, update];
  let worker = await workerCollection.update(id, { favoriteImg: arres });
  res.send(worker);
}
// delete one from favorite image worker
async function deleteFavoriteImgWorker(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.favoriteImg;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { favoriteImg: item });
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from recently worker
async function postRecently(req, res) {
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let id=data.dataValues.id
  let item = data.dataValues.recently;
  let arres = [...item, update];
  let worker = await workerCollection.update(id, { recently: arres });
  res.send(worker);
}
// delete one recently worker
async function deleteRecently(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.recently;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { recently: item });
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from notification worker
async function postNotification(req, res) {
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let id=data.dataValues.id
  let item = data.dataValues.notification;
  let arres = [...item, update];
  let worker = await workerCollection.update(id, { notification: arres });
  res.send(worker);
}
// delete one notification worker
async function deleteNotification(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.notification;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { notification: item });
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from ScheduleWork worker
async function postScheduleWork(req, res) {
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let id=data.dataValues.id
  let item = data.dataValues.scheduleWork;
  let arres = [...item, update];
  let worker = await workerCollection.update(id, { scheduleWork: arres });
  res.send(worker);
}
// delete one ScheduleWork worker
async function deleteScheduleWork(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.scheduleWork;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { scheduleWork: item });
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from hisWork worker
async function postHisWork(req, res) {
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let id=data.dataValues.id
  let item = data.dataValues.hisWork;
  let arres = [...item, update];
  let worker = await workerCollection.update(id, { hisWork: arres });
  res.send(worker);
}
// delete one hisWork worker
async function deleteHisWork(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.hisWork;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { hisWork: item });
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from offers worker
async function postOffers(req, res) {
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let id=data.dataValues.id
  let item = data.dataValues.offers;
  let arres = [...item, update];
  let worker = await workerCollection.update(id, { offers: arres });
  res.send(worker);
}
// delete one offers worker
async function deleteOffers(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.offers;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { offers: item });
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from tools worker
async function postTools(req, res) {
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let id=data.dataValues.id
  let item = data.dataValues.tools;
  let arres = [...item, update];
  let worker = await workerCollection.update(id, { tools: arres });
  res.send(worker);
}
// delete one tools worker
async function deleteTools(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.tools;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { tools: item });
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from tools worker
async function postReviews(req, res) {
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let id=data.dataValues.id
  let item = data.dataValues.reviews;
  let arres = [...item, update];
  let worker = await workerCollection.update(id, { reviews: arres });
  res.send(worker);
}
// delete one tools worker
async function deleteReviews(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.reviews;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { reviews: item });
  res.send(worker);
}

// post one from chat worker
async function postChat(req, res) {
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let id=data.dataValues.id
  let item = data.dataValues.chat;
  let arres = [...item, update];
  let worker = await workerCollection.update(id, { chat: arres });
  res.send(worker);
}
// delete one chat worker
async function deleteChat(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.chat;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { chat: item });
  res.send(worker);
}

// --------------------------------------------------------------------------

// post one from post worker
async function postPost(req, res) {
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let id=data.dataValues.id
  let item = data.dataValues.post;
  let arres = [...item, update];
  let worker = await workerCollection.update(id, { post: arres });
  res.send(worker);
}
// delete one post worker
async function deletePost(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.post;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { post: item });
  res.send(worker);
}

module.exports = Router;
