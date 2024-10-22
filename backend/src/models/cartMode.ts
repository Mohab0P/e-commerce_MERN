import mongoose,{Schema,Document, ObjectId} from "mongoose";
import { Iproduct } from "./productModels";

const CartStatusEnum=["active","completed"];

export interface IcartItem  {
    product:Iproduct;
    quantity:number;
    unitPrice:number;
}

export interface Icurt extends Document {
    userId:ObjectId |string;
    items:IcartItem[];
    totalAmount:number;
    status:"active"|"completed"
}

const cartItemSchema=new Schema<IcartItem>({
    product:{type:Schema.Types.ObjectId,ref:"Product",required:true},
    quantity:{type:Number,required:true,default:1},
    unitPrice:{type:Number,required:true}
})

const cartSchema=new Schema<Icurt>({
    userId:{type:Schema.Types.ObjectId,ref:"User" ,required:true},
    items:[cartItemSchema],
    totalAmount:{type:Number,required:true,default:1},
    status:{type:String,required:true,enum:CartStatusEnum,default:"active"}
})

export const cartModel=mongoose.model<Icurt>('Cart',cartSchema);