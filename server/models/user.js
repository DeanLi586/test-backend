const mongoose = require("mongoose");
const validator = require("validator");

// Create "USER" model
const User = mongoose.model("User", {
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        minLength: 1,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
});

module.exports = { User };
