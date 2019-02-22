const Database = require('../services/database')
const Mongoose = require('mongoose')

const WEEKS_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const schema = new Mongoose.Schema({

    'name': {
        type: String,
        required: true,
        unique: true,
        enum: WEEKS_DAYS
    },
    'price_multiplier': {
        type: Number,
        required: true,
        default: 0,
        index: true
    }
}, { versionKey: false })

Database.forceValidators('pricing_day_multiplier', schema)
const days = Database.getDbInstance().model('days_cost', schema)
// automaticly populate pricing days multiplier collection at every server deployement
days.find({}).then(async items => {
    if (items.length < WEEKS_DAYS.length) {
        await days.insertMany(WEEKS_DAYS.map(item => ({ name: item })))
        console.log('pricing multiplier by day added to collection')
    }
})

exports.get = () => days.find({})

exports.update = (id, price_multiplier) => days.findOneAndUpdate({ '_id': id }, { $set: price_multiplier }, { new: true })