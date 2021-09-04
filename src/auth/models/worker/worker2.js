"use strict";

const workerModel = (sequelize, DataTypes) => {
  const model = sequelize.define("worker", {
    profilePicture: { type: DataTypes.STRING },
    favoriteWorker: { type: DataTypes.ARRAY(DataTypes.JSON) },
    favoriteImg: { type: DataTypes.ARRAY(DataTypes.JSON) },
    recently: { type: DataTypes.ARRAY(DataTypes.JSON) },
    // ===========================
    notification: { type: DataTypes.ARRAY(DataTypes.JSON) },
    status: { type: DataTypes.STRING },
    scheduleWork: { type: DataTypes.ARRAY(DataTypes.JSON) },
    hisWork: { type: DataTypes.ARRAY(DataTypes.JSON) },
    offers: { type: DataTypes.ARRAY(DataTypes.JSON) },
    bio: { type: DataTypes.STRING },
    tools: { type: DataTypes.ARRAY(DataTypes.JSON) },
    reviews: { type: DataTypes.ARRAY(DataTypes.JSON) },
    chat: { type: DataTypes.ARRAY(DataTypes.JSON) },
    post: { type: DataTypes.ARRAY(DataTypes.JSON) },
    userId:{type: DataTypes.INTEGER }
  });
  return model;
};

module.exports = workerModel;
