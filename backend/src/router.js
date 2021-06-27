import express from "express";
import { v4 as uuidv4 } from "uuid"; //ID encryption
import jwt from "jsonwebtoken"; //token creation
import verifyToken from "./middleware/jwtVerify.js";
import { readEntries, writeEntries, readUsers, writeUsers } from "./util/jsonHandler.js"; //functions for json database
import bcrypt from "bcrypt" //bcrypt for hashing passwords
import dotenv from "dotenv"

dotenv.config()

const router = express.Router();

const validateEntries = (req, res, next) => {
    const body = req.body
    const invalid = []
    console.log(body)
    for (var property in body) {
        console.log(property)
        if (body[property] == null || body[property].length === 0) {
            invalid.push(property)
        }
    }
    const requiredProperties = ["name", "email", "phoneNumber", "content"]
    requiredProperties.filter(prop => !body.hasOwnProperty(prop)).forEach(key => invalid.push(key))
    if (invalid.length > 0) {
        return res.status(400).send({message: "validation error", invalid})
    }
    next()
}

const validateUserContents = (request) => {
    const errors = []
    const requiredProperties = ["name", "password", "email"]
    // check if each property is expected
    requiredProperties.forEach(property => {
        // does property exist on req.body
        if(!request.hasOwnProperty(property)) {
            errors.push(property)
        }
    })
    // valid password
    if (request.password.length < 8) {
        errors.push("password")
    }
    // valid email
    if (request.email.length) {
        var atpos=request.email.indexOf("@");
        var dotpos=request.email.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=request.email.length) {
            errors.push("email")
        }
    }
    return errors
}

//Test if postman is working
router.get("/", (req, res) => {
    return res.status(200).send("Hello World");
  });

//Add new entry
router.post('/contact_form/entries', validateEntries, async (req, res) => {
    const body = req.body
    const newEntry = {id: uuidv4(), ...body}
    readEntries().then((entriesArray) => {
        entriesArray.push(newEntry);
        writeEntries(entriesArray);
        return res.status(201).send(entriesArray);
    })
})


//Add new user
router.post("/users", (req, res) => {
    let errors = []
    errors = [ ...errors, ...validateUserContents(req.body)]

    if (errors.length) {
        return res.status(400).send({message: "validation error", invalid: errors })
    }
    else {
        let newUser = {
            id: uuidv4(),
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        }
        bcrypt.hash(newUser.password, 10, function (err, hash) {
            newUser.password = hash;
            //Push new user into array then write user into json database
            readUsers().then((userArray) => {
                userArray.push(newUser);
                writeUsers(userArray);
                return res.status(201).send(userArray);
            })
        })    
    }
})

//get token
router.post("/auth", (req, res) => {
    let userAuth = {
        email: req.body.email,
        password: req.body.password,
    }
    readUsers().then((userArray) => {
        let findUserEmail = userArray.find(user => user.email == userAuth.email)
        if (findUserEmail == null) {
            return res.status(401).send({message: "incorrect credentials provided"})
        }
        else { //compare hashed password
            bcrypt.compare(userAuth.password, findUserEmail.password, function(err, result) {
                if (result == false) {
                    return res.status(401).send({message: "incorrect credentials provided"})
                }
                else {
                    let token = jwt.sign(userAuth, `${process.env.privateKey}`);
                    return res.status(201).send({token: token});
                }
            });
        }
    })
})

//get entries array using token
//hardcode token is "testtoken" - Not anymore
router.get("/contact_form/entries", verifyToken, (req, res) => {
    readEntries().then((entriesArray) => {
        return res.status(201).send(entriesArray);
    })
})

//get array based on ID
//hardcode token is "testtoken" - Not anymore
router.get("/contact_form/entries/:id", verifyToken, (req, res) => {
    readEntries().then((entriesArray) => {
        let findID = entriesArray.find(entry => entry.id == req.params.id)
        if (findID == null) {
            return res.status(404).send({message: `entry ${req.params.id} not found`});
        }
        else{
            return res.status(200).send(findID);
        }
    })
})

//errorhandler
router.all("*", (req, res, next) => {
  let err = new Error("typed wrong URL");
  next(err);
});

export default router;