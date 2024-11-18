import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateCar.css';

const CreateCar = () => {
  const navigate = useNavigate();
  const MAX_IMAGES = 10; // Maximum number of images allowed

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
  const [uploading, setUploading] = useState(false);

  // Cloudinary configuration
  const CLOUD_NAME = "da8v3uc6w";
  const UPLOAD_PRESET = "car-app";

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    // Check if adding new files would exceed the limit
    if (formData.images.length + files.length > MAX_IMAGES) {
      setError(`You can only upload up to ${MAX_IMAGES} images. You currently have ${formData.images.length} images.`);
      return;
    }

    setUploading(true);
    setError('');

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );

        return response.data.secure_url;
      });

      const imageUrls = await Promise.all(uploadPromises);

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
    } catch (err) {
      setError('Failed to upload images. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      // Reset the file input
      e.target.value = '';
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
    setError(''); // Clear any existing errors when removing images
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('tags.')) {
      const tagName = name.split('.')[1];
      setFormData({
        ...formData,
        tags: {
          ...formData.tags,
          [tagName]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.year || !formData.images.length) {
      setError('Please fill in all required fields');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3001/cars', 
        {
          ...formData,
          images: formData.images
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

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
      navigate('/mycars');
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
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
            <label htmlFor="images">
              Images ({formData.images.length}/{MAX_IMAGES})
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageUpload}
              accept="image/*"
              disabled={uploading || formData.images.length >= MAX_IMAGES}
              required={formData.images.length === 0}
              className="file-input"
            />
            {formData.images.length >= MAX_IMAGES && (
              <p className="limit-message">Maximum number of images reached</p>
            )}
            {uploading && (
              <div className="upload-status">
                <div className="spinner"></div>
                <span>Uploading images...</span>
              </div>
            )}
            <div className="image-preview">
              {formData.images.map((url, index) => (
                <div key={index} className="image-preview-item">
                  <img src={url} alt={`Car preview ${index + 1}`} />
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)}
                    className="remove-image-btn"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Rest of the form fields remain the same */}
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
          <button 
            type="submit" 
            className="create-car-btn"
            disabled={uploading}
          >
            Create Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCar;