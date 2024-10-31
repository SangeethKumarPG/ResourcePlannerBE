const mongoose = require('mongoose');
const users = require('../Models/userSchema');


exports.fetchAllAgents = async (req, res)=>{
    try {
        const userId = req.payload;
        const currentUser = await users.findOne({_id:userId});
        if(currentUser.permissions.supportTickets === true){
            const allAgents = await users.find();
            res.status(200).json(allAgents);
        }else{
            res.status(401).json( "You are not authorized to access this resource.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
  
}