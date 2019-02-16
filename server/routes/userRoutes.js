const express =  require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

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
    let body = _.pick(req.body, ['email', 'password', 'username']);
    let salt = 'm[c0j9[4fiej[8hcWE';
    body.password = jwt.sign(body.password, salt);

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


// POST: User login --not-done
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


    // POST: Password change
    router.patch('/users/change-password', (req, res) => {
        try {
            User.findByToken(req.header('x-auth'))
            .then((doc) => {
                let salt = 'm[c0j9[4fiej[8hcWE';
                // let newPassword = jwt.sign(req.body.newPassword, salt);
                req.body.password = jwt.sign(req.body.password, salt);

                if (doc !== null) {
                    return User.findOneAndUpdate(
                        {
                            email: doc.email,
                            password: req.body.password
                        }, 
                        {
                            password: jwt.sign(req.body.newPassword, salt)
                        }
                    ).then(() => {
                        res.status(200).send("Password changed successful");
                        logger.info("Password changed successful");
                    })
                }
            });
        } catch {
            res.status(401).send("Authentication required!!");
            logger.error("Authentication to change password failed");
        }   
    })
    
    // POST: Book change
    router.patch('/users/change-book', (req, res) => {
        User.findByToken(req.header('x-auth'))
        .then((doc) => {
            // console.log('doc:\n', doc);
            // res.send(doc);
            if (doc !== null) {
                return Book.findOneAndUpdate(
                    {
                        email: doc.email,
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
            res.status(401).send("Authentication required!!");
            logger.error("Authentication to change book title failed");
        });  
    })

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