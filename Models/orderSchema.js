const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    domainName:{
        type: String,
        required: true
    },
    duration:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    expiryDate:{
        type:String,
        required:true
    },
    plan:{
        type:String,
        required:true
    },
    planName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    thirdPartyDomain:{
        type:Boolean,
        default:false
    },
    emailServer:{
        type:Boolean,
        
    },
    sslCert:{
        type:Boolean,
    },
    website:{
        type:Boolean
    },
    server:{
        type:Boolean
    },
    paymentStatus:{
        type:String,
        default:"pending"
    },
    paymentDate:{
        type:String
    },
    paymentResponse:{
        type:String
    }
},{
    timestamps: true
})

const orders = mongoose.model('orders', orderSchema);
module.exports = orders;