import React from 'react';
import './card.css';

const Card = ({ name, type, species, description }) => {
    return (
        <div className="card">
            <h2 className="card-name">{name}</h2>
            <p className="card-type">Type: {type}</p>
            <p className="card-species">Species: {species}</p>
            <p className="card-description">{description}</p>
        </div>
    );
};

export default Card;