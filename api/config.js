module.exports = {
    port: process.env.PORT || 5000,
    jwtOptions: {
        secret: process.env.JWT_SECRET,
    },
    dbURI: process.env.DB_URI,
};
