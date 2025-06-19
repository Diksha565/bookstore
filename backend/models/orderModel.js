import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    items:{type:Array, required:true},
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    status:{type:String, required:true, default:"Order Placed"},
    date:{type:Date, required:true},
    payment:{type:Boolean, required:true,default:false},
    paymentMethod:{type:String, required:true},
});


const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
// This code defines a Mongoose schema for an order model in a MongoDB database.