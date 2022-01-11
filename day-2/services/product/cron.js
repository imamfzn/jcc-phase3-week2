require('dotenv').config()

const mongoose = require('mongoose');
const { Product } = require('./models');

if (!process.env.MONGO_URL) {
  logger.error("PLEASE_SPECIFY MONGO_URL !");
  process.exit(1);
}

// prepare db and http server
mongoose
  .connect(process.env.MONGO_URL, { connectTimeoutMS: 1000 })
  .then(cron)
  .catch(function (err) {
    logger.error(err.message);
    process.exit(1);
  });

async function cron() {
    const topSell = await Product.findOne().sort({ soldCount: -1});
    const topRate = await Product.aggregate([
        {
            $group: {
                _id: "$_id",
                avg: { $avg: "$rating" }
            }
        },
        { $sort : { avg : 1 } },
        { $limit: 1 },
    ]);

    console.log(topSell);
    console.log(topRate);
}
