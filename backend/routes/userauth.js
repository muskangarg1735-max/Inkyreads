const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userToken");

//sign up functionality
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        //check username length is more than 3
        if(username.length < 4)
        {
            return res.status(400).json({ message: "username length should be more than 3" });
        }
        //check if username is already present 
        const existingUsername = await User.findOne({username: username});
        if(existingUsername)
        {
            return res.status(400).json({ message: "Username already exist" });

        }
        //check if email exists
        const existingEmail = await User.findOne({email: email});
        if(existingEmail)
        {
            return res.status(400).json({ message: "Email already exist" });

        }
//check if password length is more than 5
if(password.length <= 5)
{
    return res.status(400).json({ message: "password's length should be more than 5" });
}
const hashPass = await bcrypt.hash(password, 10); //10 times hashing the password
const newUser = new User({
    username: username,
    email: email,
    password: hashPass,
    address: address,
});
await newUser.save();// save in the database
return res.status(200).json({ message: "Signup successfully" });
        } catch (error) {
        res.status(500).json({ message: "internal server error in sign up " });
    }
});
//sign in functionality
router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username});
        if(!existingUser) {
              res.status(400).json({ message: "Invalid username or password" }); 
        }
        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if(data){
                const authClaims = [
                    { username: existingUser.username}, 
                    { role: existingUser.role},
                ];
                const token = jwt.sign({authClaims}, "bookstore123", {expiresIn: "30d"});
                res.status(200).json({ 
                    id: existingUser._id,
                    role: existingUser.role,
                    token: token,
                 });
             } else{
                    res.status(400).json({ message: "invalid credentials " });

                }
    });
        } catch (error) {
        res.status(500).json({ message: "internal server error in sign in " });
    }
});
//get user information  
router.get("/get-user-info", authenticateToken,  async(req,res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password"); //exclude paswd from the data
        return res.status(200).json(data);
        }catch (error) {
        res.status(500).json({ message: "internal server error in sign in " });
    }
});
//update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
         await User.findByIdAndUpdate(id, { address: address }, { new: true });
        return res.status(200).json({message:"Address updated successfully"});
    } catch (error) {
        res.status(500).json({ message: "internal server error in update address " });
    }
});
module.exports = router;