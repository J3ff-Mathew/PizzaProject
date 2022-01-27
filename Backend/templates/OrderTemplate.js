const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: { type: String },
    phone: { type: Number },
    total: { type: Number },
    items: { type: Array },
    date: { type: Date, default: Date.now }
})
module.exports = mongoose.model("order_list", orderSchema)
