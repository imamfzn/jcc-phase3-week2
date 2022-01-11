require('dotenv').config()

const app = require('express')();
const redis = require('redis');
const apicache = require('apicache');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const logger = require('./logger');
const middleware = require('./middlewares');
const reviewHandler = require('./handlers/review');

const APP_PORT = process.env.APP_PORT || 5000;

if (!process.env.MONGO_URL) {
  logger.error("PLEASE_SPECIFY MONGO_URL !");
  process.exit(1);
}

if (!process.env.REDIS_URL) {
    logger.error("PLEASE SPECIFY REDIS_URL !");
    process.exit(1);
}

const { middleware: cacheMiddleware } = apicache.options({
    redisClient: redis.createClient({
        url: process.env.REDIS_URL,
    }),
});

// prepare db and http server
mongoose
  .connect(process.env.MONGO_URL, { connectTimeoutMS: 1000 })
  .then(async function () {
    app.listen(APP_PORT, function () {
      logger.info(`application is running on port ${APP_PORT}`);
    });
  })
  .catch(function (err) {
    logger.error(err.message);
    process.exit(1);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(middleware.requestLog());
app.disable('etag');

app.get('/products/:id/reviews', cacheMiddleware('1 minutes'), reviewHandler.getReviewsByProductId);
app.post('/products/:id/reviews', reviewHandler.createProductReview);
