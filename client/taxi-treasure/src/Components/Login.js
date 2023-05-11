import { useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const usernameRef = useRef();
  const passwordRef = useRef(); 
  const navigate = useNavigate();
  const { state } = useLocation();
  const { from = "/About" } = state || {};

  async function login(e) {
    e.preventDefault();
    let user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    let response = await axios.post("http://localhost:8000/login", user);

    if (response.data.msg) {
      return alert(response.data.msg);
    }
    if (response) {
      localStorage.removeItem("token"); // Remove previous token
      localStorage.setItem("token", response.data); // Store new token
      onLogin(response.data); // Pass the token to onLogin
      navigate(from);
    }
  }

  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to='/' />;
  }

  return (
    <div className='loginformcontainer'>
      <div className='form'>
        <form onSubmit={login}>
          <h1>Login</h1>
          <label htmlFor='username'></label>
          <input
            id='username'
            type='text'
            ref={usernameRef}
            placeholder='Username'
          />
          <label htmlFor='password'></label>
          <input
            id='password'
            type='password'
            ref={passwordRef}
            placeholder='Password'
          />
          <button type='submit'>
            <span>Login</span>
          </button>
          <span>
            New user? <Link to='/signup'>create account</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
