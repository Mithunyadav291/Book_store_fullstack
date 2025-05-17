import express from 'express'
import { checkAuth, logout, signIn, signup, updateAddress, UpdateEmail, UpdatePassword, UpdateUsername } from '../controllers/user.contoller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router=express.Router()

router.post("/signup",signup)
router.post("/signin",signIn)

router.get("/getuser",protectRoute,checkAuth)
router.get("/logout",protectRoute,logout)

router.put("/update/address/:id",protectRoute,updateAddress)
router.put("/update/email/:id",protectRoute,UpdateEmail)
router.put("/update/username/:id",protectRoute,UpdateUsername)
router.put("/update/password/:id",protectRoute,UpdatePassword)

export default router;