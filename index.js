const express = require("express");
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const keys = require("./config/keys");
const bodyParser = require("body-parser");
// require("./services/passport");

const app = express();
require("./routers/authRouter")(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
app.listen(port)
