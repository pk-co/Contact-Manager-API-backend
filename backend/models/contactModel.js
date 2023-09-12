const { default: mongoose } = require('mongoose');
const momgoose = require('mongoose');

const contactSchema = new momgoose.Schema({
    user_id  : {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add the contact name."]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"]
    },
    phone: {
        type: String,
        required: [true, "Please add the phone number"]
    },

}, {
    timestamps: true,
});


module.exports = mongoose.model("Contact", contactSchema);

