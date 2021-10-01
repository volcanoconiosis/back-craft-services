"use strict";
require("dotenv").config();
const express = require("express");
const Router = express.Router();
const {
  clientCollection,
  clientModel,
  adminModel,
  users,
} = require("../models/index");
const bearerAuth = require("../middlewear/bearerAuth");
const permissions = require("../middlewear/acl");

// ====================== main Routes ================================
Router.get("/getCurrentUser", bearerAuth, getCurrentData);
Router.put("/client/updateany", bearerAuth, clientUpdate);
Router.post("/client", bearerAuth, createData);
Router.get("/clientData", bearerAuth, permissions("readUser"), getData);

// ===================== for arrays Routes ==========================
Router.post("/client/favWorker", bearerAuth, addFavoriteWorker);
Router.delete("/client/favWorker", bearerAuth, deleteFavoriteWorker);

Router.post("/client/favoriteImg", bearerAuth, addFavoriteImg);
Router.delete("/client/favoriteImg", bearerAuth, deleteFavoriteImg);

Router.post("/client/recently", bearerAuth, addRecently);
Router.delete("/client/recently", bearerAuth, deleteRecently);

Router.post("/client/notification", bearerAuth, addNotification);
Router.delete("/client/notification", bearerAuth, deleteNotification);

Router.post("/client/chat", bearerAuth, addChat);
Router.delete("/client/chat", bearerAuth, deleteChat);

Router.post("/client/post", bearerAuth, addPost);
Router.put("/client/post", bearerAuth, updatePost);
Router.delete("/client/post", bearerAuth, deletePost);



//  =========== start main function ===============

async function getCurrentData(req, res) {
  let id = req.userId;
  let user = await users.findOne({ where: { id: id } });
  res.status(200).send(user);
}

async function getData(req, res) {
  let id = req.userId;
  let client = await clientCollection.read(id);
  res.status(200).send(client);
}

// ========= for create Data for client
async function createData(req, res) {
  let newData = req.body;
  newData.userId = req.userId;
  let client = await clientCollection.create(newData);
  res.status(200).json(client);
}
//========== update for client data
async function clientUpdate(req, res) {
  let update = req.body;
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let id = data.dataValues.id;
  let worker = await clientCollection.update(id, update);
  res.send(worker);
}

//  =========== end main function ===============
// ==================================================================
//=========== start  for array favWorker

async function addFavoriteWorker(req, res) {
  let update = req.body;
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let id = data.dataValues.id;
  let item = data.dataValues.favoriteWorker;
  let newArray = [...item, update];
  let worker = await clientCollection.update(id, { favoriteWorker: newArray });
  res.send(worker);
}

async function deleteFavoriteWorker(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.favoriteWorker;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await clientCollection.update(id, { favoriteWorker: item });
  res.send(worker);
}

//=========== end  for array  favWorker
//==============================================================
//=========== start  for array favoriteImg

async function addFavoriteImg(req, res) {
  let update = req.body;
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let id = data.dataValues.id;
  let item = data.dataValues.favoriteImg;
  let newArray = [...item, update];
  let worker = await clientCollection.update(id, { favoriteImg: newArray });
  res.send(worker);
}

async function deleteFavoriteImg(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.favoriteImg;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await clientCollection.update(id, { favoriteImg: item });
  res.send(worker);
}

//=========== end  for array favoriteImg
// ==============================================================
//=========== start  for array Recently

async function addRecently(req, res) {
  let update = req.body;
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let id = data.dataValues.id;
  let item = data.dataValues.recently;
  let newArray = [...item, update];
  let worker = await clientCollection.update(id, { recently: newArray });
  res.send(worker);
}

async function deleteRecently(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.recently;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await clientCollection.update(id, { recently: item });
  res.send(worker);
}

//=========== end  for array Recently
// ==============================================================
//=========== start  for array Notification

async function addNotification(req, res) {
  let update = req.body;
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let id = data.dataValues.id;
  let item = data.dataValues.notification;
  let newArray = [...item, update];
  let worker = await clientCollection.update(id, { notification: newArray });
  res.send(worker);
}

async function deleteNotification(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.notification;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await clientCollection.update(id, { notification: item });
  res.send(worker);
}

//=========== end  for array Notification
// ==============================================================
//=========== start  for array Chat

async function addChat(req, res) {
  let update = req.body;
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let id = data.dataValues.id;
  let item = data.dataValues.chat;
  let newArray = [...item, update];
  let worker = await clientCollection.update(id, { chat: newArray });
  res.send(worker);
}

async function deleteChat(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.chat;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await clientCollection.update(id, { chat: item });
  res.send(worker);
}

//=========== end  for array Chat
// ==============================================================
//=========== start  for array Post

async function addPost(req, res) {
  let update = req.body;
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let id = data.dataValues.id;
  let item = data.dataValues.post;
  let newArray = [...item, update];
  let worker = await clientCollection.update(id, { post: newArray });
  res.send(worker);
}
// update one from post worker
async function updatePost(req, res) {
  let arrayIndex = Number(req.query.index);
  let update = req.body;
  let data = await workerModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.post;
  let id = data.dataValues.id;
  if (item.length - 1 >= arrayIndex) {
    item[arrayIndex] = update;
    let worker = await workerCollection.update(id, { post: item });
    res.send(worker);
  }
}

async function deletePost(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await clientModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.post;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let worker = await clientCollection.update(id, { post: item });
  res.send(worker);
}

//=========== end  for array Post
//=================================================================
//=========== start for add support



module.exports = Router;
