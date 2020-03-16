const { Router } = require('express')
const router = Router()
let transactions = require('../models/transactions.json')

router.get('/', (req, res) => {
  res.json(transactions)
})

router.post('/', (req, res) => {
  const { amount, source, name } = req.body
  if (amount && source && name) {
    id = transactions.length + 1;
    const newTransaction = { id, ...req.body }
    transactions.push(newTransaction)
    res.json(transactions)
  }
  else {
    res.send('wrong request')
  }
})

module.exports = router