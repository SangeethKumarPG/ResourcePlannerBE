const mongoose = require('mongoose');
const users = require('../Models/userSchema');
const mailer = require('./mailer');

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

const generatePassword = ()=>{
    const length= 12;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for(i=0; i<length; i++){
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

exports.addAgent = async (req, res)=>{
    const userId = req.payload;
    const currentUser = await users.findOne({_id:userId});
    if(currentUser.permissions.supportTickets === true){
        try{
            if(currentUser.username === req.body.username){
                return res.status(400).json("Username already exists");
            }
            const password = generatePassword();
            const agent = new users({
                username: req.body.username,
                password: password,
                email: req.body.email,
                permissions:req.body.permissions,
                contactNumber:String(req.body.contactNumber)
            });
            const createdAgent = await agent.save();
            await mailer.sendEmail(createdAgent.email, "Welcome to Resource Planner", "Your username is : " + createdAgent.username + " Your password is: " + password);
            res.status(201).json(createdAgent);
        }catch(error){
            console.log(error);
            res.status(500).json("Internal Server Error" );
        }

    }else{
        return res.status(401).json( "You are not authorized to access this resource.");
    }
}