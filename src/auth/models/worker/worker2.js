"use strict";

const workerModel = (sequelize, DataTypes) => {
  const model = sequelize.define("worker", {
    profilePicture: { type: DataTypes.STRING },
    favoriteWorker: { type: DataTypes.ARRAY(DataTypes.JSON) }, // delete 
    // favoriteImg: { type: DataTypes.ARRAY(DataTypes.JSON) }, // delete
    // recently: { type: DataTypes.ARRAY(DataTypes.JSON) }, 
    // // ===========================
    // notification: { type: DataTypes.ARRAY(DataTypes.JSON) },
    // status: { type: DataTypes.STRING }, 
    // scheduleWork: { type: DataTypes.ARRAY(DataTypes.JSON) }, // delete
    // hisWork: { type: DataTypes.ARRAY(DataTypes.JSON) }, // delete
    // offers: { type: DataTypes.ARRAY(DataTypes.JSON) }, // delete
    // bio: { type: DataTypes.STRING }, 
    // tools: { type: DataTypes.ARRAY(DataTypes.JSON) }, // delete
    // reviews: { type: DataTypes.ARRAY(DataTypes.JSON) },
    // chat: { type: DataTypes.ARRAY(DataTypes.JSON) }, // delete
    // post: { type: DataTypes.ARRAY(DataTypes.JSON) }, // delete 
    userId:{type: DataTypes.INTEGER }
  });
  return model;
};

module.exports = workerModel;
