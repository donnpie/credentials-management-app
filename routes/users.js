const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const jwtPrivateKey = require('../config/secrets').jwtPrivateKey

//get list of users where the OU and division is the same as the user's
router.get('/', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const payload = jwt.verify(token, jwtPrivateKey)
        const ou = payload.ou;
        const division = payload.division;
        const users = await User.find({ou, division});
        res.json(users);
    }catch (err) {
        res.status(401).json({Error: "The given token is not valid"})
    }
});

//Get user by id. Display only if the user is from the same ou and division
router.get('/:id', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const payload = jwt.verify(token, jwtPrivateKey)
        console.log('payload', payload);
        const id = req.params.id;
        const user = await User.findById(id);
        console.log('user', user);
        if (payload.ou === user.ou && payload.division === user.division) {
            res.json(user);
        } else {
            res.status(403).json({Error: "User not authorised"});
        }
    }catch (err) {
        res.status(401).json({Error: "The given token is not valid"})
    }
});

//Register a new user
router.post('/', async (req, res) => {
    //Check if request is valid
    const {error} = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message)
    
    //check if user exists
    let user = await User.findOne({userName: req.body.name});
    if (user) return res.status(400).json({Error: "This username is taken"})
    
    //Add user
    user = new User({
        userName: req.body.name,
        password: req.body.password,
        ou: req.body.ou,
        division: req.body.division
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
 
    //Return user 
    const payload = _.pick(user, ['_id', 'userName', 'ou', 'division', 'role'])
    const token = jwt.sign(JSON.stringify(payload), jwtPrivateKey, {algorithm: 'HS256'});
    res.header('x-auth-token', token).json(payload);
})


module.exports = router;