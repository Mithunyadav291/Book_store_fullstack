import express from "express";
import {  checkCartBook, getCartBook, toggleCartBook } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router=express.Router()

router.put("/addtocart/:bookId",protectRoute,toggleCartBook)
router.get("/checkCart/:bookId",protectRoute,checkCartBook)
router.get("/getcartbook",protectRoute,getCartBook)

export default  router;