const mongoose = require("mongoose");

// Enable use of promises in mongoose
mongoose.Promise = global.Promise;

// Connect to Pescedi database, created if nonexistent 
mongoose.connect("mongodb://localhost:27017/Pescedi", {useNewUrlParser: true});

// Export mongoose 
module.exports = { mongoose };