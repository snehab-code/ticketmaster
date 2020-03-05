const mongoose = require('mongoose')
const Schema = mongoose.Schema
// populate this! 

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
    }, 
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    department: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    employees: {
        type: [{"_id": Schema.Types.ObjectId}],
        ref: 'Employee',
        required: true
    },
    message: {
        type: String,
        minlength: 5
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId
    }
}) 


ticketSchema.statics.getStatus = function(id, userId) {
    const Ticket = this
    return Ticket.findOne({_id:id, user: userId})
        .then(ticket => {
            return Promise.resolve(ticket.isResolved)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket