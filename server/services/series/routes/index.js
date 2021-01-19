const Router = require("express").Router();
const SeriesController = require("../controllers");

Router.get("/", SeriesController.getList);
Router.get("/:id", SeriesController.getById);
Router.post("/", SeriesController.create);
Router.patch("/:id", SeriesController.update);
Router.delete("/:id", SeriesController.delete);

module.exports = Router;
