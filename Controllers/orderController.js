const orders = require('../Models/orderSchema');
const users = require('../Models/userSchema');

exports.addOrder = async (req, res)=>{
    try{
        const userId = req.payload;
        const currentUser = await users.findOne({_id:userId});
        if(currentUser.permissions.orders.write === true){
            const order = new orders(req.body);
            const savedOrder = await order.save();
            res.status(201).json(savedOrder);
        }else{
            console.log("User not authorized to add order");
            res.status(401).json("User not authorized to add order");
        }
    }catch(error){
        console.log(error);
        res.status(500).json("Internal server error");
    }
}

exports.fetchAllOrders = async (req,res)=>{
    try{
        const userId = req.payload;
        const currentUser = await users.findOne({_id:userId});
        if(currentUser.permissions.orders.read === true){
            const ordersList = await orders.find();
            res.status(200).json(ordersList);
        }else{
            console.log("User not authorized to fetch orders");
            res.status(401).json("User not authorized to fetch orders");
        }
    }catch(error){
        console.log(error);
        res.status(500).json("Internal server error");
    }
}