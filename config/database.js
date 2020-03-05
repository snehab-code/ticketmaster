const mongoose = require ('mongoose')

const setup = () => {
    mongoose.connect('mongodb://localhost:27017/oct-ticket-master', {useNewUrlParser:true, useUnifiedTopology: true})
        .then(() => {
            console.log('connected to db')
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = setup