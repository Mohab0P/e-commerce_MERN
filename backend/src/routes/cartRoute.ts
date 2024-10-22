import express from 'express';
import { addItemToCart, checkoutCart, clearCart, getActiveCartForUser, removeItemFromCart, updataItemToCart } from '../services/cartService';
import {validateJWT} from '../middlewares/validateJWT';
import {ExtendedRequest} from "../middlewares/validateJWT";
import { router } from './userRoute';

export const cartRouter = express.Router();



cartRouter.get("/",
    validateJWT,
    async(req:ExtendedRequest,res)=>{
        try{

            const userId=req.user._id;
            const cart=await getActiveCartForUser({userId});
            res.status(200).send(cart);
        }catch(error){
            console.error("Error getting cart:",error);
            res.status(500).send("Internal Server Error");
        }

//get the cart items
})

cartRouter.delete("/",validateJWT,async(req:ExtendedRequest,res)=>{
    try{

        const userId=req.user._id;
        const response= await clearCart({userId});
        res.status(res.statusCode).send(response.data);
    }catch(error){
        console.error("Error clearing cart:",error);
        res.status(500).send("Internal Server Error");
    }
})

cartRouter.post("/items",validateJWT,async(req:ExtendedRequest,res)=>{
    try{
        const userId=req.user._id;
        const {productId,quantity}=req.body;
        const response=await addItemToCart({userId,productId,quantity});
        res.status(response.statusCode).send(response.data);

    }catch(error){
        console.error("Error adding item to cart:",error);
        res.status(500).send("Internal Server Error");
    }
});

cartRouter.put("/items",validateJWT,async(req:ExtendedRequest,res)=>{
    try{

        const userId=req.user._id;
        const {productId,quantity}=req.body;
        const response=await updataItemToCart({userId,productId,quantity});
        res.status(response.statusCode).send(response.data);
    }catch(error){
        console.error("Error updating item in cart:",error);
        res.status(500).send("Internal Server Error");
    }
})

cartRouter.delete("/items/:productId",validateJWT,async(req:ExtendedRequest,res)=>{
    try{

        const userId=req.user._id;
        const {productId}=req.params;
        const response=await removeItemFromCart({userId, productId: productId});
        res.status(response.statusCode).send(response.data);
    }catch(error){
        console.error("Error removing item from cart:",error);
        res.status(500).send("Internal Server Error");
    }
})


cartRouter.post("/checkout",validateJWT,async(req:ExtendedRequest,res)=>{
    try{

        const userId=req.user._id;
        const {address,paymentMethod}=req.body;
        const response=await checkoutCart({userId,address,paymentMethod});
        res.status(response.statusCode).send(response.data);
    }catch(error){
        console.error("Error checking out cart:",error);
        res.status(500).send("Internal Server Error");
    }
})