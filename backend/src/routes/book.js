import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {addBook, deleteBook, getAllBook, getBookById, getRecentBook, updateBook} from "../controllers/book.controller.js"

const router=express.Router();

router.post("/addBook",protectRoute,addBook)
router.put("/updateBook/:bookId",protectRoute,updateBook)
router.delete("/deleteBook/:bookId",protectRoute,deleteBook)
router.get("/getallbook",getAllBook)
router.get("/getrecentbook",getRecentBook)
router.get("/getbookbyid/:bookId",getBookById)

export default router;