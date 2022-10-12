
const Product = require('../models/product.model');

exports.getAllProducts = async (req,res)=>{
    try{
        const allProducts = await Product.find();
        return res.status(200).send(allProducts);
        }catch(err){
            console.log("Error while fetching Products", err.message);
            return res.status(500).send({
                message : "Some error occurred while fetching Products"
            })
        }

}

exports.getProductCategories = async (req,res)=>{
    try{
        const listOfCategories = await Product.distinct("category");
        return res.status(200).send(listOfCategories);
        }catch(err){
            console.log("Error while fetching Product categories", err.message);
            return res.status(500).send({
                message : "Some error occurred while fetching Categories"
            })
        }
}

exports.getProductById = async (req,res)=>{
    try{
    const idObj = req.params.id;
    const productObj =await Product.findById(idObj);
    if(!productObj){
        return  res.status(404).send({
            message : `No Product found for ID - ${idObj}!`
        })
    }}catch(err){
        console.log("Error while fetching Product details", err.message);
        return res.status(500).send({
            message : "Some error occurred while fetching Product"
        })
    }

}

exports.createProduct = async (req,res)=>{
    try{
    const productObj = {
        name : req.body.name,
        price : req.body.price,
        availableItems : req.body.availableItems,
        category : req.body.category,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        manufacturer : req.body.manufacturer
    }

    const prod = await Product.create(productObj);

    return res.status(201).send(prod);
    }catch(err){
        console.log("Error while creating Product", err.message);
        return res.status(500).send({
            message : "Some error occurred while creating Product"
        })
    }
}

exports.updateProduct = async (req,res)=>{
    const prodId = req.params.id;
    // console.log(req.params);

    const prodObj = await Product.findOne({_id:prodId});

    if(!prodObj){
        return res.status(404).send({
            message : `No Product found for ID - ${prodId}!`
        })
    }

    const newObj = {
        name : req.body.name,
        price : req.body.price,
        availableItems : req.body.availableItems,
        category : req.body.category,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        manufacturer : req.body.manufacturer
    }

    const filter = {_id : prodId};

    const updatedObj = await Product.findOneAndUpdate(filter,newObj,{new:true});
    // const updatedObj1 = await updatedObj.save();

    return res.status(200).send(updatedObj);
}

exports.deleteObject = async (req,res)=>{

    const idObj = req.params.id;

    const objToDelete = await Product.findOneAndDelete({_id : idObj});

    if(!objToDelete){
        return res.status(404).send({
            message : `No Product found for ID - ${idObj}!`
        })
    }

    return res.status(200).send({
        message : `Product with ID - ${idObj} deleted successfully!`
    })


}