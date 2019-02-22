const Mongoose = require('mongoose')
const { database } = require('../../configuration')

const names = ['update', 'findOneAndUpdate', 'insertMany', 'save', 'create']

let Database

exports.connectDb = async () => {
    Database = await Mongoose.connect(database.url, { useCreateIndex: true, useNewUrlParser: true })
    return Database
}

exports.forceValidators = (collection, schema) => {
    names.forEach(name => {
        schema.pre(name, function (next) {
            const options = {
                runValidators: true,
                context: 'query'
            }

            this.options = { ...options, ...this.options }

            next()
        })

        schema.post(name, (error, res, next) => {
            if (error) {
                if (error.message.indexOf('dup key') !== -1) {
                    throw {
                        type: 'database',
                        code: 11000,
                        message: error.message,
                        database: {
                            collection
                        }
                    }
                }
                throw error
            }
            next()
        })
    })
}
exports.getDbInstance = () => Database

exports.disconnectDb = () => Database.close()
