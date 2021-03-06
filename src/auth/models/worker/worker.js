"use strict";

const workerModel = (sequelize, DataTypes) => {
  const model = sequelize.define("worker", {
    favoriteWorker: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] }, // delete
    favoriteImg: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] }, // delete
    recently: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
    // ===========================
    notification: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
    status: { type: DataTypes.STRING, defaultValue: "available" },
    scheduleWork: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] }, // delete
    hisWork: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] }, // delete
    offers: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] }, // delete
    bio: { type: DataTypes.STRING, defaultValue: " " },
    tools: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] }, // delete
    reviews: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
    chat: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] }, // delete
    post: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] }, // delete
    userId: { type: DataTypes.INTEGER },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue:
        "https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg",
    },
  });
  return model;
};

module.exports = workerModel;
