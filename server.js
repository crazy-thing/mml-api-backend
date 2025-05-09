require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const modPackRouter = require('./routers/modpacksRouter');
const authRouter = require('./routers/authRouter');
const { checkApiToken } = require('./helpers/apiToken');

const connectToDatabase = async (callback) => {
    try {
        await checkApiToken();
        console.log("Attempting to connect to MongoDB on " + process.env.DB_ADDR);
        await mongoose.connect(process.env.DB_ADDR);
        console.log('Connected to MongoDB');
        callback();
    } catch (error) {
        console.error(`MongoDB connection failed: ${error}`);
        connectToDatabase(callback); 
    }
};

const app = express();
const PORT = parseInt(process.env.PORT) || 10000;
const API_URL = process.env.API_URL || '/api';

app.use(bodyParser.json({ limit: '10000mb' }));
app.use(bodyParser.urlencoded({ limit: '10000mb', extended: true }));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.set('trust proxy', "::1");
app.disable('x-powered-by');
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "http://localhost:10000", "https://localhost:10000", "http://localhost", "https://localhost", ""],
            imgSrc: ["*", "data:", "blob:"],
            upgradeInsecureRequests: null
        },
    },
}));

app.use(API_URL, modPackRouter);
app.use(API_URL, authRouter);
app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
}, express.static('uploads'));

connectToDatabase(() => {
    app.use(express.static('build'));

    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: 'build' });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
