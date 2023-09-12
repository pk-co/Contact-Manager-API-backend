const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        required: [true, "Please add the user name"],
    },

    email: {
        type: String,
        required: [true, "Please add the email address"],
        unique: [true, "Email address already taken"]
    },

    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);