import express from 'express';
import { addItemToCart, checkoutCart, clearCart, getActiveCartForUser, removeItemFromCart, updataItemToCart } from '../services/cartService';
import {validateJWT} from '../middlewares/validateJWT';
import {ExtendedRequest} from "../middlewares/validateJWT";
import { router } from './userRoute';

export const cartRouter = express.Router();



cartRouter.get("/",
    validateJWT,
    async(req:ExtendedRequest,res)=>{
//get the cart items
const userId=req.user._id;
const cart=await getActiveCartForUser({userId});
res.status(200).send(cart);
})

cartRouter.delete("/",validateJWT,async(req:ExtendedRequest,res)=>{
    const userId=req.user._id;
    const response= await clearCart({userId});
    res.status(res.statusCode).send(response.data);
})

cartRouter.post("/items",validateJWT,async(req:ExtendedRequest,res)=>{
const userId=req.user._id;
const {productId,quantity}=req.body;
const response=await addItemToCart({userId,productId,quantity});
res.status(response.statusCode).send(response.data);
});

cartRouter.put("/items",validateJWT,async(req:ExtendedRequest,res)=>{
const userId=req.user._id;
const {productId,quantity}=req.body;
const response=await updataItemToCart({userId,productId,quantity});
res.status(response.statusCode).send(response.data);
})

cartRouter.delete("/items/:productId",validateJWT,async(req:ExtendedRequest,res)=>{
const userId=req.user._id;
const {productId}=req.params;
const response=await removeItemFromCart({userId, productId: productId});
res.status(response.statusCode).send(response.data);
})


cartRouter.post("/checkout",validateJWT,async(req:ExtendedRequest,res)=>{
const userId=req.user._id;
const {address,paymentMethod}=req.body;
const response=await checkoutCart({userId,address,paymentMethod});
res.status(response.statusCode).send(response.data);
})