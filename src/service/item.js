class ItemService {
  constructor(ItemRepository) {
    this.ItemRepository = ItemRepository;
  }

  async getAll() {
    try {
      const itemList = await this.ItemRepository.findAll();

      return {
        statusCode: 200,
        items: itemList,
      };
    } catch (err) {
      return {
        statusCode: 500,
        items: null,
      };
    }
  }

  async getId(id) {
    const itemId = await this.ItemRepository.findId(id);
    if (!itemId) {
      return { message: "Item not found", statusCode: 404 };
    } else {
      return {
        itemId: itemId,
        message: "Get item by id success",
        statusCode: 200,
      };
    }
  }

  async create({ name, price, user_id, order_id }) {
    try {
      const createdItem = await this.ItemRepository.insert({
        name,
        price,
        user_id,
        order_id,
      });
      if (
        name === undefined ||
        price === undefined ||
        user_id === undefined ||
        order_id === undefined
      ) {
        return {
          message: "Payload can not empty",
          statusCode: 400,
          createdItem: null,
        };
      }

      return {
        statusCode: 201,
        createdItem: createdItem,
        message: "Create Item Success",
      };
    } catch (err) {
      return {
        statusCode: 500,
        createdItem: null,
      };
    }
  }

  async update({ id, name, price, user_id, order_id }) {
    const updateItem = await this.ItemRepository.update({
      id,
      name,
      price,
      user_id,
      order_id,
    });
    const itemId = await this.ItemRepository.findId(id);
    if (itemId != null) {
      return {
        updateItem: { name, price, user_id, order_id },
        message: "Update item success ",
        statusCode: 201,
      };
    } else {
      return { updateItem: null, statusCode: 404, message: "Item not found" };
    }
  }

  async delete(id) {
    const deleteItem = await this.ItemRepository.delete(id);
    if (deleteItem == false) {
      return { message: "Item not found", statusCode: 404 };
    } else {
      return {
        deleteItem: deleteItem,
        message: "Delete item success",
        statusCode: 204,
      };
    }
  }
}
module.exports = ItemService;
