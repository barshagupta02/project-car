// src/pages/CarDetails.js
import React, { useEffect, useState } from 'react';
import { useHistory, useNavigate, useParams } from 'react-router-dom'; // Assuming you're using React Router
import './CarDetails.css';
import axios from 'axios';

const CarDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Id", id);

  const handleEdit = () => {
    // Navigate to the edit page (you'll implement the edit page separately)
    // history.push(`/edit-car/${car._id}`);
  };

  const handleDelete = () => {
    //add confirmation dialog
    axios.delete(`http://localhost:3001/cars/${id}`, { "headers": { "authorization": localStorage.getItem('token') } })
      .then(response => {
        navigate('/mycars')
      })
      .catch(error => console.log(error))
  };

  const [car, setCar] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3001/cars/${id}`, { "headers": { "authorization": localStorage.getItem('token') } })
      .then(response => {
        console.log(response.data)
        setCar(response.data.data.car)
      })
      .catch(error => console.log(error))
  }, [id]);

  return (
    <>
      {car && (
        <div className="car-details">
          <div className="car-details-header">
            <h1 className="car-details-title">{car.name}</h1>
            <div className="car-details-actions">
              <button className="edit-btn" onClick={handleEdit}>Edit</button>
              <button className="delete-btn-car" onClick={() => handleDelete(id)}>Delete</button>
            </div>
          </div>
          <div className="car-details-content">
            <div className="car-details-images">
              {car.images.map((image, index) => (
                <img key={index} src={image} alt={`${car.name} ${index + 1}`} />
              ))}
            </div>
            <div className="car-details-info">
              <p><strong>Description:</strong> {car.description}</p>
              <p><strong>Price:</strong> ${car.price}</p>
              <p><strong>Year:</strong> {car.year}</p>
              <div className="car-details-tags">
                {car.tags.car_type && <span className="tag">{car.tags.car_type}</span>}
                {car.tags.company && <span className="tag">{car.tags.company}</span>}
                {car.tags.dealer && <span className="tag">{car.tags.dealer}</span>}
                {car.tags.fuel_type && <span className="tag">{car.tags.fuel_type}</span>}
                {car.tags.transmission && <span className="tag">{car.tags.transmission}</span>}
                {car.tags.additional_tags && car.tags.additional_tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetails;
