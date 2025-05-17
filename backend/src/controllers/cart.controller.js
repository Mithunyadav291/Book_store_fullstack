import User from "../models/user.js";

export const toggleCartBook=async (req,res)=>{
    try {
        const {bookId}=req.params;
        const {id}=req.user;
    
        const userData= await User.findById(id);
        const isBookInCart=userData.cart.includes(bookId)
        
        if (isBookInCart) {
            // If book is already in a cart, remove it
            await User.findByIdAndUpdate(id, { $pull: { cart: bookId } });
            return res.status(200).json({status:"Success", message: "Book removed from cart" });
          } else {
            // If book is not in a cart, add it
            await User.findByIdAndUpdate(id, { $push: { cart: bookId } });
            return res.status(200).json({status:"Success", message: "Book added to cart" });
          }
    }catch (error) {
        res.status(500).json({message:"Internal server error"})
      }
}


export const getCartBook=async (req,res)=>{
    try {
      const {id}=req.user;
  
      const userData= await User.findById(id).populate("cart") // ref attribut cart of user table with books
      if (!userData) {
          return res.status(404).json({ message: "User not found" });
        }
      const cart=userData.cart.reverse();
      
    
      return res.status(200).json({Status:"Success",data:cart });
  }catch (error) {
      res.status(500).json({message:"Internal server error",error})
    }

  }

  
  export const checkCartBook = async (req, res) => {
    try {
      const { id } = req.user;
      const { bookId } = req.params;
  
      const userData = await User.findById(id);
  
      const isCart = userData.cart.includes(bookId);
  
      res.status(200).json({ isCart });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  