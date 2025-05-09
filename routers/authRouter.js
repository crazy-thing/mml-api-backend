const express = require('express');
const rateLimit = require('express-rate-limit');
const { authenticateApiKey } = require('../middleware/authApiKey');
const logger = require('../middleware/logger');
const authRouter = express.Router();


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: 'To many requests from this IP, please try again after 15 minutes',
});

authRouter.use(limiter);
authRouter.use(authenticateApiKey);
authRouter.use(logger);


authRouter.post('/authenticate', (req, res) => {
    res.status(200).json({ message: 'API key authenticated successfully' });
});

module.exports = authRouter;

