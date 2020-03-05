const Ticket = require('../models/ticket')
const Customer = require('../models/customer')
const sendEmail = require('../tasks/sendEmail')

module.exports.list = (req, res) => {
    Ticket.find({user: req.user._id}).populate('department', ['_id', 'name']).populate('customer', ['_id', 'name']).populate({path: 'employees._id', model: 'Employee'})
        .then(tickets => {
            res.json(tickets)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const ticket = new Ticket(body)
    ticket.save()
        .then(ticket => {
            Customer.findOne({_id: ticket.customer})
                .then(customer => {
                    const customerEmail = customer.email
                    sendEmail(customerEmail)
                })
            res.json(ticket)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const body = req.body
    const id = req.params.id
    const userId = req.user._id
    Ticket.getStatus(id, userId)
        .then(status => {
            if(!status && body.isResolved) {
                console.log('it works')
                Ticket.findOneAndUpdate({_id: id, user: userId}, body, {new: true, runValidators: true})
                .then(ticket => {
                    if(ticket) {
                        Customer.find(ticket.customer)
                        .then(customer => {
                            const customerEmail = customer.email
                            sendEmail(customerEmail)
                        })
                        res.json(ticket)
                    } else {
                        res.json({})
                    }
                })
                .catch(err => res.json(err))
            } else {
                Ticket.findOneAndUpdate({_id: id, user: userId}, body, {new: true, runValidators: true})
                .then(ticket => {
                    if(ticket) {
                        res.json(ticket)
                    } else {
                        res.json({})
                    }
                })
                .catch(err => res.json(err))
            }
        })
        .catch(err => {
            console.log(err, 'this err')
        })

}

module.exports.show = (req, res) => {
    const id = req.params.id
    Ticket.findOne({_id: id, user: req.user._id})
        .then(ticket => {
            if(ticket) {
                res.json(ticket)
            } else {
                res.json({})
            }
        })
        .catch(err => res.json(err))
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Ticket.findOneAndDelete({_id: id, user: req.user._id})
        .then(ticket => {
            if (ticket) {
                res.json(ticket)
            } else {
                res.json({})
            }
        })
        .catch(err => res.json(err))
}

