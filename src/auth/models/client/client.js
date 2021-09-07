"use strict";

const clientModel = (sequelize, DataTypes) => {
  const model = sequelize.define("client", {
    favoriteWorker: { type: DataTypes.ARRAY(DataTypes.JSON) },
    favoriteImg: { type: DataTypes.ARRAY(DataTypes.JSON) },
    recently: { type: DataTypes.ARRAY(DataTypes.JSON) },
    notification: { type: DataTypes.ARRAY(DataTypes.JSON) },
    chat: { type: DataTypes.ARRAY(DataTypes.JSON) },
    post: { type: DataTypes.ARRAY(DataTypes.JSON) },
    userId:{type: DataTypes.INTEGER }
  });
  return model;
};

module.exports = clientModel;
