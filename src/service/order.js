class OrderService {
  constructor(OrderRepository) {
    this.OrderRepository = OrderRepository;
  }

  async getAll() {
    try {
      const orderList = await this.OrderRepository.findAll();

      return {
        statusCode: 200,
        orders: orderList,
      };
    } catch (err) {
      return {
        statusCode: 500,
        orders: null,
      };
    }
  }

  async getId(id) {
    const orderId = await this.OrderRepository.findId(id);
    if (!orderId) {
      return { message: "Order not found", statusCode: 404 };
    } else {
      return {
        orderId: orderId,
        message: "Get order by id success",
        statusCode: 200,
      };
    }
  }

  async create({ name, status }) {
    try {
      const createdOrder = await this.OrderRepository.insert({
        name,
        status,
      });
      if (name === undefined || status === undefined) {
        return {
          message: "Payload can not empty",
          statusCode: 400,
          createdOrder: null,
        };
      }
      return {
        createdOrder: createdOrder,
        statusCode: 201,
        message: "Create Order Success",
      };
    } catch (err) {
      return { createdOrder: null, statusCode: 500 };
    }
  }

  async update({ id, name, status }) {
    const updatedOrder = await this.OrderRepository.update({
      id,
      name,
      status,
    });
    const orderId = await this.OrderRepository.findId(id);
    if (orderId != null) {
      return {
        updatedOrder: { name, status },
        message: "Update Order Success",
        statusCode: 200,
      };
    } else {
      return {
        updatedOrder: null,
        message: "Order not found",
        statusCode: 404,
      };
    }
  }

  async delete(id) {
    const deletedOrder = await this.OrderRepository.delete(id);
    if (deletedOrder == false) {
      return { message: "Order not found", statusCode: 404 };
    } else {
      return {
        deletedOrder: deletedOrder,
        message: "Delete order success",
        statusCode: 204,
      };
    }
  }
}
module.exports = OrderService;
