import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isForgetPassword, setIsForgetPassword] = useState(false)
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  const goBackToLogin = () => {
    setIsForgetPassword(false)
  }

  const handleForgetPassword = (email) => {
    console.log('Forget Password Email: ', email);
    setIsForgetPassword(true)
  }

  return (
    <>
      { isForgetPassword == false ? 
      <form className="login" onSubmit={handleSubmit}>
        <h3 className="app-title">Log In</h3>
        <label>Email address:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          />
          <label>Password:</label>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />
          <div className="action_btn">
            <button disabled={isLoading}>Log in</button>
            <a onClick={() => {handleForgetPassword(email)}}>forget password?</a>
          </div>
          {error && <div className="error">{error}</div>}
          </form>
        :
        <form className="login" onSubmit={handleSubmit}>
          <h3 className="app-title">Reset Password</h3>
          <label>Email address:</label>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
          />
          <div className="action_btn">
            <button disabled={isLoading}>Reset</button>
            <a onClick={goBackToLogin}>go back to login</a>
          </div>
        </form>
      }
    </>
  )
}

export default Login