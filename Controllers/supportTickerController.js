const supportTicket = require('../Models/supportTicketSchema');
const users = require('../Models/userSchema');
const dayjs = require('dayjs');

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

exports.changeTicketStatus = async (req,res)=>{
    const userId = req.payload;
    const currentUser = await users.findOne({_id:userId});
    if(currentUser.permissions.supportTickets === true){
        try {
          const ticket = await supportTicket.findOne({_id:req.params.id});
          if(ticket){
            ticket.status = req.body.status;
            if(ticket.status === "closed"){
                ticket.resolutionDate = dayjs().format("DD/MM/YYYY HH:mm:ss");
                ticket.resolvedBy = userId;
            }
            const updatedTicket = await ticket.save();
            res.status(200).json(updatedTicket);
          }else{
            res.status(404).json("Ticket Not Found")
          }
        }catch(error){
            console.log(error);
        }
    }else{
        res.status(401).json("Unauthorized Access")
    }
} 

exports.assignToAgent = async (req,res)=>{
    const userId = req.payload;
    const currentUser = await users.findOne({_id:userId});
    if(currentUser.permissions.supportTickets === true){
        try {
            const ticket = await supportTicket.findOne({_id:req.params.id});
            if(ticket){
                try{
                    ticket.assignedTo = req.body.agentId;
                    const updatedTicket = await ticket.save();
                    res.status(200).json(updatedTicket);
                }catch(error){
                    console.log(error);
                    res.status(400).json("Unable to update agent details")
                }
            }else{
                res.status(404).json("Ticket Not Found");
            }
        }catch(error){
            res.status(500).json("Internal Server Error")
        }

    }else{
        res.status(401).json("Unauthorized Access")
    }
}

exports.deleteTicket = async (req,res)=>{
    const userId = req.payload;
    const currentUser = await users.findOne({_id:userId});
    if(currentUser.permissions.supportTickets === true){
        try{
            const ticket = await supportTicket.findOne({_id:req.params.id});
            if(ticket){
                await supportTicket.deleteOne({_id:req.params.id});
                res.status(200).json(ticket)
            }else{
                res.status(404).json("Ticket Not Found")
            }
        }catch(error){
            console.log(error);
            res.status(500).json("Internal Server Error")
        }
    }else{
        res.status(401).json("Unauthorized Access")
    }
}