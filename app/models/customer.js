const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value)
            },
            message: function() {
                return 'not a valid email'
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10,
        validate: {
            validator: function(value) {
                return validator.isNumeric(value)
            },
            message: function() {
                return 'not a valid mobile number'
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId
    }
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer