import User from "../models/user.js";

export const toggleFavBook=async (req,res)=>{
  try {
    const {bookId}=req.params;
    
    const {id}=req.user;
    const userData= await User.findById(id);
    const isBookFavourite=userData.favourites.includes(bookId)
    
    if (isBookFavourite) {
        // If book is already a favorite, remove it
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookId } });
        return res.status(200).json({ message: "Book removed from favourites" });
      } else {
        // If book is not a favorite, add it
        await User.findByIdAndUpdate(id, { $push: { favourites: bookId } });
        return res.status(200).json({ message: "Book added to favourites" });
      }
}catch (error) {
    res.status(500).json({message:"Internal server error"})
  }

}

export const getFavoriteBook=async (req,res)=>{
  try {
    const {id}=req.user;

    const userData= await User.findById(id).populate("favourites") // ref attribut favourites of user table with books
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
    const favouriteBook=userData.favourites;
    
  
    return res.status(200).json({Status:"Success",data:favouriteBook });
}catch (error) {
    res.status(500).json({message:"Internal server error in get favourite book",error})
  }

}

export const checkFavBook = async (req, res) => {
  try {
    const { id } = req.user;
    const { bookId } = req.params;

    const userData = await User.findById(id);

    const isFavourite = userData.favourites.includes(bookId);

    res.status(200).json({ isFavourite });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

