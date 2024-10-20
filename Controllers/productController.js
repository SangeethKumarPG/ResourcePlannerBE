const users = require('../Models/userSchema');
const products = require('../Models/productsSchema');

exports.addProduct = async (req,res)=>{
    const userId = req.payload;
    const currentUser = await users.findOne({_id:userId});
    if(currentUser.permissions.productsAndServices.write === true){
        const product = req.body;
        console.log(product);
        const newProduct = new products(product);
        await newProduct.save();
        console.log(newProduct._id);
        res.status(200).json(newProduct);
    }else{
        res.status(401).json("You are not permitted to write into the products");
    }
}

exports.getAllProducts = async(req,res)=>{
    const userId = req.payload;
    const currentUser = await users.findOne({_id:userId});
    if(currentUser.permissions.productsAndServices.read === true){
       const allProducts = await products.find();
       res.status(200).json(allProducts); 
    }else{
        res.status(401).json("You are not permitted to read products")
    }
}