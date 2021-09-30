"use strict";

const express = require("express");
const authRouter = express.Router();
const { users } = require("../models/index");
const basicAuth = require("../middlewear/basicAuth");
const bearerAuth = require("../middlewear/bearerAuth");
const {workerCollection,clientCollection}=require("../models/index")

authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    console.log(userRecord);
    if(userRecord.role==='worker'){
      let update = req.body;
      update.userId =userRecord.id;
      await workerCollection.create(update);
    }else if(userRecord.role==='user'){
      let update = req.body;
      update.userId =userRecord.id;
      await clientCollection.create(update);
    }
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.put("/updateaccount", bearerAuth, async (req, res) => {
  const id = req.userId;
  let userRecord = await users.findOne({ where: { id: id } });
  const output = req.body;
  output.token = userRecord.token;
  const update = await userRecord.update(output);
  res.send(update);
});

authRouter.delete("/deleteaccount", bearerAuth, async (req, res) => {
  const id = req.userId;
  
  await users.destroy({ where: { id: id } });
  res.send("your account deleted sucessfully");
});

//  ====== get workers to display them in the home page or sevice page
authRouter.get("/getAllWorkers", async (req, res) => {
  let user = await users.findAll();
  let newArr = user.filter((value) => {
    if (value.dataValues.role == "worker") return value;
  });
  res.status(200).send(newArr);
});

module.exports = authRouter;

