const Model = require('../collections/workers_schema')

exports.createUser = (worker) => {
    try {
        return Model.createWorker(worker)
    } catch (err) {
        console.log(err.name)
        if (err.name === 'ValidationError') {
            throw err.message
        }
        throw 'something went wrong at worker creation'
    }
}
exports.updateUser = (workerId, fieldsToUpde) => {
    try {
        return Model.update(workerId, fieldsToUpde)
    } catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {
            throw err.message
        }
        throw 'something went wrong at worker update'
    }
}
exports.delUser = (workerId) => {
    try {
        return Model.delete(workerId)
    } catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {
            throw err.message
        }
        throw 'something went wrong at worker deletion'
    }
}

exports.getAllUsers = () => {
    try {
        return Model.get().then((data) => {
            if (data.length === 0) {
                //i could also throw 404 status code to inform service requesting that the list of workers is empty
                throw 'no workers found'
            }
            return data
        })
    } catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {
            throw err.message
        }
        throw 'something went wrong at worker get list'
    }
}