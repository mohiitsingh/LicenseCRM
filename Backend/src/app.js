const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const swaggerUi = require( "swagger-ui-express");
const swaggerSpec = require( "./config/swagger.js");

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "portal is running",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const API = require("./common/constants/api");
const routes = require("./routes/index");

const errorHandler = require("./middleware/error.middleware");

app.use(API.PREFIX + API.VERSION, routes);

app.use(errorHandler);

module.exports = app;
