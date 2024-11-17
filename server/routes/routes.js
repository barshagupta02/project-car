const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const carController = require('../controllers/carController')
const { login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Define all routes here
router.get('/', (req, res) => {
    res.status(200).json({
        status: "Up"
    })
})

router.post('/login', login);

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.get('/myprofile', protect, userController.getMyProfile);

router.get('/cars', carController.getAllCars) // for all thee users
router.get('/cars/:id', carController.getCar)
router.get('/mycars', protect, carController.myCars)
router.post('/cars', protect, carController.createCar)
router.put('/cars/:id', protect, carController.updateCar)
router.delete('/cars/:id', protect, carController.deleteCar)


module.exports = router;