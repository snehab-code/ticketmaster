const mongoose = require('mongoose')
const Schema = mongoose.Schema
// populate this! 

const ticketSchema = new Schema({
    // code - string, required 
    // priority - string, enum 
    // customer - STOID, required
    // department - STOID, required
    // employees - [stoid]
    // message - string, minlength 
    // isResolved - Boolean
    // createdAt - Date, default
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
        // type: [Schema.types.ObjectId],
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
    }
}) 


ticketSchema.statics.getStatus = function(id) {
    const Ticket = this
    return Ticket.findById(id)
        .then(ticket => {
            return Promise.resolve(ticket.isResolved)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket