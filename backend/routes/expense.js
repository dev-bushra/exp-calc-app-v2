const express = require('express')
const {
  createExpense,
  getExpense,
  getSingleExpense,
  deleteExpense,
  updateExpense
} = require('../controllers/expenseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all expense routes
router.use(requireAuth)

// GET all expense
router.get('/', getExpense)

//GET a single expense
router.get('/:id', getSingleExpense)

// POST a new expense
router.post('/', createExpense)

// DELETE a expense
router.delete('/:id', deleteExpense)

// UPDATE a expense
router.patch('/:id', updateExpense)


module.exports = router