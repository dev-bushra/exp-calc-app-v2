const Expense = require('../models/expenseModel')
const mongoose = require('mongoose')

// get all expense
const getExpense = async (req, res) => {
  const user_id = req.user._id

  const expense = await Expense.find({user_id}).sort({createdAt: -1})

  res.status(200).json(expense)
}

// get expense withing the date range
const getDateRangeExpense = async (req, res) => {
  const user_id = req.user._id;
  const selectedMonth = req.body.selectedMonth;
  const endDate = new Date();
  const query = {
    user_id: user_id,
    createdAt: {
      $gte: selectedMonth,
      $lte: endDate,
    },
  };

  const expense = await Expense.find(query).sort({ createdAt: -1 });

  res.status(200).json(expense);
};

// get a single expense
const getSingleExpense = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such expense'})
  }

  const expense = await Expense.findById(id)

  if (!expense) {
    return res.status(404).json({error: 'No such expense'})
  }
  
  res.status(200).json(expense)
}


// create new expense
const createExpense = async (req, res) => {
  const {title, price, quantity} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!price) {
    emptyFields.push('price')
  }
  if(!quantity) {
    emptyFields.push('quantity')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const expense = await Expense.create({title, price, quantity, user_id})
    res.status(200).json(expense)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a expense
const deleteExpense = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such expense'})
  }

  const expense = await Expense.findOneAndDelete({_id: id})

  if (!expense) {
    return res.status(400).json({error: 'No such expense'})
  }

  res.status(200).json(expense)
}

// update a expense
const updateExpense = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such expense'})
  }

  const expense = await Expense.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!expense) {
    return res.status(400).json({error: 'No such expense'})
  }

  res.status(200).json(expense)
}


module.exports = {
  getExpense,
  getSingleExpense,
  createExpense,
  deleteExpense,
  updateExpense,
  getDateRangeExpense,
};