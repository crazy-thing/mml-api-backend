const fs = require('fs');
const path = require('path');

const logDir = path.join(process.cwd(), 'logs');
const logFilePath = path.join(logDir, 'logs.log');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const logger = (req, res, next) => {
    let ip = req.ip;
    if (ip.includes('::ffff')) {
        ip = ip.substring(7);
    }

    const start = new Date();

    res.on('finish', () => {
        const end = new Date();
        const duration = end - start;

        const status = res.statusCode;
        const success = status >= 200 && status < 400 ? 'SUCCESS' : 'FAILURE';

        const logMsg = `${end.toLocaleString()} - ${req.method} ${req.originalUrl} - IP: ${ip} - Status: ${status} - ${success} - Duration: ${duration}ms\n`;

        logStream.write(logMsg, 'utf8');
    });

    next();
}

module.exports = logger;
