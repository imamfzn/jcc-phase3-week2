require('dotenv').config()

const logger = require('./logger');

if (!process.env.MONGO_URL_PRODUCT || !process.env.MONGO_URL_REVIEW) {
    logger.error("PLEASE_SPECIFY MONGO_URL !");
    process.exit(1);
}

const { MongoClient, ObjectId } = require('mongodb');

const productClient = new MongoClient(process.env.MONGO_URL_PRODUCT, { useUnifiedTopology: true });
const reviewClient = new MongoClient(process.env.MONGO_URL_REVIEW, { useUnifiedTopology: true });

async function cron() {
    try {
        await productClient.connect();
        await reviewClient.connect();    
    } catch (error) {
        logger.error(error.message);
        process.exit(1);
    }

    logger.info("executing cron ...");

    const Product = productClient.db('test').collection('products');
    const Review = reviewClient.db('test').collection('reviews');

    try {
        const [ topSell ] = await Product.find().sort({ soldCount: -1}).limit(1).toArray();
        const [ topRate ] = await Review.aggregate([
            {
                $group: {
                    _id: "$productId",
                    rateAvg: { $avg: "$rating" }
                }
            },
            { $sort : { avg : -1 } },
            { $limit: 1 },
        ]).toArray();

        const [ badRate ] = await Review.aggregate([
            {
                $group: {
                    _id: "$productId",
                    rateAvg: { $avg: "$rating" }
                }
            },
            { $sort : { avg : 1 } },
            { $limit: 1 },
        ]).toArray();

        const [ [topRateProduct], [badRateProduct] ] = await Promise.all([
            Product.find({ _id: ObjectId(topRate._id) }).toArray(),
            Product.find({ _id: ObjectId(badRate._id) }).toArray(),
        ])
        
        console.log(topSell);
        console.log(topRateProduct);
        console.log(badRateProduct);
    } catch (err) {
        logger.error(err.message);
    } finally {
        productClient.close();
        reviewClient.close();
    }
}

cron();
