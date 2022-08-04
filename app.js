require("dotenv").config();
require("./utils/MongoDB");
const express = require("express");
const route = require("./routes");
const app = express();
app.use(express.json());
app.use(route);

app.listen(process.env.PORT, () => {
  console.log(`Listening to http://localhost:${process.env.PORT}`);
});
