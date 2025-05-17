import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { orderBook ,getOrderHistory, getAllOrderHistory, updateStatus} from "../controllers/order.controller.js";
const router=express.Router();

router.post("/placeorder",protectRoute,orderBook)
router.get("/get-order-history",protectRoute,getOrderHistory)
router.get("/get-all-orders",protectRoute,getAllOrderHistory)
router.put("/update-order-status/:orderId",protectRoute,updateStatus)

export default router;