import mongoose,{Schema,Document, ObjectId} from "mongoose";


export interface IorderItem  {
    productName:string;
    productImage:string;
    productPrice:number;
    quantity:number;
}

export interface IOrder extends Document {
    orderItems:IorderItem[];
    total:number;
    address:string;
    userId: ObjectId | string;
    paymentMethod:string;
}

const orderItemSchema=new Schema<IorderItem>({
    productName:{type:String,required:true},
    productImage:{type:String,required:true},
    productPrice:{type:Number,required:true},
    quantity:{type:Number,required:true}
}) 

const OrderSchema=new Schema<IOrder>({
    orderItems:[orderItemSchema],
    total:{type:Number,required:true},
    address:{type:String,required:true},
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    paymentMethod:{type:String,required:true}
})

export const orderModel=mongoose.model<IOrder>('Order',OrderSchema);