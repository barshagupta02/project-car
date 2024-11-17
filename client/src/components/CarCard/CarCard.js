import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CarCard.css';

const CarCard = ({ car }) => {
  const { name, description, images, tags, price, year } = car;
  const { car_type, company, dealer, fuel_type, transmission, additional_tags } = tags || {};

  return (
    <Link to={`/mycars/${car._id}`} className="car-card" style={{ textDecoration: 'none', color: 'inherit' }}> 
      <div className="car-card-image">
        <img src={images[0]} alt={name} />
      </div>
      <div className="car-card-content">
        <h2 className="car-card-title">{name}</h2>
        <p className="car-card-description">{description}</p>
        <div className="car-card-price">
          <span className="price">${price}</span>
          <span className="year">{year}</span>
        </div>
        <div className="car-card-tags">
          {car_type && <span className="tag">{car_type}</span>}
          {company && <span className="tag">{company}</span>}
          {dealer && <span className="tag">{dealer}</span>}
          {fuel_type && <span className="tag">{fuel_type}</span>}
          {transmission && <span className="tag">{transmission}</span>}
          {additional_tags && additional_tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
