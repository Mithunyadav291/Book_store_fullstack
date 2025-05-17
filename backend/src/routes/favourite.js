import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkFavBook, getFavoriteBook, toggleFavBook } from "../controllers/favourite.controller.js";

const router=express.Router();

router.put("/addfavbook/:bookId",protectRoute,toggleFavBook);
router.get("/getfavouritebook",protectRoute,getFavoriteBook);
router.get('/checkfav/:bookId', protectRoute, checkFavBook);

export default router;