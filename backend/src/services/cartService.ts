import { cartModel } from "../models/cartMode";
import { productModel } from "../models/productModels";
import { Icurt } from "../models/cartMode";
import { IcartItem } from "../models/cartMode";
import { IorderItem, orderModel } from "../models/orderModel";
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
interface IaddItemToCart{
    userId:string;
    productId:any;
    quantity:string;
}

export const addItemToCart=async({userId,productId,quantity}:IaddItemToCart)=>{
    const cart=await getActiveCartForUser({userId});
    const existInCart=cart.items.find((p)=>p.product.toString()===productId);
    if(existInCart){
        return {data:"Item already in cart",statusCode:400};
    }
    const product=await productModel.findById(productId);

    if(!product){
        return {data:"Product not found",statusCode:404};
    }
    if(product.countInStock < parseInt(quantity)){
        return {data:"Product out of stock",statusCode:400};
    }
    cart.items.push({product:productId ,quantity:parseInt(quantity),unitPrice:product.price});
    cart.totalAmount+=parseInt(quantity)*product.price;
    const updatedCar=await cart.save();
    return {data:updatedCar,statusCode:200};
}

interface IupdataItemToCart{
    userId:string;
    productId:any;
    quantity:string;
}

export const updataItemToCart=async({userId,productId,quantity}:IupdataItemToCart)=>{
    const cart=await getActiveCartForUser({userId});
    const existInCart=cart.items.find((p)=>p.product.toString()===productId);
    if(!existInCart){
        return {data:"Item does not exsit in cart",statusCode:400};
    }
    const product=await productModel.findById(productId);
    
    if(!product){
        return {data:"Product not found",statusCode:404};
    }
    if(product.countInStock < parseInt(quantity)){
        return {data:"Product out of stock",statusCode:400};
    }
    existInCart.quantity=parseInt(quantity); 
    const otherCartItems=cart.items.filter((p)=>p.product.toString()!==productId);
    let total=otherCartItems.reduce((acc,product)=>{
        acc+=product.unitPrice*product.quantity;
        return acc;
    },0)
    total+=existInCart.unitPrice*existInCart.quantity;
    cart.totalAmount=total;
    const updatedCart=await cart.save();
    return {data:updatedCart,statusCode:200};
    
};
interface IclearCart{
    userId:string;
}
export const clearCart=async({userId}:IclearCart)=>{
    const cart=await getActiveCartForUser({userId});
    cart.items=[];
    cart.totalAmount=0;
    const updatedCart=await cart.save();
    return {data:updatedCart,statusCode:200};
}

interface removeItemFromCart{
    userId:string;
    productId:any;
}
export const removeItemFromCart=async({userId,productId}:removeItemFromCart)=>{
    const cart=await getActiveCartForUser({userId});
    const existInCart=cart.items.find((p)=>p.product.toString()===productId);
    if(!existInCart){
        return {data:"Item does not exsit in cart",statusCode:400};
    }
    const otherCartItems=cart.items.filter((p)=>p.product.toString()!==productId);
    const total=otherCartItems.reduce((acc,product)=>{
        acc+=product.unitPrice*product.quantity;
        return acc;
    },0)
    cart.totalAmount=total;
    const updatedCart=await cart.save();
    return {data:updatedCart,statusCode:200};

}
interface IcheckoutCart{
    userId:string;
    address:string;
    paymentMethod:string;
}
export const checkoutCart=async({userId,address,paymentMethod}:IcheckoutCart)=>{
    if(!address){
        return {data:"Address is required",statusCode:400};
    }
    if(!paymentMethod){
        return {data:"Payment method is required",statusCode:400};
    }

const cart=await getActiveCartForUser({userId});
const orderItems: IorderItem[]=[];
// loop cartItems and create orderItems
for(const item of cart.items){
const product=await productModel.findById(item.product);
if(!product){
    return {data:"Product not found",statusCode:404};
}

const orderItem:IorderItem={
    productName:product.name,
    productImage:product.image,
    productPrice:product.price,
    quantity:item.quantity
}
orderItems.push(orderItem);
}
// create order
const order=await orderModel.create({
    orderItems,
    total:cart.totalAmount,
    address,
    userId,
    paymentMethod
})
await order.save();
//Update cart status to completed
cart.status="completed";
await cart.save();
return {data:order,statusCode:200};
}



const caluateTotalAmount=({cartItems}:{cartItems:IcartItem[]})=>{
    const total=cartItems.reduce((acc,product)=>{
        acc+=product.unitPrice*product.quantity;
        return acc;
    },0)
    return total;
}
