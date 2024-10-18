const user = require('../Models/userSchema')
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {
    const {username, password} = req.body;
    const  existingUser = await user.findOne({username:username});
    if(!existingUser){
        return res.status(404).json("user not found");
    }
    const isMatch = await existingUser.comparePassword(password);
    if(!isMatch){
        return res.status(400).json("invalid password");
    }
    const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET);
    res.status(200).json({token:token, userDetails:{
        _id: existingUser._id,
        username: existingUser.username,
        permissions: existingUser.permissions
    }});
}