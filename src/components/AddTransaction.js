import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

class AddTransaction extends Component {
  state = {
    amount: 0,
    from: 1,
    to: '',
    cards: [],
    errors: {
      amount: '',
      from: '',
      to: ''
    }
  }

  onChangeAmount = (e) => this.setState({ amount: +e.target.value })
  onChangeFrom = (e) => this.setState({ from: e.target.value })
  onChangeTo = (e) => this.setState({ to: e.target.value })

  handleBlur = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let message;

    switch (name) {
      case 'amount':
        if (+value === 0) {
          message = 'The amount field can\'t be 0'
        } else {
          message = ''
        }

        this.state.cards.filter(card => {
          if (card.id === this.state.from) {
            if (this.state.amount > card.amount) {
              message = `${card.name} has insuficient founds`;
              errors.amount = message;
            }
          }
        })

        errors.amount = message;
        break;
      case 'to':
        if (value === '') {
          message = 'The to field can\'t be empty'
        } else {
          message = ''
        }
        errors.to = message;
        break;
      default:
        break;
    }
    this.setState({ errors })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let errors = this.state.errors;
    let message;

    if (this.state.amount === 0) {
      message = 'The amount field can\'t be 0';
    } else {
      message = ''
    }
    errors.amount = message;

    if (this.state.to === '') {
      message = 'The to field can\'t be empty';
    } else {
      message = ''
    }
    errors.to = message;

    this.state.cards.filter(card => {
      if (card.id === this.state.from) {
        if (this.state.amount > card.amount) {
          message = `${card.name} has insuficient founds`;
          errors.amount = message;
        }
      }
    })

    this.setState({ errors })

    if (this.validateForm(this.state.errors) && this.state.amount && this.state.to) {
      const transaction = {
        amount: this.state.amount,
        source: this.state.from,
        name: this.state.to
      }
      this.props.handleSubmit(transaction)
      this.props.history.push('/')
    }
  }

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  componentDidMount() {
    Axios.get('http://localhost:3001/api/cards')
      .then(res => this.setState({ cards: res.data }))
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h2 className="h5">Add transaction</h2>

        <form className="mt-3" onSubmit={this.handleSubmit}>

          <div className="form-group row">
            <label htmlFor="amount" className="col-sm-2 col-form-label">Amount:</label>
            <div className="col-sm-6">
              <input
                type="number"
                min="0"
                className="form-control"
                name="amount"
                id="amount"
                value={this.state.amount}
                onChange={this.onChangeAmount}
                onBlur={this.handleBlur}
              />
              {
                errors.amount.length > 0 &&
                <span className='text-danger small'>{errors.amount}</span>
              }
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="from" className="col-sm-2 col-form-label">From:</label>
            <div className="col-sm-6">
              <select
                className="form-control"
                id="from"
                value={this.state.from}
                onChange={this.onChangeFrom}>
                {
                  this.state.cards.map(card => (
                    <option key={card.id} value={card.id}>{card.name}</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="to" className="col-sm-2 col-form-label">To:</label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="to"
                id="to"
                value={this.state.to}
                onChange={this.onChangeTo}
                onBlur={this.handleBlur} />
              {
                errors.to.length > 0 &&
                <span className='text-danger small'>{errors.to}</span>
              }
            </div>
          </div>

          <Link className="btn btn-light mr-3" to="/">Cancel</Link>
          <input type="submit" value="Add transaction" className="btn btn-dark" />

        </form>
      </div>
    );
  }
}

//PropTypes
AddTransaction.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default withRouter(AddTransaction);