const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],  
    },
    address: {
        type: String,
        required: true,
        maxlength: 200,  
    },
    phone: {
        type: String,
        required: true,
        maxlength: 20,  
        match: [/^\+\d{1,3}(\s?\d+){1,20}$/, "Please fill a valid phone number (max 14 characters)"],
    },
    plan: {
        type: String,
    },
    planName:{
        type:String
    },
    domainName:{
        type:String
    }
}, { 
    timestamps: true 
});

const customers = mongoose.model("customers", customerSchema);

module.exports = customers;
