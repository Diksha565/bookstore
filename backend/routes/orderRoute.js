import express from 'express';
import { allOrders, placeOrder, placeOrderStripe, updateStatus, userOrders, verifyStripe } from '../controllers/orderController.js';
import  adminAuth  from './../middleware/adminAuth.js';
import authUser from './../middleware/auth.js';

const orderRouter = express.Router();

// For Admin
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// For payment
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);

// Verify payment
orderRouter.post('/verifystripe', authUser, verifyStripe);

// For user
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;

