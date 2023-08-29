import { createContext, useReducer } from 'react'

export const ExpensesContext = createContext()

export const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPENSES': 
      return {
        expense: action.payload
      }
    case 'CREATE_EXPENSE':
      return {
        expense: [action.payload, ...state.expense]
      }
    case 'DELETE_EXPENSE':
      return {
        expense: state.expense.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ExpensesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, {
    expense: null
  })

  return (
    <ExpensesContext.Provider value={{...state, dispatch}}>
      { children }
    </ExpensesContext.Provider>
  )
}