const Express = require('express')
const Compression = require('compression')
const BodyParser = require('body-parser')
const Configuration = require('./configuration')
const { connectDb } = require('./src/services/database')

// todo init mongodb-connector
const app = Express()

connectDb()
    .then((test) => {
        const Router = require('./src/api/router')

        // start the server
        app
            .use(BodyParser.json({ limit: '50mb' })) // Parse application/json
            .use(BodyParser.urlencoded({ limit: '50mb', extended: true })) // Parse application/x-www-form-urlencoded
            .use(Compression())

        Router.init(app)

        app.listen(Configuration.server.port, () => console.log(`running on port ${Configuration.server.port}`))
    })
    .catch((error) => {
        console.log('*** database connection failed, shutting down ***', error)
        process.exit(0)
    })

exports.app = app
