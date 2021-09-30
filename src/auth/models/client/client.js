"use strict";

const clientModel = (sequelize, DataTypes) => {
  const model = sequelize.define("client", {
    favoriteWorker: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
    favoriteImg: { type: DataTypes.ARRAY(DataTypes.JSON),defaultValue: [] },
    recently: { type: DataTypes.ARRAY(DataTypes.JSON),defaultValue: [] },
    notification: { type: DataTypes.ARRAY(DataTypes.JSON),defaultValue: [] },
    chat: { type: DataTypes.ARRAY(DataTypes.JSON),defaultValue: [] },
    post: { type: DataTypes.ARRAY(DataTypes.JSON),defaultValue: [] },
    userId: { type: DataTypes.INTEGER },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: " ",
    },
  });
  return model;
};

module.exports = clientModel;
