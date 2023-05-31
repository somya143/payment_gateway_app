const mongoose = require("mongoose");
const DB_URI = process.env.MONGO_URI;
const connect = async() => mongoose.connect(DB_URI)


module.exports = connect;