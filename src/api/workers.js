const Workers = require('../modules/workers')

exports.hireWorker = (req, res) => {
    const workerToCreate = req.body
    Workers.createUser(workerToCreate)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
}

exports.updateWorker = (req, res) => {
    const fieldsToUpdate = req.body
    const workerId = req.params.id
    Workers.updateUser(workerId, fieldsToUpdate)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
}

exports.workersList = (req, res) => {
    Workers.getAllUsers()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
}

exports.fireWorker = (req, res) => {
    const workerId = req.params.id
    Workers.delUser(workerId)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
}