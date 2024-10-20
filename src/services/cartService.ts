import { cartModel } from "../models/cartMode";

interface IcreateCartForUser{
    userId:string;
}

const createCartForUser=async({userId}:IcreateCartForUser)=>{
const cart=await cartModel.create({userId,totalAmount:0});
await cart.save();
return cart;
}

interface IgetActiveCartForUser{
    userId:string;
}

export const getActiveCartForUser=async({userId}:IgetActiveCartForUser)=>{
    let cart=await cartModel.findOne({userId,status:"active"});
    if(!cart){
        cart=await createCartForUser({userId});
    }
    return cart;
}