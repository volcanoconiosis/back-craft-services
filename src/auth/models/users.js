"use strict";
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET || "avengers";

const clientModel = (sequelize, DataTypes) => {
  const model = sequelize.define("users", {
    username: { type: DataTypes.STRING, required: true, unique: true },
    firstName: { type: DataTypes.STRING, required: true },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: " ",
    },
    lastName: { type: DataTypes.STRING, required: true },
    password: { type: DataTypes.STRING, required: true },
    email: { type: DataTypes.STRING, required: true, unique: true },
    phone: { type: DataTypes.STRING, required: true },
    location: { type: DataTypes.STRING, required: true },
    // ============ extra worker
    store: { type: DataTypes.STRING, defaultValue: " " },
    workType: { type: DataTypes.STRING, defaultValue: " " },
    // ==========================

    role: {
      type: DataTypes.ENUM("user", "admin", "worker"),
      required: true,
      defaultValue: "user",
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ["read", "readUser"],
          worker: ["read", "readWorker"],
          admin: ["read", "create", "update", "delete", "readAll"],
        };
        return acl[this.role];
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  model.beforeUpdate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error("Invalid User");
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = clientModel;
