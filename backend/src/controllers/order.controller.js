import Order from "../models/order.js";
import User from "../models/user.js";

export const orderBook=async (req,res)=>{
  try {
    const {id}=req.user;
    const {order}=req.body;
    console.log(order)

    for(const orderData of order){
        const newOrder=new Order({user:id,book:orderData._id})
        const orderDataFromDB=await newOrder.save();

        //saving order in user model
        await User.findByIdAndUpdate(id,{$push:{orders:orderDataFromDB._id}})

        //clearing cart
        await User.findByIdAndUpdate(id,{$pull:{cart:orderData._id}})
    }

    
    return res.status(200).json({status:"Success", message: "Order placed successfully." });
      
}catch (error) {
    res.status(500).json({message:"Internal server error"})
  }

}

//for only user who see the order history
export const getOrderHistory=async (req,res)=>{
  try {
    const {id}=req.user;
    const userData=await User.findById(id).populate({
      path:"orders",
      populate:{
        path:"book"
      }
    })
    
    const ordersData=userData.orders.reverse();
    return res.json({status:"Success",data:ordersData });
      
}catch (error) {
  // console.log(error)
    res.status(500).json({message:"Internal server error"})
  }

}


export const getAllOrderHistory=async (req,res)=>{
  try {
    const {id}=req.user;
    
    const userData=await Order.find().populate({
      path:"book",
    }).populate({
      path:"user"
    }).sort({createdAt:-1});
    
    return res.json({status:"Success",data:userData });
      
}catch (error) {
    res.status(500).json({message:"Internal server error"})
  }

}

export const updateStatus=async (req,res)=>{
  try {
    const {orderId}=req.params;
    await Order.findByIdAndUpdate(orderId,{
      status:req.body.status
    })
    
    return res.json({status:"Success",message:"Status updated successfully." });
      
}catch (error) {
    res.status(500).json({message:"Internal server error"})
  }

}