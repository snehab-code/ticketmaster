const Department = require('../models/department')
const Ticket = require('../models/ticket')
const Employee = require('../models/employee')

module.exports.list = (req,res) => {
    Department.find({user: req.user._id})
        .then(departments => {
            res.json(departments)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const department = new Department(body)
    department.save()
        .then(department => {
            res.json(department)
        })
        .catch(err => res.json(err))
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Department.findOne({_id:id, user: req.user._id}, 'id name')
    // .populate('Tickets').populate('Employees')
        .then(department => {
            if (department) {
                Promise.all([
                    Ticket.find({'department': id}),
                    Employee.find({'department': id})
                ])
                .then(([tickets, employees]) => {
                    const result = {
                        department, tickets, employees
                    }
                    res.json(result)
                }) 
                // res.json(department)
            } else {
                res.json({})
            }
        })
        .catch(err => res.json(err))
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Department.findOneAndUpdate({_id:id, user: req.user._id}, body, {new: true, runValidators: true})
        .then(department => {
            if(department) {
                res.json(department)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Department.findOneAndDelete({_id:id, user: req.user._id})
        .then(department => {
            if(department) {
                res.json(department)
            } else {
                res.json({err: "no such department"})
            }
        })
        .catch(err => res.json(err))
}