import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  const handleDownload = () => {
    console.log('Download btn pressed and user id   ', user.email);
    // user id and search expense and map 
  }

  return (
    <header>
      <div className="container">
        <Link to="/" className="justify_between">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/XELogo_RGB.svg/1200px-XELogo_RGB.svg.png" width={24} height={24} style={{ marginRight: '1rem' }} />
          <h3 className="app-title">Expense Calculator</h3>
        </Link>
        <img src="https://cdn-icons-png.flaticon.com/512/6565/6565893.png" width={24} height={24} className="cursor_pointer" onClick={handleDownload} />
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar