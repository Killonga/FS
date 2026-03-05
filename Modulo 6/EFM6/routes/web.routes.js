const express = require("express");
const router = express.Router();
const controller = require("../controllers/web.controller");

// router.get("/", controller.allMessages);
router.get("/mensajes", controller.allMessages);
router.post("/nuevo-mensaje", controller.newMessage);

module.exports = router;
