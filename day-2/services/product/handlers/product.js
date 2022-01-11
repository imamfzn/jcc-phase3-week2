const { Product } = require('../models');
const { ReviewService } = require('../services')

module.exports = {
    async getProducts (req, res) {
        const products = await Product.find();

        res.json({
            data: products,
            meta: {
                total: products.length,
            }
        });
    },

    async getProductById (req, res) {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({
                    error: {
                        message: "product not found",
                    }
                });
            }

            const reviews = await ReviewService.getProductReviews(req.params.id);

            return res.status(200).json({
                data: {
                    ...product.toObject(),
                    reviews,
                },
            });
        } catch (err) {
            res.status(500).json({
                error: err.message,
            });
        }
    },

    async createProduct (req, res) {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json({
            data: product,
        });
    }
};
