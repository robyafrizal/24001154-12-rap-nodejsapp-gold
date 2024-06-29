"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Item.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      models.Item.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
      underscored: true,
    }
  );
  return Item;
};
