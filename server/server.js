const express =  require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const { mongoose } = require("./db/mongoose");
const { User } = require("./models/user");
const { Book } = require("./models/books");
const {logger} = require("./logger");

const port = 3000 || process.env.PORT
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


// POST: User creates account and posts to server
app.post('/users/sign-up', (req, res) => {
    // logger.info(req.body);
    let body = _.pick(req.body, ['email', 'password', 'username']);
    let user = new User({
        email: body.email,
        password: body.password,
        username: body.username
    });

    user.save().then((doc) => {
        logger.info("User account created successfully", doc);
    }, (err) => {
        logger.error("An error occurred during account creation \n", err);
        res.status(400).send("Your input were wrong");
    });
});


// POST: User login
app.post('/users/login', (req, res) => {
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
app.post('/books/add', (req, res) => {
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
                })
        }
        res.send("User email not found");
        logger.error("User email not found");
    });
});

app.listen(port, () => {
    logger.info("Successfully connected to server");
});