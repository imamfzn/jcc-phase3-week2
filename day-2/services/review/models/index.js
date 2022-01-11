const mongoose = require('mongoose');

module.exports = {
    Review: mongoose.model('Review', {
        productId: String,
        rating: Number,
        text: String,
    }),
};
