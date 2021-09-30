"use strict";
require("dotenv").config();
const express = require("express");
const Router = express.Router();
const { adminCollection,clientCollection,workerCollection } = require("../models/index");
const bearerAuth = require("../middlewear/bearerAuth");
const multer = require("multer");
const storge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storge,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

Router.post(
  "/profilepicture",
  bearerAuth,
  upload.single("userImg"),
  async (req, res) => {
    let path = req.file.path;
    let id = req.userId;
    let role=req.role;
    let user;
    if(role==="user"){
      user = await clientCollection.update(id, { profilePicture: path });
    }else if(role==="worker"){
      user = await workerCollection.update(id, { profilePicture: path });
    }else if(role==="admin"){
      user = await adminCollection.update(id, { profilePicture: path });
    }
    res.json(user);
  }
);

module.exports = Router;

