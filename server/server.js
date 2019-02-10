const express =  require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { User } = require("./models/user");
const { Book } = require("./models/books");

const port = 3000 || process.env.PORT
const app = express();
app.use(bodyParser.json());


// POST: User creates account and posts to server
app.post('/users/sign-up', (req, res) => {
    // console.log(req.body);
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    });

    user.save().then((doc) => {
        console.log("User account created successfully", doc);
    }, (err) => {
        console.log("An error occurred during account creation \n", err);
        res.status(400).send("Your input were wrong");
    })
})


// POST: User login
app.post('/users/login', (req, res) => {
    user.find({
        email: req.body.email,
        password: req.body.password  
    })
    .toArray()
    .then(() => {
        // run some code
        res.send("Login successful");
    }, (err) => {
        res.send("Account not found");
    })
})


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
// app.post('/books/add', (req, res) => {
//     let book = new Book({
//         email: req.body.email,
//         title: req.body.title
//     });

//     if ( user.findOne({email: req.body.email}) ) {
//         book.save().then((doc) => {
//             console.log("User account created successfully", doc);
//         }, (err) => {
//             console.log("An error occurred during account creation \n", err);
//             res.status(400).send("Your input were wrong");
//         })
//     } 
// })

app.post('/books/add', (req, res) => {
    let book = new Book({
        email: req.body.email,
        title: req.body.title
    });
    
    book.save().then((doc) => {
        console.log("Book added to collection", doc);
    }, (err) => {
        console.log("An error occurred when adding book \n", err);
        res.status(400).send("Your input were wrong");
    }) 
})

app.listen(port, () => {
    console.log("Successfully connected to server");
})