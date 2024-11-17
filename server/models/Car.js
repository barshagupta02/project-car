const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Car name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxLength: [1000, 'Description cannot be longer than 1000 characters']
  },
  images: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 10;
      },
      message: 'Cannot have more than 10 images'
    },
    required: [true, 'At least one image is required']
  },
  tags: {
    car_type: {
      type: String
    },
    company: {
      type: String
    },
    dealer: {
      type: String
    },
    fuel_type: {
      type: String
    },
    transmission: {
      type: String
    },
    additional_tags: {
      type: [String],
      default: []
    }
  },
  price: {
    type: Number
  },
  year: {
    type: Number
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: [true, 'Car must belong to a user']
  }
}, {
  timestamps: true
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;