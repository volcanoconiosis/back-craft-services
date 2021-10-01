"use strict";
require("dotenv").config();
const express = require("express");
const Router = express.Router();
const {
  users,
  workerCollection,
  clientCollection,
  adminCollection,
  adminModel,
} = require("../models/index");
const bearerAuth = require("../middlewear/bearerAuth");
const permissions = require("../middlewear/acl");

Router.post("/support", addSupport);
Router.get("/clients", bearerAuth, permissions("readAll"), getClient);
Router.get("/getWorkersData", getWorkers);
Router.get("/getWorkersData/:id", getWorkersById);
Router.get("/adminData", bearerAuth, permissions("readAll"), adminData);
Router.get("/adminPersonal", bearerAuth, adminPersonal);
Router.delete(
  "/deleteuser/:id",
  bearerAuth,
  permissions("delete"),
  deleteUsers
);
Router.get("/users", bearerAuth, permissions("readAll"), getAllUsers);
Router.get("/support", bearerAuth, permissions("readAll"), getSupport);

async function getClient(req, res) {
  let clients = await clientCollection.read();

  res.status(200).send(clients);
}

async function getWorkers(req, res) {
  let workers = await workerCollection.read();
  res.status(200).send(workers);
}
async function getWorkersById(req, res) {
  let worker = await workerCollection.read(req.params.id);
  res.status(200).send(worker);
}

async function deleteUsers(req, res) {
  const id = req.params.id;
  await users.destroy({ where: { id: id } });
  const userRecords = await users.findAll({});
  const list = await userRecords.map((user) => user);
  res.send(list);
}

async function getAllUsers(req, res) {
  const userRecords = await users.findAll({});
  const list = userRecords.map((user) => user);
  res.status(200).json(list);
}

async function getSupport(req, res) {
  const userRecords = await adminCollection.read();
  const list = userRecords.map((user) => user);
  res.status(200).json(list);
}

async function addSupport(req, res) {
  let update = req.body;
  let data = await adminModel.findAll();
  console.log(data);
  data.map(async (el) => {
    console.log("eleleleelelel>>>>", el);
    let id = el.dataValues.id;
    let item = el.dataValues.support;
    let newArray = [...item, update];
    let admin = await adminCollection.update(id, { support: newArray });
    res.send(admin);
  });
}

async function adminData(req, res) {
  let data = await adminModel.findOne({ where: { userId: req.userId } });
  res.send(data);
}

async function adminPersonal(req, res) {
  let id = req.userId;
  let admin = await users.findOne({ where: { id: id } });
  res.status(200).send(admin);
}
module.exports = Router;
