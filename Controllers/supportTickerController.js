const supportTicket = require('../Models/supportTicketSchema');
const users = require('../Models/userSchema');

exports.createSupportTicket = async (req,res)=>{
    const userId = req.payload;
    const currentUser = await users.findOne({_id:userId});
    if(currentUser.permissions.supportTickets === true){
        try {
            const newTicket = new supportTicket({
                title:req.body.title,
                description:req.body.description,
                order:req.body.order,
                createdFor:req.body.createdFor,
                createdBy: userId,
                createdDate: req.body.createdDate
            });
            const savedTicket = await newTicket.save();
            res.status(201).json(savedTicket);
        } catch (error) {
            console.log(error);
            res.status(500).json("Internal Server Error")
        }
    }else{
        res.status(401).json("Unauthorized Access")
    }
}

exports.fetchSupportTickets = async( req,res)=>{
    const userId = req.payload;
    const currentUser = await users.findOne({_id:userId});
    if(currentUser.permissions.supportTickets === true){
        try {
            const tickets = await supportTicket.find();
            res.status(200).json(tickets);
        } catch (error) {
            console.log(error);
            res.status(500).json("Internal Server Error")
        }
    }else{
        res.status(401).json("Unauthorized Access")
    }

}

exports.addCommentToTicket = async(req,res)=>{
    const userId = req.payload;
    const currentUser = await users.findOne({_id:userId});
    if(currentUser.permissions.supportTickets === true){
        try {
            const ticket = await supportTicket.findOne({_id:req.params.id});
            if(ticket){
                // console.log(ticket);
                ticket.comments.push({
                    comment:req.body.comment,
                    userId:userId,
                    addedDate:req.body.addedDate
                });
                const updatedTicket = await ticket.save();
                res.status(201).json(updatedTicket);
            }else{
                res.status(404).json("Ticket Not Found")
            }
        } catch (error) {
            console.log(error);
            res.status(500).json("Internal Server Error")
        }
    }else{
        res.status(401).json("Unauthorized Access")
    }
}