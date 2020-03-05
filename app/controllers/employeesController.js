const Employee = require('../models/employee')
const Ticket = require('../models/ticket')

module.exports.list = (req, res) => {
    Employee.find().populate('department', ['_id', 'name'])
        .then(employees => {
            res.json(employees)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const employee = new Employee(body)
    employee.save()
        .then(employee => {
            res.json(employee)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const body = req.body
    const id = req.params.id
    Employee.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then(employee => {
            if(employee) {
                res.json(employee)
            } else {
                res.json({})
            }
        })
        .catch(err => res.json(err))
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Employee.findById(id)
        .then(employee => {
            if(employee) {
                Ticket.find({'employees._id': id})
                .then(tickets => {
                    const response = {
                        employee,
                        tickets
                    }
                    res.json(response)
                })
                .catch((err)=> {
                    res.json(err)
                })
            } else {
                res.json({})
            }
        })
        .catch(err => res.json(err))
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Employee.findByIdAndDelete(id)
        .then(employee => {
            if (employee) {
                res.json(employee)
            } else {
                res.json({})
            }
        })
        .catch(err => res.json(err))
}