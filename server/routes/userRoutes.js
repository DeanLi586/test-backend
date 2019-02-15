const express =  require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const { User } = require("../models/user");
const { Book } = require("../models/books");
const {logger} = require("../logger");

const router = express.Router();

// const levels = { 
//     error: 0, 
//     warn: 1, 
//     info: 2, 
//     verbose: 3, 
//     debug: 4, 
//     silly: 5 
// };

// POST: User account creation
router.post('/users/sign-up', (req, res) => {
    // logger.info(req.body);
    let body = _.pick(req.body, ['email', 'password', 'username']);
    let user = new User(body);

    user.save().then(() => { 
        return user.generateAuthToken();
    }).then((token) => {
        logger.info("User account created successfully");
        res.header('x-auth', token).status(200).send(user);
    }).catch( (err) => {
        logger.error("An error occurred during account creation \n", err);
        res.status(400).send("Account creation failed");
    })
});


// POST: User login
router.post('/users/login', (req, res) => {
    User.find({
        email: req.body.email,
        password: req.body.password  
    })
    .then(() => {
        // run some code
        res.send("Login successful");
    }, (err) => {
        logger.error("Account not found");
        res.send("Account not found");
    });
});


// POST: User account modification {
    // POST: Password change
    router.post('/users/change-password', (req, res) => {
        // Setting new password
            User.findOneAndUpdate(
                {
                    email: req.body.email,
                    password: req.body.password  
                },
                {
                    password: req.body.newPassword
                }
            ).then((doc) => {
                res.status(200).send("Password reset successful");
                logger.info("Password reset successful");
            })
    });
    
    // POST: Book change
    router.post('/users/change-book', (req, res) => {
        User.find({email: req.body.email}).then((doc) => {
            if (doc[0] !== undefined) {
                return Book.findOneAndUpdate(
                    {
                        title: req.body.title
                    }, 
                    {
                        title: req.body.newTitle
                    }
                ).then((doc) => {
                    res.status(200).send("Book title changed successful");
                    logger.info("Book title changed successful");
                })
            }
            res.status(400).send("User email not found");
            logger.error("User email not found");
        });  
    })
// }



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
                res.status(200).send("Book added successfully");
                }, (err) => {
                    logger.error("Book could not be added \n", err);
                    res.status(400).send("Book could not be added");
                })
        }
        res.send("User email not found");
        logger.error("User email not found");
    });
});

module.exports = router;
