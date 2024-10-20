import express from 'express';
import { addItemToCart, getActiveCartForUser } from '../services/cartService';
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

router.post("/items",validateJWT,async(req:ExtendedRequest,res)=>{
const userId=req.user._id;
const {productId,quantity}=req.body;
const response=await addItemToCart({userId,productId,quantity});
res.status(response.statusCode).send(response.data);
});