import Books from "../models/book.js"
import User from "../models/user.js";

export const addBook= async (req,res)=>{
    try {
        const {id}=req.user;
        const user=await User.findById(id)
        // console.log(user.username,user.role,id)
        if(user.role !=="admin"){
            return res.status(400).json({message:"You are not having access to perform admin work"})
        }
    
        const book=new Books({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        })
        await book.save();
        return res.status(200).json({bookId:book._id,message:"Book added successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server erro"})
    }
}


export const updateBook= async (req,res)=>{
    try {
        const {bookId}=req.params;
        // console.log(bookId)
        // const {id}=req.user;
        // // console.log(id)
        // const user=await User.findById(id)
        // if(user.role !=="admin"){
        //     return res.status(400).json({message:"You are not having access to perform admin work"})
        // }

        const book=await Books.findByIdAndUpdate(bookId,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        })
       
        return res.status(200).json({bookId:book._id,message:"Book updated successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

export const deleteBook= async (req,res)=>{
    try {
        const {bookId}=req.params;
        // console.log(bookId)
        const {id}=req.user;
        // console.log(id)
        // const user=await User.findById(id)
        // console.log(user.username,user.role,id)
        // if(user.role !=="admin"){
        //     return res.status(400).json({message:"You are not having access to perform admin work"})
        // }

      await Books.findByIdAndDelete(bookId)
       
        return res.status(200).json({message:"Book deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

export const getAllBook= async (req,res)=>{
    try {
       
      const books= await Books.find().sort({createdAt:-1})
       
    return res.json({status:"Success",data:books})
    } catch (error) {
        res.status(500).json({message:"Internal server error in getallbook",error:error})
    }
}

export const getRecentBook= async (req,res)=>{
    try {
       
      const books= await Books.find().sort({createdAt:-1}).limit(4)
       
    return res.json({status:"Success",data:books})
    } catch (error) {
        res.status(500).json({message:"Internal server error in getallbook",error:error})
    }
}

export const getBookById= async (req,res)=>{
    try {
       const {bookId}=req.params;
      const book= await Books.findById(bookId)
       
    return res.json({status:"Success",data:book})
    } catch (error) {
        res.status(500).json({message:"Internal server error in getallbook",error:error})
    }
}