"use strict";
require("dotenv").config();
const express = require("express");
const Router = express.Router();
const { users,
    workerCollection,
    clientCollection } = require("../models/index");
const bearerAuth = require("../middlewear/bearerAuth");
const permissions = require("../middlewear/acl");


Router.get('/clients',bearerAuth,permissions('readAll'),getClient) // for admin 


async function getClient(req,res){
    let clients=await clientCollection.read()
    console.log(clients);
    // let obj ={
    //     username: clients[0].dataValues.username,
    //     firstName: clients[0].dataValues.firstName,
    //     lastName: clients[0].dataValues.lastName,
    //     password: clients[0].dataValues.password,
    //     email: clients[0].dataValues.email,
    //     phone: clients[0].dataValues.phone,
    //     location: clients[0].dataValues.location
    // }
    res.status(200).send(clients)
}
module.exports=Router