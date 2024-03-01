const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3001'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin))
        {
            callback(null, true);
        } else
        {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

module.exports = corsOptions;
