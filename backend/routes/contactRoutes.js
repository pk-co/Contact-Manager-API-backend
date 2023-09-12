const express = require('express');
const router = express.Router();
const {getContact, createContact, getOneContact, updateContact, deleteContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get("/", getContact);
router.post("/", createContact);
router.get("/:id", getOneContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;