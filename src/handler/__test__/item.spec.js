const request = require("supertest");
const app = require("../../app");
const ItemRepository = require("../../repository/ItemRepository");

describe("createItem", () => {
  let server;
  const PORT = 8000;

  const itemRepository = new ItemRepository();
  const itemToCreate = {
    categoryId: 2,
    name: "PC",
    description: "PC high performance",
    price: 1500,
    stock: 8,
  };

  beforeEach(() => {
    server = app.listen(PORT, function () {
      console.log(`Server berjalan pada http://localhost:${PORT}`);
    });
  });

  afterEach(async () => {
    // Cleanup data
    await itemRepository.deleteByName(itemToCreate.name);

    server.close();
  });

  // Positive case
  it("success: should response with 201 and return the created item", async () => {
    return (
      request(app)
        .post("/items")
        .set("Content-type", "application/json")
        // .set("Authorization", "Bearer + token")
        .send(itemToCreate)
        .then(async (res) => {
          expect(res.statusCode).toEqual(201);
          expect(res.body.created_item.name).toEqual(itemToCreate.name);
        })
    );
  });

  // Negative case
  it("success: should response with 400 and return the error message", async () => {
    const itemToCreate = {
      categoryId: 2,
      name: "PC",
      description: "PC high performance",
      price: 1500,
      stock: 8,
    };

    // Create duplicate data
    await itemRepository.createItem(itemToCreate);

    return request(app)
      .post("/items")
      .set("Content-type", "application/json")
      .send(itemToCreate)
      .then(async (res) => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.message[0].message).toEqual("name must be unique");
      });
  });
});

describe("getAll", () => {
  let server;
  const PORT = 8000;
  const itemRepository = new ItemRepository();

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

  beforeEach(() => {
    server = app.listen(PORT, function () {
      console.log(`Server berjalan pada http://localhost:${PORT}`);
    });
  });

  afterEach(async () => {
    server.close();
  });

  // Positive case
  it("success: should response with 200 and return get all item", async () => {
    return request(app)
      .get("/items")
      .set("Content-type", "application/json")
      .then(async (res) => {
        // expect(res.statusCode).toEqual(expectedItemResponse.statusCode);
        // expect(res.message).toEqual("Get All Item successfully");
        expect(res.body.items).toEqual(expectedItemResponse.items);
      });
  });

  // Negative case
  // it("success: should response with 500 and return the error message", async () => {
  //   // Create duplicate data
  //   await itemRepository.findAlll();

  //   return request(app)
  //     .get("/items")
  //     .set("Content-type", "application/json")
  //     .then(async (res) => {
  //       expect(res.statusCode).toEqual(500);
  //       expect(res.body.message).toEqual(
  //         "itemRepository.findAlll is not a function"
  //       );
  //     });
  // });
});

// describe("getById", () => {
//   let server;
//   const PORT = 8000;
//   const itemRepository = new ItemRepository();

//   const id = 1;

//   const expectedItemResponse = {
//     statusCode: 200,
//     message: "Get Item by ID successfully",
//     item: [
//       {
//         id: 1,
//         categoryId: 1,
//         name: "Laptop",
//         description: "laptop high performance",
//         price: 1200,
//         stock: 10,
//         createdAt: "2024-08-07T16:50:42.206Z",
//         updatedAt: "2024-08-07T16:50:42.206Z",
//       },
//     ],
//   };

//   beforeEach(() => {
//     server = app.listen(PORT, function () {
//       console.log(`Server berjalan pada http://localhost:${PORT}`);
//     });
//   });

//   afterEach(async () => {
//     server.close();
//   });

//   // Positive case
//   it("success: should response with 200 and return get item by ID", async () => {
//     return request(app)
//       .get("/items/:id")
//       .set("Content-type", "application/json")
//       .send(id)
//       .then(async (res) => {
//         // expect(res.statusCode).toEqual(expectedItemResponse.statusCode);
//         // expect(res.message).toEqual("Get All Item successfully");
//         expect(res.body.item).toEqual(expectedItemResponse.item);
//       });
//   });
// });
