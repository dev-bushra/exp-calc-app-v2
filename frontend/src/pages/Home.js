import { useEffect }from 'react'
import { useExpensesContext } from "../hooks/useExpensesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ExpenseDetails from '../components/ExpenseDetails'
import ExpenseForm from '../components/ExpenseForm'

const Home = () => {
  const {expense, dispatch} = useExpensesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/expense', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_EXPENSES', payload: json})
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="expense">
        {expense && expense.map((expense) => (
          <ExpenseDetails key={expense._id} expense={expense} />
        ))}
      </div>
      <ExpenseForm />
    </div>
  )
}

export default Home