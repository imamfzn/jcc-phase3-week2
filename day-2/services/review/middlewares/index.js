const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = {
    requestLog: function () {
        return expressWinston.logger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.json()
            ),
            responseField: null,
            requestWhitelist: [],
            responseWhitelist: ['body'],
            metaField: null,
            msg: 'ok',
            dynamicMeta: function (req, res) {
                return {
                    method: req.method,
                    path: req.originalUrl,
                    status: res.statusCode,
                    message: "pok",
                };
            },
        });
    },      
};