"use strict";
require("dotenv").config();
const express = require("express");
const Router = express.Router();
const {
  users,
  workerCollection,
  clientCollection,
  adminCollection,
} = require("../models/index");
const bearerAuth = require("../middlewear/bearerAuth");
const permissions = require("../middlewear/acl");

Router.post("/support", addSupport);
Router.get("/clients", bearerAuth, permissions("readAll"), getClient);
Router.get("/getWorkers", bearerAuth, permissions("readAll"), getWorkers);
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
  let newsupport = req.body;
  let data = await adminModel.findOne({ where: { userId: 2 } });
  let id = data.dataValues.id;
  let item = data.dataValues.post;
  let newArray = [...item, newsupport];
  let client = await adminCollection.update(id, { post: newArray });
  res.send(client);
}
module.exports = Router;

