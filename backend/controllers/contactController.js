const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel')

// view all contact
// route GET api/contact
const getContact = asyncHandler(async (req,res, next) => {
    const contact = await Contact.find({user_id: req.user.id});
    if(!contact) {
        res.status(400);
    }
    res.status(201).json(contact);
    
});

// create contact
// route POST api/contact
const createContact = asyncHandler (async (req,res) => {
    console.log('the request body is ', req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error('All fileds are mandotory')
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })

    res.status(201).json(contact);
    
});

// view contact by id
// route GET api/contact/:id
const getOneContact  = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact) {
        res.status(404);
        throw new Error('Cannot found id')
    }

    res.status(201).json(contact);
    
});


// update contact by id
// route PUT api/contact/:id
const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("cannot found id");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User don't have permission to update other user contacts");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(201).json(updateContact);
    
});


// delete contact by id
// route Delete api/contact/:id
const deleteContact = asyncHandler (async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('not found id');
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User don't have permission to delete other user contacts");
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({delete : "Deleted "});
    //console.log('Deleted ');
    
});

module.exports = {
    getContact, 
    createContact, 
    getOneContact, 
    updateContact, 
    deleteContact
};