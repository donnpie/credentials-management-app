const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.send('Hello');
})


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
    res.json({user: user});
})


module.exports = router;