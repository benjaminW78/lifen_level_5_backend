const Model = require('../collections/shifts_schema')
const Workers = require('./workers')
const Moment = require('moment')
const MomentRange = require('moment-range')
const pricingDays = require('./pricing')
const moment = MomentRange.extendMoment(Moment)
exports.createOne = async (shift) => {
    try {
        if (!shift.allow_overlap) {

            const shiftsOverLaping = await Model.findShiftsInInterval(shift.start_date, shift.end_date)
            if (shiftsOverLaping.length > 0) {
                throw { message: 'your shift can\'t overlap other shifts', shiftsOverLaping }
            }
        }
        // we add a day because in the front interface the date range picker don't handle hours and when selecting 4 days
        // for the range only 3 are counted by default which is wrong because we want to work all the days selected
        shift.end_date = moment(shift.end_date, 'YYYY/MM/DD HH:mm:ss.SSS').add(1, 'day')

        const range = moment.range(moment(shift.start_date, 'YYYY/MM/DD HH:mm:ss.SSS'), shift.end_date)
        const daysInRange = Array.from(range.by('days', { excludeEnd: true }))
        const daysRangeIndex = daysInRange.map(day => day.format('E'))
        const pricingByDays = await pricingDays.getAllDaysPricing()
        const basicDayPrice = shift.basic_price_per_day
        shift.shift_price = daysRangeIndex.map(indexDay => {
            // we substract one to current index because our array of pricing by day start at index 0

            return basicDayPrice * pricingByDays[indexDay - 1].price_multiplier
        }).reduce((acc, item) => acc += item, 0)

        return Model.createShift(shift)
    } catch (err) {
        console.log(err.name, err)
        if (err.name === 'ValidationError') {
            throw err.message
        }
        if (err.message) {
            throw err
        } else {

            throw 'something went wrong at shift creation'
        }
    }
}
exports.updateShift = (shiftId, fieldsToUpde) => {
    try {
        return Model.update(shiftId, fieldsToUpde)
    } catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {
            throw err.message
        }
        throw 'something went wrong at shift update'
    }
}
exports.delShift = (shiftId) => {
    try {
        return Model.delete(shiftId)
    } catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {
            throw err.message
        }
        throw 'something went wrong at shift deletion'
    }
}

exports.getAllUserShifts = (userId) => {
    try {
        return Model.getAllShiftForUser(userId).then((data) => {
            if (data.length === 0) {
                //i could also throw 404 status code to inform service requesting that the list of shifts is empty
                throw 'no shifts found for this user'
            }

            return data
        })
    } catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {
            throw err.message
        }
        throw 'something went wrong at shift get list'
    }
}
exports.getAllShifts = () => {
    try {
        return Model.get().then((data) => {
            if (data.length === 0) {
                //i could also throw 404 status code to inform service requesting that the list of shifts is empty
                throw 'no shifts found'
            }
            return data
        })
    } catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {
            throw err.message
        }
        throw 'something went wrong at shift get list'
    }
}


exports.getShiftsFee = () => {
    try {
        return Model.get().then(async (data) => {
            const workers = await  Workers.getAllUsers()
            const mappedWorkers = workers.reduce((acc, worker) => {
                acc[worker._id] = worker
                return acc
            }, {})
            let pdg_fee = 0
            //important formula which extract a additionnal fee from 5% on every shifts price
            // and add 80 euros on pdg fee for every interim workers used for a shift
            data.forEach(item => {
                if (mappedWorkers[item.user_id]) {
                    pdg_fee += 80
                }
                pdg_fee += (item.shift_price * 5) / 100
            })
            return pdg_fee
        })
    } catch (err) {
        console.log(err)
        throw 'something went wrong at getShiftsFee get'
    }
}