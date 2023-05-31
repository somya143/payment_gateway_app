const express = require("express");
require("dotenv").config();
const app = express();
const payment = require("./features/payment/payment.routes");
const connect = require("./config/db");
const PORT = process.env.PORT || 8080;
const cors = require("cors");

app.use(express.json())
app.use("/payments" , payment);
app.use(cors());

app.listen(PORT , async() => {
    await connect();
    console.log(`Listening to port ${PORT}`);
})