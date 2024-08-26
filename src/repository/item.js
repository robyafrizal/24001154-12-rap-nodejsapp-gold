const { Item, User, Order } = require("../../models");

class ItemRepository {
  constructor() {}

  async findAll() {
    const itemList = await Item.findAll({
      attributes: ["id", "name", "price"],
      include: [
        {
          model: User,
          require: true,
          as: "user",
          attributes: ["name", "email"],
        },
        {
          model: Order,
          require: true,
          as: "order",
          attributes: ["name", "status"],
        },
      ],
    });

    return itemList;
  }

  async findId(id) {
    const idItem = await Item.findOne({ where: { id: id } });
    return idItem;
  }

  async insert(item) {
    const createdItem = await Item.create({
      name: item.name,
      price: item.price,
      user_id: item.user_id,
      order_id: item.order_id,
    });
    return createdItem;
  }

  async deleteByName(name) {
    await Item.destroy({
      where: {
        name: name,
      },
    });
  }

  async update(item) {
    const updateItem = await Item.update(
      {
        name: item.name,
        price: item.price,
        user_id: item.user_id,
        order_id: item.order_id,
      },
      { where: { id: item.id } }
    );
    return updateItem;
  }

  async delete(id) {
    const deleteItem = await Item.destroy({
      where: { id: id },
    });
    return deleteItem;
  }
}

module.exports = ItemRepository;
