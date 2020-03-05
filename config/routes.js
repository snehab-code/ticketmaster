const express = require('express')
const router = express.Router()
const customersController = require('../app/controllers/customersController')
const departmentsController = require('../app/controllers/departmentsController')
const employeesController = require('../app/controllers/employeesController')
const ticketsController = require('../app/controllers/ticketsController')
const usersController = require('../app/controllers/usersController')
const authenticateUser = require('../app/middlewares/authenticateUser')
   
router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.delete('/users/logout', authenticateUser, usersController.logout)
router.delete('/users/logout-all', authenticateUser, usersController.logoutAll)
router.get('/users/check-login', authenticateUser, usersController.checkLoginStatus)

router.get('/customers', customersController.list)
router.post('/customers', customersController.create)
router.get('/customers/:id', customersController.show)
router.put('/customers/:id', customersController.update)
router.delete('/customers/:id', customersController.destroy)

// for departments 
router.get('/departments', departmentsController.list)
router.post('/departments', departmentsController.create)
router.get('/departments/:id', departmentsController.show)
router.put('/departments/:id', departmentsController.update)
router.delete('/departments/:id', departmentsController.destroy)

// // for employees
router.get('/employees', employeesController.list)
router.post('/employees', employeesController.create)
router.get('/employees/:id', employeesController.show)
router.put('/employees/:id', employeesController.update)
router.delete('/employees/:id', employeesController.destroy)

// // for tickets
router.get('/tickets', ticketsController.list)
router.post('/tickets', ticketsController.create)
router.get('/tickets/:id', ticketsController.show)
router.put('/tickets/:id', ticketsController.update)
router.delete('/tickets/:id', ticketsController.destroy)

module.exports = router