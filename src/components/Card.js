import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const { id, name, amount, number, expirationDate } = props.card;

  return (
    <div className={`card mb-2 text-white ${+id === 1 ? 'bg-success' : 'bg-info'}`}>
      <div className={`card-body d-flex flex-column`}>
        <div className="d-flex justify-content-between align-items-baseline">
          <h2 className="h6 card-title">{name}</h2>
          <span className="font-weight-bold">${amount}</span>
        </div>
        <span className="card-text">{number}</span>
        <small className="card-text">Valid thru: {expirationDate}</small>
      </div>
    </div>

  )
}

// PropTypes
Card.propTypes = {
  card: PropTypes.object.isRequired
}

export default Card;