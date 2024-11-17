import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateCar.css';

const CreateCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [],
    tags: {
      car_type: '',
      company: '',
      dealer: '',
      fuel_type: '',
      transmission: '',
      additional_tags: ''
    },
    price: '',
    year: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if it's a field in the tags object
    if (name.startsWith('tags.')) {
      const tagName = name.split('.')[1]; // Get the tag field name (e.g., 'company', 'fuel_type')
      setFormData({
        ...formData,
        tags: {
          ...formData.tags,
          [tagName]: value
        }
      });
    } else if (name === 'images') {
      setFormData({
        ...formData,
        [name]: Array.from(e.target.files)
      });
    } else if (name === 'tags.additional_tags') {
      // Handle additional tags as a comma-separated string
      setFormData({
        ...formData,
        tags: {
          ...formData.tags,
          additional_tags: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.year || !formData.images.length) {
      setError('Please fill in all required fields');
      return;
    }

    setError('');
    setSuccess('');

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('year', formData.year);

    formData.images.forEach((image) => {
      formDataToSubmit.append('images', "dasjhfsja.jpg"); // Append image files
    });

    // Append tags
    Object.keys(formData.tags).forEach((key) => {
      formDataToSubmit.append(`tags.${key}`, formData.tags[key]);
    });

    axios
      .post('http://localhost:3001/cars', formDataToSubmit, {
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setSuccess('Car created successfully');
        setFormData({
          name: '',
          description: '',
          images: [],
          tags: {
            car_type: '',
            company: '',
            dealer: '',
            fuel_type: '',
            transmission: '',
            additional_tags: ''
          },
          price: '',
          year: ''
        });
        navigate('/mycars'); // Redirect after successful creation
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Something went wrong');
      });
  };

  return (
    <div className="create-car-container">
      <div className="create-car-box">
        <h2>Create New Car</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Car Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter car name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter car description"
              value={formData.description}
              onChange={handleChange}
              maxLength={1000}
            />
          </div>
          <div className="input-group">
            <label htmlFor="images">Images</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter car price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Enter car year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="tags.car_type">Car Type</label>
            <input
              type="text"
              id="tags.car_type"
              name="tags.car_type"
              placeholder="Enter car type"
              value={formData.tags.car_type}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="tags.company">Company</label>
            <input
              type="text"
              id="tags.company"
              name="tags.company"
              placeholder="Enter car company"
              value={formData.tags.company}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="tags.fuel_type">Fuel Type</label>
            <input
              type="text"
              id="tags.fuel_type"
              name="tags.fuel_type"
              placeholder="Enter fuel type"
              value={formData.tags.fuel_type}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="tags.transmission">Transmission</label>
            <input
              type="text"
              id="tags.transmission"
              name="tags.transmission"
              placeholder="Enter transmission type"
              value={formData.tags.transmission}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="tags.additional_tags">Additional Tags</label>
            <input
              type="text"
              id="tags.additional_tags"
              name="tags.additional_tags"
              placeholder="Enter additional tags (comma separated)"
              value={formData.tags.additional_tags}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="create-car-btn">Create Car</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCar;
