const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    isPaid : Boolean,
    amount : Number,
    razorpay : {
        orderId : String,
        paymentId : String,
        signature : String
    }
},
{
    timestamps : true,
    versionKey : false
});

const Payment = mongoose.model("payment" , paymentSchema);

module.exports = Payment;