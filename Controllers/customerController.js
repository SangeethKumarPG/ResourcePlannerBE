const users = require('../Models/userSchema');
const customers = require('../Models/customersSchema')
exports.createCustomer =  async (req,res)=>{
    try {
        const userId = req.payload;
        const currentUser = await users.findOne({_id:userId});
        if(currentUser.permissions.customers.write === true){
            const newCustomer = new customers(req.body);
            await newCustomer.save();
            res.status(200).json(newCustomer);
        }else{
            res.status(401).json("You are not authorized to perform this action.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}

exports.fetchCustomers = async (req,res)=>{
    try{
        const userId = req.payload;
        const currentUser = await users.findOne({_id:userId});
        if(currentUser.permissions.customers.read === true){
            const customersList = await customers.find();
            res.status(200).json(customersList);
        }else{
            res.status(401).json("You are not authorized to perform this action.");
        }

    }catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}

exports.editCustomer = async (req, res)=>{
    try{
        const userId = req.payload;
        const currentUser = await users.findOne({_id:userId});
        if(currentUser.permissions.customers.write === true){
            const customerId = req.params.id;
            const customer = await customers.findOne({_id:customerId});
            if(customer){
                const updatedCustomer = await customers.findByIdAndUpdate(customerId, req.body, {new:true});
                res.status(200).json(updatedCustomer);
            }else{
                res.status(404).json("Customer not found");
            }
        }else{
            res.status(401).json("You are not authorized to perform this action.");
        }
    }catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}

exports.deleteCustomer = async (req, res)=>{
    try{
        const userId = req.payload;
        const currentUser = await users.findOne({_id:userId});
        if(currentUser.permissions.customers.delete === true){
            const customerId = req.params.id;
            const customer = await customers.findOne({_id:customerId});
            if(customer){
                await customers.findByIdAndDelete(customerId);
                res.status(200).json("Customer deleted successfully");
            }else{
                res.status(404).json("Customer not found");
            }
        }else{
            res.status(401).json("You are not authorized to perform this action.");
        }
    }catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}