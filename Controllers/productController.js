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

exports.editProduct = async(req,res)=>{
    const userId = req.payload;
    const currentUser = await users.findOne({_id:userId});
    if(currentUser.permissions.productsAndServices.write === true){
        try{
            const productId = req.params.id;
            const updatedProduct = await products.findByIdAndUpdate({_id:productId},req.body,{new:true});
            await updatedProduct.save();
            res.status(200).json(updatedProduct);
        }catch(err){
            console.log(err);
            res.status(500).json("Internal Server Error");
        }
    }else{
        res.status(401).json("You are not permitted to write into the products");
    }
}

exports.deleteProduct = async(req,res)=>{
    const userId = req.payload;
    const currentUser = await users.findOne({_id:userId});
    if(currentUser.permissions.productsAndServices.delete === true){
        try{
            const productId = req.params.id;
            const deletedProduct = await products.findByIdAndDelete({_id:productId});
            res.status(200).json(deletedProduct);
        }catch(err){
            console.log(err);
            res.status(500).json("Internal Server Error");
        }
    }else{
        res.status(401).json("You are not permitted to delete products");
    }
}