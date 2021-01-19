const Router = require("express").Router();
const { MovieController } = require("../controllers");

Router.get("/", MovieController.getList);
Router.get("/:id", MovieController.getById);
Router.post("/", MovieController.create);
Router.patch("/:id", MovieController.update);
Router.delete("/:id", MovieController.delete);

module.exports = Router;
