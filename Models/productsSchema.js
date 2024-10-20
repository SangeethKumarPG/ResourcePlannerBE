const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    serviceName:{
        type: String,
        required: true
    },
    domain:{
        type: String,
        required:true
    },
    sslCert:{
        type: Boolean,
        required:true
    },
    website:{
        type:Boolean,
        required:true
    },
    server:{
        type:Boolean,
        required:true
    },
    emailServer:{
        type:Boolean,
        required:true
    },
    sslCertProvider:{
        type:String,
        required:false
    },
    websiteHostProvider:{
        type:String,
        required:false
    },
    serverProvider:{
        type:String,
        required:false
    },
    serverCapacity:{
        type:String,
        required:false
    },
    emailProvider:{
        type:String,
        require:false
    },
    numberOfUsers:{
        type:Number,
        required:false
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const products = mongoose.model('products', productsSchema);

module.exports = products;