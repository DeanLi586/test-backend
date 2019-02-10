const mongoose = require("mongoose");
const validator = require("validator");

// Create "BOOKS" model
const Book = mongoose.model("Book", {
    title: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            }
        }
    }
});

module.exports = { Book };
