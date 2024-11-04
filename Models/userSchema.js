const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,

    },
    email:{
        type:String
    },
    contactNumber:{
        type:String
    },
    permissions:{
        orders:{
            read:{type:Boolean, default:false},
            write:{type:Boolean, default:false},
            delete:{type:Boolean, default:false}
        },
        customers:{
            read:{type:Boolean, default:false},
            write:{type:Boolean, default:false},
            delete:{type:Boolean, default:false}
        },
        productsAndServices:{
            read:{type:Boolean, default:false},
            write:{type:Boolean, default:false},
            delete:{type:Boolean, default:false}
        },
        supportTickets:{
            type:Boolean,
            default:false
        }
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();  
    }
    try {
        const hash = await argon2.hash(this.password);
        this.password = hash;
        next();
    } catch (error) {
        console.log(error);
        return next(error);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        return await argon2.verify(this.password, candidatePassword);
    }catch(error){
        throw new Error(error);
    }
}
const users = mongoose.model('users',userSchema);

module.exports = users;