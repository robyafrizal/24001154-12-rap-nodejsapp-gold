class OrderHandler {
  constructor(OrderService) {
    this.OrderService = OrderService;

    this.getAll = this.getAll.bind(this);
    this.getId = this.getId.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    const serviceRes = await this.OrderService.getAll();

    res.status(serviceRes.statusCode).send({
      orders: serviceRes.orders,
    });
  }

  async getId(req, res) {
    try {
      const id = req.params.id;
      const orderId = await this.OrderService.getId(id);
      res
        .status(orderId.statusCode)
        .send({ items: orderId.orderId, message: orderId.message });
    } catch (err) {
      res.status(orderId.statusCode).send({ message: err.message });
    }
  }

  async create(req, res) {
    const payload = req.body;
    const serviceRes = await this.OrderService.create(payload);

    res.status(serviceRes.statusCode).send({
      created_order: serviceRes.createdOrder,
      message: serviceRes.message,
    });
  }

  async update(req, res) {
    try {
      const { name, status } = req.body;
      const { id } = req.params;
      const updatedOrder = await this.OrderService.update({
        name,
        status,
        id,
      });

      res.status(updatedOrder.statusCode).send({
        items: updatedOrder.updatedOrder,
        message: updatedOrder.message,
      });
    } catch (err) {
      console.log(err);
      res.status(updatedOrder.statusCode).send({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedOrder = await this.OrderService.delete(id);
      res
        .status(deletedOrder.statusCode)
        .send({ message: deletedOrder.message });
    } catch (err) {
      res.status(deletedOrder.statusCode).send({ message: err.message });
    }
  }
}

module.exports = OrderHandler;
