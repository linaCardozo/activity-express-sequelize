const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Message extends Model {}

Message.init(
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ts: {
      primaryKey: true,
      type: "TIMESTAMP",
      // type: "TIMESTAMP",
      // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      //defaultValue: Date.now(),
    },
  },
  {
    sequelize,
    modelName: "Message",
    timestamps: false,
  }
);

Message.sync();

module.exports = Message;
