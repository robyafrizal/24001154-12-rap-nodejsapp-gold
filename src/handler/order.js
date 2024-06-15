class OrderHandler {
  constructor(OrderService) {
    this.OrderService = OrderService;

    //Jika tidak ada : TypeError: Cannot read properties of undefined
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  getAll(req, res) {
    const orders = this.OrderService.getAll();
    // res.status(200).send("Order Handle created");
    res.status(200).send(orders);
  }
  create(req, res) {
    const order = req.body;
    const orders = this.OrderService.create(order);
    res.status(200).send(orders);
  }
}

module.exports = OrderHandler;
