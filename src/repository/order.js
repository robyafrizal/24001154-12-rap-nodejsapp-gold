const { Order } = require("../../models");

class OrderRepository {
  constructor() {}

  async findAll() {
    const orderList = await Order.findAll();

    return orderList;
  }

  async findId(id) {
    const idOrder = await Order.findOne({ where: { id: id } });
    return idOrder;
  }

  async insert(order) {
    const createdOrder = await Order.create({
      name: order.name,
      status: order.status,
    });
    return createdOrder;
  }

  async update(order) {
    const updatedOrder = await Order.update(
      { name: order.name, status: order.status },
      { where: { id: order.id } }
    );
    return updatedOrder;
  }

  async delete(id) {
    const deletedOrder = await Order.destroy({
      where: { id: id },
    });
    return deletedOrder;
  }
}

module.exports = OrderRepository;
