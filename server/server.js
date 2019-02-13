const express =  require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const {logger} = require("./logger");

const port = 3000 || process.env.PORT;
const app = express();
app.use(bodyParser.json());

// const levels = { 
//     error: 0, 
//     warn: 1, 
//     info: 2, 
//     verbose: 3, 
//     debug: 4, 
//     silly: 5 
// };

const UserRoutes = require('./routes/userRoutes');

app.use(UserRoutes);

app.listen(port, () => {
    logger.info("Successfully connected to server");
});