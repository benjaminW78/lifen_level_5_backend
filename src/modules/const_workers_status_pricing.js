const STATUS_PRICE = [{ name: 'medic', shift_price: 270 }, { name: 'interne', shift_price: 126 }, {
    name: 'interim',
    shift_price: 480
}].map(item => Object.freeze(item))

module.exports = STATUS_PRICE
