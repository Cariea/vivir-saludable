import Link from 'next/link'
import './login.css'
export const Login = () =>{
  return (
    <div>
      <h2 className="log-in">Log in</h2>
      <form className="login-form">
        <div className='form-content'>
          <div className="id-card">
            <label htmlFor="">cedula</label>
            <input type="text" placeholder="Username" />
          </div>
          <div className="password">
            <label htmlFor="">contraseña</label>
            <input type="password" placeholder="Password" />
          </div>
          <div className="forgot-password">
            <Link href="/remember-me">Forgot your password?</Link>
          </div>
          <div className="submit-btn">
            <button type="submit">Log in</button>
          </div>
        </div>
      </form>
    </div>
  )
}