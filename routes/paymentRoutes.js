const express = require("express");
const buySubscription = require("../controllers/paymentController.js")
const router = express.Router();
const protect = require("../middleWare/authMiddleware");//Buy subcription
const paymentverification = require("../controllers/paymentController.js")
const getRazorPayKey= require("../controllers/paymentController.js");
const cancelSubscription = require("../controllers/paymentController");


router.get("/subscribe", protect , buySubscription);

//Razorpay key
router.get("/razorpaykey",protect, getRazorPayKey);

//verify payment and save ref in DB
router.post("/paymentverification", protect , paymentverification);

//Cancel Subscription
router.delete("/subscribe/cancel", protect, cancelSubscription)

module.exports = router;
