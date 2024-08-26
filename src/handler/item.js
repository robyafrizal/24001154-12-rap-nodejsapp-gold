class ItemHandler {
  constructor(ItemService) {
    this.ItemService = ItemService;

    this.getAll = this.getAll.bind(this);
    this.getId = this.getId.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    const serviceRes = await this.ItemService.getAll();

    res.status(serviceRes.statusCode).send({
      items: serviceRes.items,
    });
  }

  // async getAll(req, res) {
  //   const serviceRes = await this.itemService.getAll();

  //   res.status(serviceRes.statusCode).send({
  //     statusCode: serviceRes.statusCode,
  //     message: serviceRes.message,
  //     items: serviceRes.items,
  //   });
  // }

  async getId(req, res) {
    try {
      const id = req.params.id;
      const itemId = await this.ItemService.getId(id);
      res
        .status(itemId.statusCode)
        .send({ items: itemId.itemId, message: itemId.message });
    } catch (err) {
      res.status(itemId.statusCode).send({ message: err.message });
    }
  }

  // async getById(req, res) {
  //   const id = req.params.id;
  //   const serviceRes = await this.itemService.getById(id);

  //   res.status(serviceRes.statusCode).send({
  //     statusCode: serviceRes.statusCode,
  //     message: serviceRes.message,
  //     item: serviceRes.item,
  //   });
  // }

  async create(req, res) {
    const payload = req.body;
    const serviceRes = await this.ItemService.create(payload);

    res.status(serviceRes.statusCode).send({
      created_item: serviceRes.createdItem,
      message: serviceRes.message,
    });
  }

  // async create(req, res) {
  //   const payload = req.body;

  //   const serviceRes = await this.itemService.createItem({
  //     categoryId: payload.categoryId,
  //     name: payload.name,
  //     description: payload.description,
  //     price: payload.price,
  //     stock: payload.stock,
  //   });

  //   res.status(serviceRes.statusCode).send({
  //     statusCode: serviceRes.statusCode,
  //     message: serviceRes.message,
  //     created_item: serviceRes.createdItem,
  //   });
  // }

  async update(req, res) {
    try {
      const { name, price, user_id, order_id } = req.body;
      const { id } = req.params;
      const updateItem = await this.ItemService.update({
        name,
        price,
        user_id,
        order_id,
        id,
      });

      res
        .status(updateItem.statusCode)
        .send({ items: updateItem.updateItem, message: updateItem.message });
    } catch (err) {
      res.status(updateItem.statusCode).send({ message: err.message });
    }
  }

  // async update(req, res) {
  //   const { categoryId, name, description, price, stock } = req.body;
  //   const { id } = req.params;
  //   const serviceRes = await this.itemService.updateItem({
  //     categoryId,
  //     name,
  //     description,
  //     price,
  //     stock,
  //     id,
  //   });

  //   res.status(serviceRes.statusCode).send({
  //     statusCode: serviceRes.statusCode,
  //     message: serviceRes.message,
  //     updated_item: serviceRes.updatedItem,
  //   });
  // }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deleteItem = await this.ItemService.delete(id);
      res.status(deleteItem.statusCode).send({ message: deleteItem.message });
    } catch (err) {
      res.status(deleteItem.statusCode).send({ message: err.message });
    }
  }

  // async delete(req, res) {
  //   const id = req.params.id;
  //   const serviceRes = await this.itemService.deleteItem(id);

  //   res.status(serviceRes.statusCode).send({
  //     statusCode: serviceRes.statusCode,
  //     message: serviceRes.message,
  //     deleted_item: serviceRes.items,
  //   });
  // }
}

module.exports = ItemHandler;
