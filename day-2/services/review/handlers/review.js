const { Review } = require('../models');

module.exports = {
    async getReviewsByProductId (req, res) {
        const reviews = await Review.find({ productId: req.params.id});

        res.json({
            data: reviews,
            meta: {
                total: reviews.length,
            }
        });
    },

    async createProductReview (req, res) {
        const review = new Review({
            productId: req.params.id,
            ...req.body,
        });

        await review.save();

        res.status(201).json({
            data: review,
        });
    }
};
