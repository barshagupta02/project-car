const Car = require('../models/Car');
exports.createCar = async (req, res) => {
    try {
        const carData = { ...req.body, owner: req.user._id };

        const car = await Car.create(carData);

        res.status(201).json({
            status: 'success',
            data: { car }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getAllCars = async (req, res) => {
    try {
        // Build search query
        let query = {};

        // Text search across name and description
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query.$or = [
                { name: searchRegex },
                { description: searchRegex }
            ];
        }

        // Tags filters
        if (req.query.car_type) query['tags.car_type'] = req.query.car_type;
        if (req.query.company) query['tags.company'] = new RegExp(req.query.company, 'i');
        if (req.query.dealer) query['tags.dealer'] = new RegExp(req.query.dealer, 'i');
        if (req.query.fuel_type) query['tags.fuel_type'] = req.query.fuel_type;
        if (req.query.transmission) query['tags.transmission'] = req.query.transmission;

        // Additional tags search
        if (req.query.tag) {
            query['tags.additional_tags'] = new RegExp(req.query.tag, 'i');
        }

        // Price range
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = parseInt(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = parseInt(req.query.maxPrice);
        }

        // Year range
        if (req.query.minYear || req.query.maxYear) {
            query.year = {};
            if (req.query.minYear) query.year.$gte = parseInt(req.query.minYear);
            if (req.query.maxYear) query.year.$lte = parseInt(req.query.maxYear);
        }

        // Availability
        if (req.query.isAvailable !== undefined) {
            query.isAvailable = req.query.isAvailable === 'true';
        }

        // Execute query without pagination
        const cars = await Car.find(query).sort(req.query.sort || '-createdAt');

        res.status(200).json({
            status: 'success',
            results: cars.length,
            data: { cars }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.myCars = async (req, res) => {
    try {
        // Build search query for the user's cars
        let query = { owner: req.user._id };

        // Text search across name and description
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query.$or = [
                { name: searchRegex },
                { description: searchRegex }
            ];
        }

        // Tags filters
        if (req.query.car_type) query['tags.car_type'] = req.query.car_type;
        if (req.query.company) query['tags.company'] = new RegExp(req.query.company, 'i');
        if (req.query.dealer) query['tags.dealer'] = new RegExp(req.query.dealer, 'i');
        if (req.query.fuel_type) query['tags.fuel_type'] = req.query.fuel_type;
        if (req.query.transmission) query['tags.transmission'] = req.query.transmission;

        // Additional tags search
        if (req.query.tag) {
            query['tags.additional_tags'] = new RegExp(req.query.tag, 'i');
        }

        // Price range
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = parseInt(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = parseInt(req.query.maxPrice);
        }

        // Year range
        if (req.query.minYear || req.query.maxYear) {
            query.year = {};
            if (req.query.minYear) query.year.$gte = parseInt(req.query.minYear);
            if (req.query.maxYear) query.year.$lte = parseInt(req.query.maxYear);
        }

        // Availability
        if (req.query.isAvailable !== undefined) {
            query.isAvailable = req.query.isAvailable === 'true';
        }

        // Execute query without pagination
        const cars = await Car.find(query).sort(req.query.sort || '-createdAt');

        res.status(200).json({
            status: 'success',
            results: cars.length,
            data: { cars }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};


exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({
                status: 'fail',
                message: 'Car not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { car }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};


exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!car) {
            return res.status(404).json({
                status: 'fail',
                message: 'Car not found or you do not have permission to update it'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { car }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};


exports.deleteCar = async (req, res) => {
    try {
        // Ensure the logged-in user owns the car
        const car = await Car.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!car) {
            return res.status(404).json({
                status: 'fail',
                message: 'Car not found or you do not have permission to delete it'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};