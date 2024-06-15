const orders = require("../../db/orders.json");

class OrderRepository {
  constructor() {
    this.orders = orders;
  }

  getAll() {
    return this.orders;
  }
  create(order) {
    this.orders.push(order);
  }
}

module.exports = OrderRepository;
