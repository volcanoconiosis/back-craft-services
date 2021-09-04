// "use strict";
// require("dotenv").config();
// const { Sequelize, DataTypes } = require("sequelize");
// const DATABASE_URL = process.env.DATABASE_URL;
// const client = require("./client/users");
// const worker = require("./worker/worker");
// const admin = require("./admin/admin");
// const Collection = require("./dataCollection");

// let sequelizeOptions = {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// };

// const sequelize = new Sequelize(DATABASE_URL, {});

// const clientModel = client(sequelize, DataTypes);
// const workerModel = worker(sequelize, DataTypes);
// const adminModel = admin(sequelize, DataTypes);

// // adminModel.hasMany(clientModel, { foreignKey: "userId", sourceKey: "id" });
// // clientModel.belongsTo(adminModel, { foreignKey: "userId", targetKey: "id" });

// // adminModel.hasMany(workerModel, { foreignKey: "userId", sourceKey: "id" });
// // workerModel.belongsTo(adminModel, { foreignKey: "userId", targetKey: "id" });

// const clientCollection=new Collection(clientModel);
// const workerCollection=new Collection(workerModel);

// module.exports={
//     db:sequelize,
//     users:clientModel,
//     workers:workerModel,
//     admins:adminModel,
//     clientCollection:clientCollection,
//     workerCollection:workerCollection
// }