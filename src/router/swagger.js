//-------------------Swagger----------------------------
const express = require("express");

const swaggerJSON = require("../../swagger/swagger.json");
const swaggerUI = require("swagger-ui-express");

const router = express.Router();

router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerJSON));

module.exports = router;
