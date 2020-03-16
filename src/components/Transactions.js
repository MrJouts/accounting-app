import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import TransactionItem from './TransactionItem';

function Transactions(props) {

  const getTotal = (transactions) => {
    const amountTransactions = [];
    transactions.map(transaction => {
      amountTransactions.push(transaction.amount)
    })
    return amountTransactions.reduce((a, b) => a + b, 0)
  }

  return (
    <div>
      <h2 className="h5">Transactions</h2>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-2 font-weight-bold">
            <div>
              <span className="mr-2">Total:</span>
              <span>${getTotal(props.transactions)}</span>
            </div>
            <div>
              <div className="btn btn-sm btn-light mr-2" onClick={props.refresh}>Refresh</div>
              <Link className="btn btn-sm btn-dark" to="add-transaction">New Transaction</Link>
            </div>
          </div>
          <div>
            <ul className="list-group list-group-flush">
              {
                props.transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// PropTypes
Transactions.propTypes = {
  transactions: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired
}

export default Transactions;