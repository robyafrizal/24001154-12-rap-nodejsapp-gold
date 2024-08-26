const ItemService = require("../itemService");
const ItemRepository = require("../../repository/ItemRepository");

describe("createItem", () => {
  // Positive case
  it("success: should return the created item", async () => {
    // Create mock for item repository
    const mockItemRepository = new ItemRepository();
    const itemRequest = {
      categoryId: 1,
      name: "Item5",
      description: "Item5 for high performance",
      price: 1300,
      stock: 12,
    };

    const expectedItemResponse = {
      statusCode: 201,
      message: "Item created successfully",
      created_item: {
        createdAt: "2024-08-08T01:14:24.831Z",
        updatedAt: "2024-08-08T01:14:24.833Z",
        categoryId: 1,
        name: "Item5",
        description: "Item5 for high performance",
        price: 1300,
        stock: 12,
      },
    };

    mockItemRepository.createItem = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(expectedItemResponse.created_item)
      );

    const itemService = new ItemService(mockItemRepository);
    const items = await itemService.createItem(itemRequest);

    const itemRepository = new ItemRepository();
    await itemRepository.deleteByName(itemRequest.name);

    expect(items.statusCode).toEqual(expectedItemResponse.statusCode);
    expect(items.message).toEqual("Item created successfully");
    expect(items.createdItem.description).toEqual(
      expectedItemResponse.created_item.description
    );
    expect(items.createdItem.price).toEqual(
      expectedItemResponse.created_item.price
    );
    expect(items.createdItem.stock).toEqual(
      expectedItemResponse.created_item.stock
    );
    expect(items.createdItem.name).toEqual(
      expectedItemResponse.created_item.name
    );
  });
});

describe("getAll", () => {
  // Positive case
  it("success: should return get all item", async () => {
    // Create mock for item repository
    const mockItemRepository = new ItemRepository();

    const expectedItemResponse = {
      statusCode: 200,
      message: "Get All Item successfully",
      items: [
        {
          id: 1,
          categoryId: 1,
          name: "Laptop",
          description: "laptop high performance",
          price: 1200,
          stock: 10,
          createdAt: "2024-08-07T16:50:42.206Z",
          updatedAt: "2024-08-07T16:50:42.206Z",
        },
      ],
    };

    mockItemRepository.getAll = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedItemResponse.items));

    const itemService = new ItemService(mockItemRepository);
    const items = await itemService.getAll();

    expect(items.statusCode).toEqual(expectedItemResponse.statusCode);
    expect(items.message).toEqual("Get All Item successfully");
    expect(items.items.description).toEqual(
      expectedItemResponse.items.description
    );
    expect(items.items.price).toEqual(expectedItemResponse.items.price);
    expect(items.items.stock).toEqual(expectedItemResponse.items.stock);
    expect(items.items.name).toEqual(expectedItemResponse.items.name);
  });
});

describe("getById", () => {
  // Positive case
  it("success: should return get item by ID", async () => {
    // Create mock for item repository
    const mockItemRepository = new ItemRepository();

    const expectedItemResponse = {
      statusCode: 200,
      message: "Get Item by ID successfully",
      item: {
        id: 1,
        categoryId: 1,
        name: "Laptop",
        description: "laptop high performance",
        price: 1200,
        stock: 10,
        createdAt: "2024-08-07T16:50:42.206Z",
        updatedAt: "2024-08-07T16:50:42.206Z",
      },
    };

    mockItemRepository.getById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedItemResponse.item));

    const itemService = new ItemService(mockItemRepository);
    const items = await itemService.getById(1);

    expect(items.statusCode).toEqual(expectedItemResponse.statusCode);
    expect(items.message).toEqual("Get Item by ID successfully");
    expect(items.item.description).toEqual(
      expectedItemResponse.item.description
    );
    expect(items.item.price).toEqual(expectedItemResponse.item.price);
    expect(items.item.stock).toEqual(expectedItemResponse.item.stock);
    expect(items.item.name).toEqual(expectedItemResponse.item.name);
  });
});
