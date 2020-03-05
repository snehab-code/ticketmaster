const nodemailer = require('nodemailer')

const sendEmail = (email) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testmailernbt@gmail.com',
            pass: 'SECRET123'
        }
    })
    
    let mailOptions = {
        from: 'testmailernbt@gmail.com',
        to: email,
        subject: 'Your ticket was created',
        text: 'You will be contacted shortly.'
    }
    
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('email sent')
        }
    })
}         

module.exports = sendEmail