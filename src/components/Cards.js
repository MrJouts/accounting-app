import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

function Cards(props) {
  return (
    <div>
      <h2 className="h5">Wallet</h2>
      {
        props.cards.map(card => (
          <Card
            key={card.id}
            card={card}
          />
        ))
      }
    </div>
  )
}

// PropTypes
Cards.propTypes = {
  cards: PropTypes.array.isRequired
}

export default Cards;