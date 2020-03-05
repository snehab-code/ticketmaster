// start - import mongoose, create Schema variable

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
// , { toJSON: {virtuals: true}})

// virtual populate

// departmentSchema.virtual('Tickets', {
//     ref: 'Ticket',
//     localField: '_id',
//     foreignField: 'department'
// })

// departmentSchema.virtual('Employees', {
//     ref: 'Employee', //the model to use
//     localField: '_id', // find employees where local field here is
//     foreignField: 'department' // equal to this field in employee
// })

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department