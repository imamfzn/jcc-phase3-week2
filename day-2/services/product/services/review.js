const axios = require('axios');

const reviewConnection = axios.create({
    baseURL: process.env.REVIEW_HOST,
    timeout: 1000,
});

module.exports = {
    async getProductReviews (productId) {
        const { data: { data } } = await reviewConnection.get(`/products/${productId}/reviews`);

        return data;
    }
};
