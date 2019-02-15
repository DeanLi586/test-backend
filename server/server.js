const express =  require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const {logger} = require("./logger");
const userRoutes = require("./routes/userRoutes");

const port = 3000 || process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(userRoutes);

app.listen(port, () => {
    logger.info("Successfully connected to server");
});