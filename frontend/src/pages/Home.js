import { React, useEffect, useState } from "react";
import { useExpensesContext } from "../hooks/useExpensesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ExpenseDetails from '../components/ExpenseDetails'
import ExpenseForm from '../components/ExpenseForm'

const Home = () => {
  const {expense, dispatch} = useExpensesContext()
  const { user } = useAuthContext()
  const [selectedMonth, setSelectedMonth] = useState("");
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  const months = [
    "2023-12-01",
    "2023-11-01",
    "2023-10-01",
    "2023-09-01",
    "2023-08-01",
    "2023-07-01",
    "2023-06-01",
    "2023-05-01",
    "2023-04-01",
    "2023-03-01",
    "2023-02-01",
    "2023-01-01",
  ];

  const handleChange = async (event) => {
    const selectedMonth = event.target.value;
    const requestBody = { selectedMonth };

    // hit the API with the filter payload
    const response = await fetch("/api/expense/date", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    console.log("bk res: ", json);

    if (response.ok) {
      dispatch({ type: "SET_EXPENSES", payload: json });
    }
  };


  useEffect(() => {
    
    // fetch data
    const fetchExpense = async () => {
      const response = await fetch('/api/expense', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_EXPENSES', payload: json})
      }
    }

    if (user) { fetchExpense() }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="expense">
        <div>
          <label htmlFor="monthSelect">Filter by Month:</label>
          <select
            id="monthSelect"
            onChange={(e) => handleChange(e)}
            value={selectedMonth}
          >
            <option value="">All Months</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        {expense &&
          expense.map((expense) => (
            <ExpenseDetails key={expense._id} expense={expense} />
          ))}
      </div>
      <ExpenseForm />
    </div>
  );
}

export default Home