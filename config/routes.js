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

router.get('/customers', authenticateUser, customersController.list)
router.post('/customers', authenticateUser, customersController.create)
router.get('/customers/:id', authenticateUser, customersController.show)
router.put('/customers/:id', authenticateUser, customersController.update)
router.delete('/customers/:id', authenticateUser, customersController.destroy)

// for departments 
router.get('/departments', authenticateUser, departmentsController.list)
router.post('/departments', authenticateUser, departmentsController.create)
router.get('/departments/:id', authenticateUser, departmentsController.show)
router.put('/departments/:id', authenticateUser, departmentsController.update)
router.delete('/departments/:id', authenticateUser, departmentsController.destroy)

// // for employees
router.get('/employees', authenticateUser, employeesController.list)
router.post('/employees', authenticateUser, employeesController.create)
router.get('/employees/:id', authenticateUser, employeesController.show)
router.put('/employees/:id', authenticateUser, employeesController.update)
router.delete('/employees/:id', authenticateUser, employeesController.destroy)

// // for tickets
router.get('/tickets', authenticateUser, ticketsController.list)
router.post('/tickets', authenticateUser, ticketsController.create)
router.get('/tickets/:id', authenticateUser, ticketsController.show)
router.put('/tickets/:id', authenticateUser, ticketsController.update)
router.delete('/tickets/:id', authenticateUser, ticketsController.destroy)

module.exports = router