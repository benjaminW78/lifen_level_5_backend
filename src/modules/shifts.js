const Model = require('../collections/shifts_schema')

exports.createOne = async (shift) => {
    try {
        if (!shift.allow_overlap) {

            const shiftsOverLaping = await Model.findShiftsInInterval(shift.start_date, shift.end_date)
            console.log('lol', shiftsOverLaping)
            if (shiftsOverLaping.length > 0) {
                throw { message: 'your shift can\'t overlap other shifts', shiftsOverLaping }
            }
        }
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