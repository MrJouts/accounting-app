import React from 'react';
import PropTypes from 'prop-types';

function TransactionItem(props) {
  const { name, amount, source } = props.transaction;

  let getSource = (source) => {
    if (+source === 1) return "debit"
    if (+source === 2) return "credit"
  }

  return (
    <li className="list-group-item px-0 d-flex justify-content-between">
      <div>
        <span className="mr-2"> {name} </span>
        <span className={`badge badge-${+source === 1 ? 'info' : 'success'}`}>{getSource(source)}</span>
      </div>
      <span>${amount}</span>
    </li>
  )
}

//PropTypes
TransactionItem.propTypes = {
  transaction: PropTypes.object.isRequired
}

export default TransactionItem;