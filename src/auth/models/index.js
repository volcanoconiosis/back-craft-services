"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const DATABASE_URL = process.env.DATABASE_URL;
const client = require("./client/client");
const worker = require("./worker/worker");
const admin=require('./admin/admin')
const user = require("./users");
const Collection = require("./dataCollection");


let sequelizeOptions = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const sequelize = new Sequelize(DATABASE_URL, {sequelizeOptions});

const userModel = user(sequelize, DataTypes);
const clientModel = client(sequelize, DataTypes);
const workerModel = worker(sequelize, DataTypes);
const adminModel = admin(sequelize, DataTypes);

userModel.hasMany(clientModel, { foreignKey: "userId", sourceKey: "id" });
clientModel.belongsTo(userModel, { foreignKey: "userId", targetKey: "id" });

userModel.hasMany(workerModel, { foreignKey: "userId", sourceKey: "id" });
workerModel.belongsTo(userModel, { foreignKey: "userId", targetKey: "id" });

userModel.hasMany(adminModel, { foreignKey: "userId", sourceKey: "id" });
adminModel.belongsTo(userModel, { foreignKey: "userId", targetKey: "id" });

const clientCollection = new Collection(clientModel);
const workerCollection = new Collection(workerModel);
const adminCollection = new Collection(adminModel);
const usersCollection = new Collection(userModel);

module.exports = {
  db: sequelize,
  users: userModel,
  workerModel:workerModel,
  clientCollection: clientCollection,
  workerCollection: workerCollection,
  clientModel:clientModel,
  adminModel:adminModel,
  adminCollection:adminCollection,
  usersCollection:usersCollection,
  userModel:userModel
};
