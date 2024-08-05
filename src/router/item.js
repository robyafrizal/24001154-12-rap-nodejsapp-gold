//------------------Item Handler------------------------------
const express = require("express");

const ItemHandler = require("../handler/item");
const ItemService = require("../service/item");
const ItemRepository = require("../repository/item");

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemHandler = new ItemHandler(itemService);

const router = express.Router();

router.get("/items", itemHandler.getAll);
router.post("/items", itemHandler.create);
router.get("/items/:id", itemHandler.getId);
router.put("/items/:id", itemHandler.update);
router.delete("/items/:id", itemHandler.delete);

module.exports = router;
