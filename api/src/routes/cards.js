const { Router } = require('express')
const router = Router()
let cards = require('../models/cards.json')

router.get('/', (req, res) => {
  res.json(cards)
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { amount } = req.body
  cards.find(card => {
    if (card.id == id)
      card.amount -= amount
  })
  res.send('card updated')
})

module.exports = router