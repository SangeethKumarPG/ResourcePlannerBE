const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cutomers",
        required: true
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orders",
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
    status:{
        type:String,
        default:"open"
    },
   createdDate:{
       type:String,
    },
    resolutionDate:{
        type:String
    },
    resolvedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    comments:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
            },
            comment:{
                type:String
            },
            addedDate:{
                type:String
            }
        }
    ]  
})

const supportTickets = mongoose.model('supportTicket', supportTicketSchema);

module.exports = supportTickets;