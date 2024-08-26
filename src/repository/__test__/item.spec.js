const ItemRepository = require("../ItemRepository");

describe("createItem", () => {
  const itemRepository = new ItemRepository();
  const itemToCreate = {
    categoryId: 2,
    name: "PC",
    description: "PC high performance",
    price: 1500,
    stock: 8,
  };

  //Positive Case
  it("success: should return the created item", async () => {
    const created = await itemRepository.createItem(itemToCreate);

    await itemRepository.deleteByName(itemToCreate.name);

    expect(created.categoryId).toEqual(itemToCreate.categoryId);
    expect(created.name).toEqual(itemToCreate.name);
    expect(created.description).toEqual(itemToCreate.description);
    expect(created.price).toEqual(itemToCreate.price);
    expect(created.stock).toEqual(itemToCreate.stock);
  });

  // Negative case
  it("failed: should return error duplicate name", async () => {
    try {
      await itemRepository.createItem(itemToCreate);
      await itemRepository.createItem(itemToCreate);
    } catch (error) {
      await itemRepository.deleteByName(itemToCreate.name);

      expect(error.errors[0].message).toEqual("name must be unique");
    }
  });
});

describe("findAll", () => {
  const itemRepository = new ItemRepository();

  const expectedItemResponse = {
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

  //Positive Case
  it("success: should return the find all item", async () => {
    const itemList = await itemRepository.findAll();

    expect(itemList.id).toEqual(expectedItemResponse.items.id);
    expect(itemList.categoryId).toEqual(expectedItemResponse.items.categoryId);
    expect(itemList.name).toEqual(expectedItemResponse.items.name);
    expect(itemList.description).toEqual(
      expectedItemResponse.items.description
    );
    expect(itemList.price).toEqual(expectedItemResponse.items.price);
    expect(itemList.stock).toEqual(expectedItemResponse.items.stock);
  });

  // Negative case
  it("failed: should return internal server error", async () => {
    try {
      await itemRepository.findAlll();
    } catch (error) {
      expect(error.message).toEqual(
        "itemRepository.findAlll is not a function"
      );
    }
  });
});

describe("getById", () => {
  const itemRepository = new ItemRepository();

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

  //Positive Case
  it("success: should return get item by ID", async () => {
    const itemById = await itemRepository.getById(1);

    expect(itemById.statusCode).toEqual(expectedItemResponse.item.statusCode);
    expect(itemById.message).toEqual(expectedItemResponse.item.message);
    expect(itemById.id).toEqual(expectedItemResponse.item.id);
    expect(itemById.categoryId).toEqual(expectedItemResponse.item.categoryId);
    expect(itemById.name).toEqual(expectedItemResponse.item.name);
    expect(itemById.description).toEqual(expectedItemResponse.item.description);
    expect(itemById.price).toEqual(expectedItemResponse.item.price);
    expect(itemById.stock).toEqual(expectedItemResponse.item.stock);
  });

  // Negative case
  it("failed: should return internal server error", async () => {
    try {
      await itemRepository.getsById(1);
    } catch (error) {
      expect(error.message).toEqual(
        "itemRepository.getsById is not a function"
      );
    }
  });
  // Negative case
  it("failed: should return Item not found", async () => {
    try {
      await itemRepository.getById(2);
    } catch (error) {
      expect(error.message).toEqual("Item not found");
    }
  });
});

// describe("deleteItem", () => {
//   const itemRepository = new ItemRepository();

//   const expectedItemResponse = {
//     statusCode: 200,
//     message: "Delete item success",
//     deleted_item: 1,
//   };

//   //Positive Case
//   it("success: should return delete item by ID", async () => {
//     const deleted = await itemRepository.deleteItem(336);

//     expect(deleted.statusCode).toEqual(200);
//     expect(deleted.message).toEqual("Delete item success");
//   });

//   // Negative case
//   it("failed: should return internal server error", async () => {
//     try {
//       await itemRepository.deleteItems(336);
//     } catch (error) {
//       expect(error.message).toEqual(
//         "itemRepository.deleteItems is not a function"
//       );
//     }
//   });
//   // Negative case
//   it("failed: should return Item not found", async () => {
//     try {
//       await itemRepository.deleteItem(336);
//     } catch (error) {
//       expect(error.message).toEqual("Item not found");
//     }
//   });
// });
