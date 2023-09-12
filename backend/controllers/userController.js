const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.Model')

// POST -  /api/users/register
// access public
const registerUser =  asyncHandler(async (req,res) => {
    const {userName, email, password} = req.body;

    // Check the fields are empty or not
    if(!userName || !email || !password) { 
        res.status(400);
        throw new Error('All fields are mandatory');
    }

    // Check the same email already used
    const userAvailable= await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("User already registerd!");
    }

    // Hashing password using (bcrypt) library
    const hashedPassword = await bcrypt.hash(password, 10)
    //console.log(hashedPassword);

    // create a new user
    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    });

    if(user) {
        res.status(201).json({ username: userName, email: email });
    } else {
        res.status(400);
        throw new Error("User data not valid");
    }
    //res.json({message: "Register the user"});
});


// Post - /api/login
const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("All filed are mandatory.");
    }
    // check the user registerd ?
    const user = await User.findOne({email});

    // compare password with hashpassword
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.userName,
                email: user.id,
                id: user.id
            }
        },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1d"
            }    
        );

        res.status(200).json({accessToken})
    } else {
        res.status(401);
        throw new Error("Email or Password is not valid")
    }
   
});


const currentUser = asyncHandler(async (req,res) => {
    res.send(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}