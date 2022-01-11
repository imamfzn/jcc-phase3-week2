const mongoose = require('mongoose');

module.exports = {
    Product: mongoose.model('Product', {
        name: String,
        stock: Number,
        soldCount: Number,
        price: Number
    }),
};