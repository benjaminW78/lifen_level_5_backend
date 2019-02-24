const Express = require('express')

const { hireWorker, updateWorker, workersList, fireWorker } = require('./workers')
const { pricingDaysList, updatePricingDays, pricingStatusList } = require('./pricing')
const { createShift, shiftsList, updateShift, deleteShift, allShiftForUser, allShiftFee } = require('./shifts')

const workersRouter = Express.Router()
const pricing = Express.Router()
const pricingDays = Express.Router()
const shifts = Express.Router()

function init(app) {

    workersRouter
        .get('/', workersList)
        .get('/:id/shifts/', allShiftForUser)
        .post('/', hireWorker)
        .put('/:id', updateWorker)
        .delete('/:id', fireWorker)
    pricingDays.get('/', pricingDaysList)
        .put('/:id', updatePricingDays)


    pricing.use('/days', pricingDays)
    pricing.use('/status', pricingStatusList)
    pricing.use('/fee', allShiftFee)

    shifts
        .get('/', shiftsList)
        .post('/', createShift)
        .put('/:id', updateShift)
        .delete('/:id', deleteShift)

    app.use('/workers', workersRouter)
    app.use('/pricing', pricing)
    app.use('/shifts', shifts)
}

exports.init = init
