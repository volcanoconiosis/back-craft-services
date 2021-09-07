"use strict";
require("dotenv").config();
const express = require("express");
const Router = express.Router();
const { workerCollection, workerModel,users } = require("../models/index");
const bearerAuth = require("../middlewear/bearerAuth");
const permissions = require("../middlewear/acl");

// >>>>>>>>>>>>>>>>>>>> worker end-points

Router.get("/worker", bearerAuth,permissions('readWorker'),getData);
Router.get("/getCurrentWorker", bearerAuth, getCurrentData)
Router.get("/workerForClient/:id", bearerAuth,getDataForClient);
Router.post("/worker", bearerAuth, data);
Router.put("/worker/updateany/:id", bearerAuth, workerUpdate);
Router.delete("/worker/fav/:id", bearerAuth, deleteFavoriteWorker);
Router.post("/worker/fav/:id", bearerAuth, postFavoriteWorker);
Router.delete("/worker/favimg/:id", bearerAuth, deleteFavoriteImgWorker);
Router.post("/worker/favimg/:id", bearerAuth, postFavoriteImgWorker);
Router.delete('/worker/recently/:id',bearerAuth,deleteRecently);
Router.post('/worker/recently/:id',bearerAuth,postRecently);
Router.delete('/worker/notification/:id',bearerAuth,deleteNotification);
Router.post('/worker/notification/:id',bearerAuth,postNotification);
Router.delete('/worker/schedulework/:id',bearerAuth,deleteScheduleWork);
Router.post('/worker/schedulework/:id',bearerAuth,postScheduleWork);
Router.delete('/worker/hiswork/:id',bearerAuth,deleteHisWork);
Router.post('/worker/hiswork/:id',bearerAuth,postHisWork);
Router.delete('/worker/offers/:id',bearerAuth,deleteOffers);
Router.post('/worker/offers/:id',bearerAuth,postOffers);
Router.delete('/worker/tools/:id',bearerAuth,deleteTools);
Router.post('/worker/tools/:id',bearerAuth,postTools);
Router.delete('/worker/reviews/:id',bearerAuth,deleteReviews);
Router.post('/worker/reviews/:id',bearerAuth,postReviews);
Router.delete('/worker/chat/:id',bearerAuth,deleteChat);
Router.post('/worker/chat/:id',bearerAuth,postChat);
Router.delete('/worker/post/:id',bearerAuth,deletePost);
Router.post('/worker/post/:id',bearerAuth,postPost);

// >>>>>>>>>>>>>>>>>>>>>>>>  functions

// get all data for worker 
async function getData(req, res){
  let id = req.userId
  let worker = await workerCollection.read(id);
  res.send(worker)
}

// =========== start the data that client will see it 
async function getDataForClient(req, res){
  let id = req.params.id
  let worker = await workerCollection.read(id);
  console.log( worker[0].dataValues);
  let obj ={
    status: worker[0].dataValues.status, 
scheduleWork:worker[0].dataValues.scheduleWork ,
hisWork:worker[0].dataValues.hisWork ,
offers:worker[0].dataValues.offers ,
bio: worker[0].dataValues.bio, 
tools:worker[0].dataValues.tools ,
reviews: worker[0].dataValues.reviews,
  }
  res.send(obj)
}
// =========== end 

// ======== start get worker from user schema========
async function getCurrentData(req,res){
  let id=req.userId
  let user= await users.findOne({where:{id:id}});
  res.status(200).send(user);
}

// ========== end ==========



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
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.favoriteWorker;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { favoriteWorker: item });
  console.log(item);
  res.send(worker);
}
// post one from favorite worker
async function postFavoriteWorker(req, res) {
  let update = req.body;
  let id = req.params.id;
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.favoriteWorker;
  let arres = [...item, update];
  console.log(arres);
  let worker = await workerCollection.update(id, { favoriteWorker: arres });

  res.send(worker);
}
// ----------------------------------------------------------------------------

// post one from favorite image worker
async function postFavoriteImgWorker(req, res) {
  let update = req.body;
  let id = req.params.id;
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.favoriteImg;
  let arres = [...item, update];
  console.log(arres);
  let worker = await workerCollection.update(id, { favoriteImg: arres });

  res.send(worker);
}
// delete one from favorite image worker
async function deleteFavoriteImgWorker(req, res) {
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.favoriteImg;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { favoriteImg: item });
  console.log(item);
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from recently worker
async function postRecently(req, res) {
  let update = req.body;
  let id = req.params.id;
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.recently;
  let arres = [...item, update];
  console.log(arres);
  let worker = await workerCollection.update(id, { recently: arres });

  res.send(worker);
}
// delete one recently worker
async function deleteRecently(req, res) {
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.recently;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { recently: item });
  console.log(item);
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from notification worker
async function postNotification(req, res) {
  let update = req.body;
  let id = req.params.id;
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.notification;
  let arres = [...item, update];
  console.log(arres);
  let worker = await workerCollection.update(id, { notification: arres });

  res.send(worker);
}
// delete one notification worker
async function deleteNotification(req, res) {
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.notification;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { notification: item });
  console.log(item);
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from ScheduleWork worker
async function postScheduleWork(req, res) {
  let update = req.body;
  let id = req.params.id;
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.scheduleWork;
  let arres = [...item, update];
  console.log(arres);
  let worker = await workerCollection.update(id, { scheduleWork: arres });

  res.send(worker);
}
// delete one ScheduleWork worker
async function deleteScheduleWork(req, res) {
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.scheduleWork;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { scheduleWork: item });
  console.log(item);
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from hisWork worker
async function postHisWork(req, res) {
  let update = req.body;
  let id = req.params.id;
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.hisWork;
  let arres = [...item, update];
  console.log(arres);
  let worker = await workerCollection.update(id, { hisWork: arres });

  res.send(worker);
}
// delete one hisWork worker
async function deleteHisWork(req, res) {
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.hisWork;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { hisWork: item });
  console.log(item);
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from offers worker
async function postOffers(req, res) {
  let update = req.body;
  let id = req.params.id;
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.offers;
  let arres = [...item, update];
  console.log(arres);
  let worker = await workerCollection.update(id, { offers: arres });

  res.send(worker);
}
// delete one offers worker
async function deleteOffers(req, res) {
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.offers;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { offers: item });
  console.log(item);
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from tools worker
async function postTools(req, res) {
  let update = req.body;
  let id = req.params.id;
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.tools;
  let arres = [...item, update];
  console.log(arres);
  let worker = await workerCollection.update(id, { tools: arres });

  res.send(worker);
}
// delete one tools worker
async function deleteTools(req, res) {
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.tools;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { tools: item });
  console.log(item);
  res.send(worker);
}
// --------------------------------------------------------------------------

// post one from tools worker
async function postReviews(req, res) {
  let update = req.body;
  let id = req.params.id;
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.reviews;
  let arres = [...item, update];
  console.log(arres);
  let worker = await workerCollection.update(id, { reviews: arres });

  res.send(worker);
}
// delete one tools worker
async function deleteReviews(req, res) {
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.reviews;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { reviews: item });
  console.log(item);
  res.send(worker);
}

// post one from chat worker
async function postChat(req, res) {
  let update = req.body;
  let id = req.params.id;
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.chat;
  let arres = [...item, update];
  console.log(arres);
  let worker = await workerCollection.update(id, { chat: arres });

  res.send(worker);
}
// delete one chat worker
async function deleteChat(req, res) {
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.chat;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { chat: item });
  console.log(item);
  res.send(worker);
}

// --------------------------------------------------------------------------

// post one from post worker
async function postPost(req, res) {
  let update = req.body;
  let id = req.params.id;
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.chat;
  let arres = [...item, update];
  console.log(arres);
  let worker = await workerCollection.update(id, { chat: arres });

  res.send(worker);
}
// delete one post worker
async function deletePost(req, res) {
  let id = req.params.id;
  let arrayIndex = Number(req.query.index);
  let data = await workerModel.findOne({ where: { id: id } });
  console.log(data);
  let item = data.dataValues.post;
  item.splice(arrayIndex, 1);
  let worker = await workerCollection.update(id, { post: item });
  console.log(item);
  res.send(worker);
}




module.exports = Router;
