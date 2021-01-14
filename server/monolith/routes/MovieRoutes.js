const Router = require("express").Router();
const MovieController = require("../controllers/MovieController");

Router.get("/", MovieController.getList);

module.exports = Router;
