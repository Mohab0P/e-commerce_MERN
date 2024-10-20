import express from 'express';
import { getActiveCartForUser } from '../services/cartService';
import {validateJWT} from '../middlewares/validateJWT';
import {ExtendedRequest} from "../middlewares/validateJWT";

export const cartRouter = express.Router();



cartRouter.get("/",
    validateJWT,
    async(req:ExtendedRequest,res)=>{
//get the cart items
const userId=req.user._id;
const cart=await getActiveCartForUser({userId});
res.status(200).send(cart);
})