const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Payment = mongoose.Schema(
   {
    razorpay_signature:{
        type:String,
        required:true,

    },
    razorpay_payment_id:{
        type:String,
        required:true,

    },
    razorpay_subscription_id:{
        type:String,
        required:true,

    },
},
{
    timestamps: true,
  }
);



const User = mongoose.model("Payment", Payment);
module.exports = Payment;
