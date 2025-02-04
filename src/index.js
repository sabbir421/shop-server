const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { variables } = require("./config/variables");
const routes = require("./routes/routes");
const responseHandler = require("./utils/responseHandler");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
app.use(responseHandler);
app.use(routes);

// Start server
app.listen(variables.port, () => {
  console.log(`API server listening on port ${variables.port}`);
});
