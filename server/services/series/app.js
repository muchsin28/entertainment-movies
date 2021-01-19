const express = require("express");
const app = express();
const PORT = 4002;
const Router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router)

app.listen(PORT, () => console.log("App running on http://localhost:" + PORT));
