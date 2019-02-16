const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const _ = require("lodash");

const userSchema = new mongoose.Schema({
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
            validator: (value) => validator.isEmail(value),
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

// override the return object of mongoose
userSchema.methods.toJSON = function() {
    let user = this;
    let userObj = user.toObject();
    return _.pick(userObj, ['_id', 'email', 'username']);
}

// create 'generate authentication token' instance method
userSchema.methods.generateAuthToken = function() {
    let salt = 'vodcmo;ei09j042@#m/ec[09j2**fcc8b494880d1e7a139380a4828f845e311c21d9c93f77700b173f4589f75ad1f1';
    let user = this;
    let access = 'auth';
    let token = jwt.sign({id: user._id.toHexString(), access}, salt).toString();
    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => token);
};

// 
userSchema.statics.findByToken = function(token) {
    let User = this;
    let salt = 'vodcmo;ei09j042@#m/ec[09j2**fcc8b494880d1e7a139380a4828f845e311c21d9c93f77700b173f4589f75ad1f1';
    let decoded;
    try {
        decoded = jwt.verify(token, salt);
        // console.log(decoded);
        return User.findOne({
            _id: decoded.id,
            // "tokens.token": decoded.token,
            "tokens.access": "auth",
        })
    } catch(err) {

    }
}

// Create "USER" model
const User = mongoose.model("User", userSchema);

module.exports = { User };
