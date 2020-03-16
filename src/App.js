import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import Header from './layout/Header';
import Transactions from './components/Transactions';
import Cards from './components/Cards';
import AddTransaction from './components/AddTransaction';
import Axios from 'axios';
class App extends Component {
  state = {
    cards: [],
    transactions: []
  }

  refresh = () => {
    Axios.get('http://localhost:3001/api/cards')
      .then(res => this.setState({ cards: res.data }))

    Axios.get('http://localhost:3001/api/transactions')
      .then(res => this.setState({ transactions: res.data.reverse() }))
  }

  getCardAmountTotal = (cards) => {
    const amountCards = [];
    cards.map(card => {
      amountCards.push(card.amount)
    })
    return amountCards.reduce((a, b) => a + b, 0)
  }

  handleSubmit = transaction => {
    Axios.put(`http://localhost:3001/api/cards/${transaction.source}`, transaction)
      .then(_ => {
        Axios.get('http://localhost:3001/api/cards')
          .then(res => this.setState({ cards: res.data }))
      })

    Axios.post('http://localhost:3001/api/transactions', transaction)
      .then(_ => {
        this.setState({ transactions: [transaction, ...this.state.transactions] })
      })
  }

  componentDidMount() {
    Axios.get('http://localhost:3001/api/cards')
      .then(res => this.setState({ cards: res.data }))

    Axios.get('http://localhost:3001/api/transactions')
      .then(res => this.setState({ transactions: res.data.reverse() }))
  }


  render() {
    const { transactions, cards } = this.state;

    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container py-4">
            <div className="row">
              <div className="col-3">
                <h2 className="h5">Total amount</h2>
                <div className="card bg-light mb-4">
                  <div className="card-body">
                    <span className="h5">${this.getCardAmountTotal(this.state.cards)}</span>
                  </div>
                </div>

                <Cards cards={cards} />
              </div>
              <div className="col-9">

                <Route exact path="/">
                  <Transactions refresh={this.refresh} transactions={transactions} />
                </Route>
                <Route
                  path="/add-transaction"
                  render={(props) => <AddTransaction handleSubmit={this.handleSubmit} />}
                />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;