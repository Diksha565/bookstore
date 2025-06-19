import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";
import Stripe from 'stripe';

// Global variables for payment
const currency = "INR";
const deliveryCharge = 50;

// Initialize Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place order using Cash on Delivery
const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {}});
        res.json({success: true, message: "Order placed successfully!"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Place order using Stripe
const placeOrderStripe = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const {origin}=req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items=items.map((item)=>({
            price_data:{
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Convert to paise
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data:{
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100 // Convert to paise
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })
        res.json({success: true, session_url: session.url})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message}); 
    }
}

// Verify Stripe payment
const verifyStripe = async (req, res) => {
    const {success, orderId,userId} = req.body;    
   // const order = await orderModel.findById(orderId);
    try {
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, { cartData: {}});
            res.json({success: true});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Payment Failed"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// All orders data for admin
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// All orders data for user
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Updating order status for admin
const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message: "Status updated"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export {
    placeOrder,
    placeOrderStripe,
    verifyStripe,
    allOrders,
    userOrders,
    updateStatus,
};