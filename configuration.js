module.exports = {
    server: {
        port: process.env.PORT || 8000
    },
    database: {
        url: process.env.DB_URL || 'mongodb://localhost:27017/lifen-back'
    }
}
