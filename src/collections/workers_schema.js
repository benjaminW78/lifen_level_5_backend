const Database = require('../services/database')
const Mongoose = require('mongoose')
const WORKERS_STATUS = require('../modules/const_workers_status_pricing')

const schema = new Mongoose.Schema({
    first_name: { type: Mongoose.Schema.Types.String, required: true },
    status: {
        type: Mongoose.Schema.Types.String,
        required: true,
        enum: WORKERS_STATUS.map(item => item.name),
        index: true
    },
    shift_price: { type: Mongoose.Schema.Types.Number, required: true, default: 0 }
}, { versionKey: false })

Database.forceValidators('workers', schema)
const workers = Database.getDbInstance().model('workers', schema)


exports.WORKERS_STATUS = WORKERS_STATUS

/**
 *  this function allow to create one worker at a time
 * @param user
 * @returns {Query|*}
 */
exports.createWorker = (user) => workers.create(user)

/**
 * this function allow to delete one worker at a time
 * @param id
 * @returns {Query}
 */
exports.delete = (id) => workers.deleteOne({ _id: id })
/**
 *  this function allow to get many workers at once or one at a time depending if users param is a array or not
 * @param userId
 * @returns {Query}
 */
exports.get = (userId = null) => {
    let payload = { _id: userId }
    if (userId === null) {
        payload = {}
    }
    return workers.find(payload).lean()
}
/**
 * this function allow to update one worker at a time
 * @param payload
 * @returns {Query}
 */
exports.update = (id, payload) => workers.findOneAndUpdate({ '_id': id }, { $set: payload }, { new: true }).lean()
