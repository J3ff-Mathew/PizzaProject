const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String

    },
    price: { type: Number },
    path: { type: String }
})
module.exports = mongoose.model("menu_items", menuSchema)
