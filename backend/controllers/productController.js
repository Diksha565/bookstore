import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

// Controller function to create product
const createProduct = async (req,res)=>{
    try {
        const {name, description, price, category, popular} = req.body;
        let imageUrl="https://via.placeholder.com/150"; // default image URL

        // only upload the image if one is provided
        if(req.file){
            console.log("Uploaded File:",req.file);
            imageUrl = await cloudinary.uploader.upload(req.file.path, {resource_type:"image"}).then(res => res.secure_url)
        }
        const productData = {
            name,
            description,
            category,
            price:Number(price),
            image:imageUrl,
            popular:popular === 'true'?true:false,
            date:Date.now()
        }
        console.log("Product Data:",productData);
        const product = new productModel(productData);
        await product.save();
        res.json({success:true, message:"Product Created"});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// controller function to delete a product
const deleteProduct = async (req,res)=>{
    try {
        
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Product Deleted Successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// controller function to list all products
const getAllProduct = async (req,res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true, products});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// controller function to fetch a single product's details
const getProductById = async (req,res)=>{
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true, product});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export { createProduct, deleteProduct, getAllProduct, getProductById };