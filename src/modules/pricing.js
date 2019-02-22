const Model = require('../collections/days_cost_schema')
const STATUS_PRICING = require('./const_workers_status_pricing')

exports.updatePricingDay = (dayId, priceMultiplicator) => {
    try {
        return Model.update(dayId, priceMultiplicator)
    } catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {
            throw err.message
        }
        throw 'something went wrong at allDaysPricing update'
    }
}

exports.getAllDaysPricing = () => {
    try {
        return Model.get()
    } catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {
            throw err.message
        }
        throw 'something went wrong at allDaysPricing get'
    }
}

exports.getStatusPricing = () => STATUS_PRICING
