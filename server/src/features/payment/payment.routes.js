const express = require("express");
const Payment = require("./payment.modal");
const app = express.Router();
const Razorpay = require("razorpay");

app.get("/razorpay_key" , (req,res) => {
   return res.send({ key : process.env.RAZORPAY_KEY_ID })
});

app.post("/create_order" , async(req,res) => {
    try {
        const instance = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.KEY_SECRET
        });
        const options = {
            amount : req.body.amount,
            currency : "INR"
        };
        const order = await instance.orders.create(options);
        if(!order){
            return res.status(500).send("Some error occured")
        }else{
            return res.send(order);
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }

})

app.post("/pay_order" , async(req,res) => {
    const { amount , razorpayPaymentId , razorpayOrderId , razorpaySignature } = req.body;
    try {
        const newOrder = await Payment({
            isPaid : true,
            amount : amount,
            razorpay : {
                orderId : razorpayOrderId,
                paymentId : razorpayPaymentId,
                signatureId : razorpaySignature
            }
           
        });
        await newOrder.save();
        res.status(200).send({message: "Payment Successfull"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get("/list_order" , async(req,res) => {
    try {
        const order = await Payment.find();
        return res.send(order)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = app;