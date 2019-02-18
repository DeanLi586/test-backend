# test-backend
This is a test project to make use of the technologies that will be used in the building of the pescedi backend

### Summary
In this project we are going to build a simple application that allows a user to 
1. Register
2. Login
3. Update their details 
4. Add books to their collection 

### Technologies
We are going to use the following in this application
1. MongoDB: database (could be local or cloud-based)
2. Json Web Tokens (JWT): For authentication
3. winston: For logging, all the output should be saved in the server.log file on the local machine
4. Express: For web server
5. lodash: To pick specific items from user input
6. Validator: To create a custom validation in mongoose model
7. Mongoose: Wrap around MongoDB for ease of use

### Running the Application
After cloning this project run the following commands to get started:

```
npm install
```

to install the dependencies

```
cd /Program Files/MongoDB/Server/4.0/bin

mongod.exe --dbpath /mongo-data 
```

to start mongodb database server

```
npm run dev 
```

to run the project in development mode

```
npm run app 
```

to run app

```
Open postman app and set request as *** POST *** and route as *** localhost:3000/users/sign-up ***
to create a user account;

Select *** Body *** below and select *** raw *** then set type to *** JSON (application/json) ***

example:
{
	"username": "fooBeezy",
	"password": "f00b@r",
	"email": "foobar@gmail.com"
} 
```

to sign up


```
Open postman app and set request as *** PATCH *** and route as *** localhost:3000/users/change-book ***, also set header with key as *** x-auth *** and retrieve token from user collection in db and set as value to change a saved book's title;

Select *** Body *** below and select *** raw *** then set type to *** JSON (application/json) ***

example:
{
	"title": "A series of unfortunate events",
	"newTitle": "Game of thrones"
} 
```

to change book


