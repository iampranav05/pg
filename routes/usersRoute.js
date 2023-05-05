const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.post("/register", async(req,res)=>{

    const newuser = new User({name : req.body.name , email : req.body.email , password : req.body.password})

    try {
        const user = await newuser.save()
        res.send('User Registered Successfully')
    } catch (error) {return res.status(400).json({ error });
}
});

// Test
router.post("/register", async (req, res) => {
    const { fname, email, password, userType } = req.body;
  
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.json({ error: "User Exists" });
      }
      await User.create({
        fname,
        lname,
        email,
        password: encryptedPassword,
        userType,
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  });

router.post("/login" , async(req, res) =>{

    const {email , password} = req.body
    try {
        const user = await User.findOne({email : email , password : password})
        if(user) {

            const temp = {
                name : user.name,
                email:user.email,
                isAdmin : user.isAdmin,
                _id : user._id,
            }
        res.send(temp) 
    }
    else{
        return res.status(400).json({ message : 'Login failed'});
    }
    } catch (error) {
        return res.status(400).json({ error });

    }
});

router.get("/getallusers" , async(req,res) => {

    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        return res.status(400).json({ error });
        
    }
})

module.exports=router