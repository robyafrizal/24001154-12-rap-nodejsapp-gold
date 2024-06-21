const orders = require("../../db/orders.json");

class OrderRepository {
  constructor() {
    this.orders = orders;
  }

  getAll() {
    return this.orders;
  }
  getById(id) {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].id === parseInt(id)) {
        return this.orders[i];
      }
    }
    return "Data not found";
  }
  create(order) {
    return this.orders.push(order);
  }
}

module.exports = OrderRepository;
