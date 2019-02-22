const Pricing = require('../modules/pricing')


exports.pricingDaysList = (req, res) => {
    Pricing.getAllDaysPricing()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
}

exports.updatePricingDays = (req, res) => {
    const priceMultiplier = req.body
    const dayId = req.params.id
    Pricing.updatePricingDay(dayId, priceMultiplier)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
}
exports.pricingStatusList = (req, res) => {
    res.status(200).send(Pricing.getStatusPricing())
}