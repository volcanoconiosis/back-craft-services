"use strict";
require("dotenv").config();
const express = require("express");
const Router = express.Router();
const { clientCollection, clientModel, adminModel, adminCollection } = require("../models/index");
const bearerAuth = require("../middlewear/bearerAuth");
const permissions = require("../middlewear/acl");


// ====================== main Routes ================================

Router.put("/client/updateany/:id", bearerAuth, clientUpdate);
Router.post("/client", bearerAuth, createData);
Router.get('/clientData',bearerAuth,permissions('readUser'), getData)

// ===================== for arrays Routes ==========================
Router.post("/client/favWorker/:id", bearerAuth, addFavoriteWorker);
Router.delete("/client/favWorker/:id", bearerAuth, deleteFavoriteWorker);

Router.post("/client/favoriteImg/:id", bearerAuth, addFavoriteImg);
Router.delete("/client/favoriteImg/:id", bearerAuth, deleteFavoriteImg);

Router.post("/client/recently/:id", bearerAuth, addRecently);
Router.delete("/client/recently/:id", bearerAuth, deleteRecently);

Router.post("/client/notification/:id", bearerAuth, addNotification);
Router.delete("/client/notification/:id", bearerAuth, deleteNotification);

Router.post("/client/chat/:id", bearerAuth, addChat);
Router.delete("/client/chat/:id", bearerAuth, deleteChat);

Router.post("/client/post/:id", bearerAuth, addPost);
Router.delete("/client/post/:id", bearerAuth, deletePost);

Router.post("/support",addSupport)


//  =========== start main function ===============

async function getData(req,res){
    let id=req.userId
    let client=await clientCollection.read(id)
    res.status(200).send(client)
}

// ========= for create Data for client 
async function createData(req, res) {
    let newData = req.body;
    newData.userId = req.userId;
    console.log(newData);
    let client = await clientCollection.create(newData);
    res.status(200).json(client);
  }
//========== update for client data
  async function clientUpdate(req, res) {
    let update = req.body;
    update.userId = req.userId;
    let id = req.params.id;
    let client = await clientCollection.update(id, update);
    res.status(200).json(client);
  }

//  =========== end main function ===============
// ==================================================================
//=========== start  for array favWorker 

async function addFavoriteWorker(req, res) {
    let newFav = req.body;
    let id = req.params.id;
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.favoriteWorker;
    let newArray = [...item, newFav];
    let client = await clientCollection.update(id, { favoriteWorker: newArray });
  
    res.send(client);
  }
 

  async function deleteFavoriteWorker(req, res) {
    let id = req.params.id;
    let arrayIndex = Number(req.query.index);
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.favoriteWorker;
    item.splice(arrayIndex, 1);
    let client = await clientCollection.update(id, { favoriteWorker: item });
    res.send(client);
  }


//=========== end  for array  favWorker
//==============================================================
//=========== start  for array favoriteImg 

async function addFavoriteImg(req, res) {
    let newFav = req.body;
    let id = req.params.id;
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.favoriteImg;
    let newArray = [...item, newFav];
    let client = await clientCollection.update(id, { favoriteImg: newArray });
  
    res.send(client);
  }
 

  async function deleteFavoriteImg(req, res) {
    let id = req.params.id;
    let arrayIndex = Number(req.query.index);
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.favoriteImg;
    item.splice(arrayIndex, 1);
    let client = await clientCollection.update(id, { favoriteImg: item });
    res.send(client);
  }


//=========== end  for array favoriteImg 
// ==============================================================
//=========== start  for array Recently 

async function addRecently(req, res) {
    let newFav = req.body;
    let id = req.params.id;
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.recently;
    let newArray = [...item, newFav];
    let client = await clientCollection.update(id, { recently: newArray });
  
    res.send(client);
  }
 

  async function deleteRecently(req, res) {
    let id = req.params.id;
    let arrayIndex = Number(req.query.index);
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.recently;
    item.splice(arrayIndex, 1);
    let client = await clientCollection.update(id, { recently: item });
    res.send(client);
  }


//=========== end  for array Recently 
// ==============================================================
//=========== start  for array Notification 

async function addNotification(req, res) {
    let newFav = req.body;
    let id = req.params.id;
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.notification;
    let newArray = [...item, newFav];
    let client = await clientCollection.update(id, { notification: newArray });
  
    res.send(client);
  }
 

  async function deleteNotification(req, res) {
    let id = req.params.id;
    let arrayIndex = Number(req.query.index);
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.notification;
    item.splice(arrayIndex, 1);
    let client = await clientCollection.update(id, { notification: item });
    res.send(client);
  }
  

//=========== end  for array Notification 
// ==============================================================
//=========== start  for array Chat 

async function addChat(req, res) {
    let newFav = req.body;
    let id = req.params.id;
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.chat;
    let newArray = [...item, newFav];
    let client = await clientCollection.update(id, { chat: newArray });
  
    res.send(client);
  }
 

  async function deleteChat(req, res) {
    let id = req.params.id;
    let arrayIndex = Number(req.query.index);
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.chat;
    item.splice(arrayIndex, 1);
    let client = await clientCollection.update(id, { chat: item });
    res.send(client);
  }


//=========== end  for array Chat 
// ==============================================================
//=========== start  for array Post 

async function addPost(req, res) {
    let newFav = req.body;
    let id = req.params.id;
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.post;
    let newArray = [...item, newFav];
    let client = await clientCollection.update(id, { post: newArray });
  
    res.send(client);
  }
 

  async function deletePost(req, res) {
    let id = req.params.id;
    let arrayIndex = Number(req.query.index);
    let data = await clientModel.findOne({ where: { id: id } });
    let item = data.dataValues.post;
    item.splice(arrayIndex, 1);
    let client = await clientCollection.update(id, { post: item });
    res.send(client);
  }


//=========== end  for array Post 
//=================================================================
//=========== start for add support

async function addSupport(req, res) {
  let newsupport = req.body;
  // let data = await adminModel.findAll();
  // let item = data[0].dataValues.support;
  // let newArray = [...item, newsupport];
  //{ support: newsupport }
  let client = await adminModel.create(newsupport);
  res.send(client);


}








module.exports=Router
