const orders = require("../Models/orderSchema");
const users = require("../Models/userSchema");
const archive = require("../Models/archiveSchema");
const customers = require('../Models/customersSchema')
const mailer = require('./mailer')
const dayjs = require('dayjs')


exports.addOrder = async (req, res) => {
  try {
    const userId = req.payload;
    const currentUser = await users.findOne({ _id: userId });
    if (currentUser.permissions.orders.write === true) {
      const order = new orders(req.body);
      const savedOrder = await order.save();
      const existingUser = await customers.findOne({_id:savedOrder.userId});
      const customerDetails = {
        customer_name :existingUser.username,
        customer_email : existingUser.email,
        customer_phone: existingUser.phone  
      }
      res.status(201).json(savedOrder);
      mailer.sendEmail(customerDetails.customer_email,
        "New Order Placed",
        `Dear ${customerDetails.customer_name},\n\nYour order has been placed successfully.
        \n kindly make payment by clicking the below link:\n
        ${process.env.FE_URL}/payment/${savedOrder._id} \n
        \n\nThank you for choosing us.\n\nBest regards,\nResource Planner Team`
      )
    } else {
      console.log("User not authorized to add order");
      res.status(401).json("User not authorized to add order");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

exports.fetchAllOrders = async (req, res) => {
  try {
    const userId = req.payload;
    const currentUser = await users.findOne({ _id: userId });
    if (currentUser.permissions.orders.read === true) {
      const ordersList = await orders.find();
      res.status(200).json(ordersList);
    } else {
      console.log("User not authorized to fetch orders");
      res.status(401).json("User not authorized to fetch orders");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

exports.renewOrder = async (req, res) => {
  try {
    const userId = req.payload;
    const currentUser = await users.findOne({ _id: userId });
    if (currentUser.permissions.orders.write === true) {
      const currentOrder = await orders.findOne({ _id: req.params.id });
      if (currentOrder) {
        const archivedOrder = new archive({...currentOrder.toObject()});
        await archivedOrder.save();
        const updatedOrder = await orders.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.status(200).json(updatedOrder);
      } else {
        res.status(404).json("Order not found");
      }
    } else {
      res.status(404).json("User not authorized to renew order");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

exports.deleteOrder = async (req, res) => {
    try{
        const userId = req.payload;
        const currentUser = await users.findOne({ _id: userId });
        if (currentUser.permissions.orders.delete === true) {
            const currentOrder = await orders.findOne({ _id: req.params.id });
            const copyOfCurrentOrder = {...currentOrder.toObject()};
            if(currentOrder){
                const archivedOrder = new archive({...currentOrder.toObject()});
                await archivedOrder.save();
                await orders.findByIdAndDelete(req.params.id);
                res.status(200).json(copyOfCurrentOrder);
            }else{
                res.status(404).json("Order not found");
            }
        }else{
            res.status(403).json("User not authorized to delete order");
        }
    }catch(error){
        console.log(error);
        res.status(500).json("Internal server error");
    }
}

exports.fetchOrderById = async (req, res) => {
  try{
    const orderId = req.params.id;
    const currentOrder = await orders.findOne({ _id: orderId });
    if(currentOrder){
        res.status(200).json(currentOrder);
    }else{
        res.status(404).json("Order not found");
    }
  }catch(error){
    console.log(error);
    res.status(500).json("Internal server error");
  }
}

exports.changePaymentStatus = async (req, res) => {
  try{
    const orderId = req.params.id;
    const currentOrder = await orders.findOne({ _id: orderId });
    let updatedOrder = {};
    if(currentOrder){
        if(req.body.paymentStatus === "paid"){
          console.log("Making payment")
          paymentDate = dayjs().toISOString();
          console.log(paymentDate)
          updatedOrder = await orders.findByIdAndUpdate(orderId, {paymentStatus: req.body.paymentStatus, paymentDate:paymentDate}, { new: true });
        }else{
          updatedOrder = await orders.findByIdAndUpdate(orderId, {paymentStatus: req.body.paymentStatus}, { new: true });
        }
        res.status(200).json(updatedOrder);
    }else{
        res.status(404).json("Order not found");
    }
  }catch(error){
    console.log(error);
    res.status(500).json("Internal server error");
  }
}

