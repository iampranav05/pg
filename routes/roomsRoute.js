const express = require("express");
const router = express.Router();

const Room = require('../models/room')

router.get("/getallrooms", async(req, res) => {
    
    try {
        const rooms = await Room.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({message: error });
    }

});

router.post("/getroombyid", async(req, res) => {
    
    const roomid = req.body.roomid
    try {
        const room = await Room.findOne({_id : roomid})
        res.send(room)
    } catch (error) {
        return res.status(400).json({message: error });
    }

});

router.post("/addroom", async(req, res) => {
    console.log("hello")
    try {
        const newroom = new Room(req.body)
        await newroom.save()

        res.send('New Room Added Successfully')
    } catch (error) {
        return res.status(400).json({ error})
    }
})
// Delete
router.delete("/delete/:roomid", async(req, res) => {    
    const roomid = req.params.roomid;
    try {
        const room = await Room.findOneAndDelete({_id : roomid});
        if (!room) {
            return res.status(404).send('Room not found');
        }
        res.send('Room deleted successfully');
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

// Edit
router.put("/update/:roomid", async(req, res) => {
    const roomid = req.params.roomid;
    const updates = req.body;
    try {
        const room = await Room.findOneAndUpdate({_id : roomid}, updates, { new: true });
        if (!room) {
            return res.status(404).send('Room not found');
        }
        res.send(room);
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

module.exports = router;