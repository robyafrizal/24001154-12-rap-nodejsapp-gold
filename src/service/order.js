class OrderService {
  constructor(OrderRepository) {
    this.OrderRepository = OrderRepository;
  }

  getAll() {
    const orders = this.OrderRepository.getAll();
    return orders;
  }
  getById(id) {
    const orders = this.OrderRepository.getById(id);
    return orders;
  }
  create(order) {
    const orders = this.OrderRepository.create(order);
    return orders;
  }
}

module.exports = OrderService;
