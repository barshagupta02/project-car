const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const carController = require('../controllers/carController')

// Define all routes here
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);


router.get('/cars', carController.getAllCars)

module.exports = router;