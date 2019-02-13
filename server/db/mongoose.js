const mongoose = require("mongoose");
const {logger} = require("../logger");

// Enable use of promises in mongoose
mongoose.Promise = global.Promise;

// Connect to Pescedi database, created if nonexistent 
mongoose.connect("mongodb://localhost:27017/Pescedi", {useNewUrlParser: true})
.then(() => {
    logger.info("connected to database");
}).catch((err) => {
    logger.error(err);
});

// Export mongoose 
module.exports = { mongoose };