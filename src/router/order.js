//---------------------Order Handler-----------------------------------
const express = require("express");

const OrderHandler = require("../handler/order");
const OrderService = require("../service/order");
const OrderRepository = require("../repository/order");

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderHandler = new OrderHandler(orderService);
// console.log("order service");

const router = express.Router();

router.get("/orders", orderHandler.getAll);
router.get("/orders/:id", orderHandler.getId);
router.post("/orders", orderHandler.create);
router.put("/orders/:id", orderHandler.update);
router.delete("/orders/:id", orderHandler.delete);

module.exports = router;
