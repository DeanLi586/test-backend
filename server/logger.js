const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// const levels = { 
//     error: 0, 
//     warn: 1, 
//     info: 2, 
//     verbose: 3,  
//     debug: 4, 
//     silly: 5 
// };

// check if log directory exist, if no create it
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'server.log');
const errFilename = path.join(logDir, 'error.log');

const logger = createLogger({
    // if environment === development set level to 'debug' else set to 'info'
    level: env === 'development' ? 'debug' : 'info',
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        }),
        new transports.Console({
            level: 'error',
            format: format.json(),
        }),
        new transports.File({filename}),
        new transports.File({filename: errFilename, level: 'error'})
    ]
});

module.exports = { logger };