const express = require("express");
const router = express.Router();
const Contact = require("../models/contact")

router.post("/contactUs",(req,res) => {

    console.log('hello')
    const {name,email,message} = req.body;

    const newContact = new Contact({name,email,message})

    try {
        newContact.save()
        res.send("User contact Successfully")
    }
    catch(error) {
        return res.status(400).json({message:error});
    }

});

module.exports = router;