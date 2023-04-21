const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1', 'http://localhost:3500'];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) { //!origin is for dev undefined in log
            callback(null, true)
        } else {
            callback(new Error('This is not allowed by Cheron'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions