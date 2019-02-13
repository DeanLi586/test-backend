const express = require('express');
const { User } = require("../models/user");
const { Book } = require("../models/books");
const _ = require("lodash");
const {logger} = require("../logger");
const router = express.Router();

// POST: User creates account and posts to server
router.post('/users/sign-up', (req, res) => {
    // logger.info(req.body);
    let body = _.pick(req.body, ['email', 'password', 'username']);
    let user = new User({
        email: body.email,
        password: body.password,
        username: body.username
    });

    user.save().then((doc) => {
        logger.info("User account created successfully", doc);
        res.json(doc);
    }, (err) => {
        logger.error("An error occurred during account creation \n", err);
        res.status(400).send("Your input were wrong");
    });
});


// POST: User login
router.post('/users/login', (req, res) => {
    user.find({
        email: req.body.email,
        password: req.body.password  
    })
    .then(() => {
        // run some code
        res.send("Login successful");
    }, (err) => {
        res.send("Account not found");
    });
});


// POST: User account modification
// app.post('/users/update-account', (req, res) => {
//     user.findOneAndUpdate(
//         {
//             email: req.body.email,
//             password: req.body.password  
//         },
//         {

//         }
//     )
// })


// POST: User adds book
router.post('/books/add', (req, res) => {
   let body = _.pick(req.body, ['email', 'title']);
    let book = new Book({
        email: body.email,
        title: body.title
    });

    User.find({email: body.email}).then((doc) => {
        if (doc[0] !== undefined) {
            return book.save().then((doc) => {
                logger.info("Book added successfully", doc);
                }, (err) => {
                    logger.error("Book could not be added \n", err);
                    res.status(400).send("Book could not be added");
                });
        }
        res.send("User email not found");
        logger.error("User email not found");
    });
});


module.exports = router;