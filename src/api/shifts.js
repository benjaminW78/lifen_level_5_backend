const Shifts = require('../modules/shifts')


exports.createShift = (req, res) => {
    const workerToCreate = req.body
    Shifts.createOne(workerToCreate)
        .then(result => res.status(200).send(result))
        .catch(err => {
            return res.status(400).send(err)
        })
}

exports.shiftsList = (req, res) => {
    Shifts.getAllShifts()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
}

exports.updateShift = (req, res) => {
    const priceMultiplier = req.body
    const dayId = req.params.id
    Shifts.updateShift(dayId, priceMultiplier)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
}


exports.deleteShift = (req, res) => {
    const shiftId = req.params.id
    Shifts.delShift(shiftId)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
}
exports.allShiftForUser = (req, res) => {
    const shiftId = req.params.id
    Shifts.getAllUserShifts(shiftId)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
}

exports.allShiftFee = (req, res) => {
    Shifts.getShiftsFee()
        .then(fee => {
            return res.status(200).send({ fee })
        })
        .catch(err => res.status(400).send(err))
}