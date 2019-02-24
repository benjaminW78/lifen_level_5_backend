const Database = require('../services/database')
const Mongoose = require('mongoose')

// { "id": 1, "planning_id": 1, "user_id": 1, "start_date": "2017-1-1" }
const schema = new Mongoose.Schema({
    planning_id: { type: Mongoose.Schema.Types.Number, default: 1 },
    user_id: {
        type: Mongoose.Schema.Types.String,
        index: true,
        default: null
    },
    start_date: { type: Mongoose.Schema.Types.Date, required: true, index: true },
    end_date: { type: Mongoose.Schema.Types.Date, required: true, index: true },
    allow_overlap: { type: Mongoose.Schema.Types.Boolean, default: true },
    shift_price: { type: Mongoose.Schema.Types.Number, required: true }
}, { versionKey: false })

Database.forceValidators('shifts', schema)
const shifts = Database.getDbInstance().model('shifts', schema)

/**
 *  this function allow to create one shift at a time
 * @param user
 * @returns {Query|*}
 */
exports.createShift = (user) => shifts.create(user)

/**
 * this function allow to delete one shift at a time
 * @param id
 * @returns {Query}
 */
exports.delete = (id) => shifts.deleteOne({ _id: id })
/**
 *  this function allow to get many shifts at once or one at a time depending if users param is a array or not
 * @param id
 * @returns {Query}
 */
exports.get = (id = null) => {
    let payload = { _id: id }
    if (id === null) {
        payload = {}
    }
    return shifts.find(payload).sort({ start_date: 1, end_date: 1 }).lean()
}
exports.getAllShiftForUser = (userId) => {
    let payload = { user_id: userId }
    return shifts.find(payload).lean()
}

exports.findShiftsInInterval = (dateStart, dateEnd) => {
    return shifts.find({
        $or: [
            { $and: [{ start_date: { $gte: new Date(dateStart) } }, { start_date: { $lte: new Date(dateEnd) } }] },
            { $and: [{ end_date: { $gte: new Date(dateStart) } }, { end_date: { $lte: new Date(dateEnd) } }] }
        ]
    }).lean()
}
/**
 * this function allow to update one shift at a time
 * @param payload
 * @returns {Query}
 */
exports.update = (id, payload) => shifts.findOneAndUpdate({ '_id': id }, { $set: payload }, { new: true }).lean()
