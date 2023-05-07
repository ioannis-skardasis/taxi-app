import { useRef } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import "./Signup.css";

function Signup(props) {
  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const isDriverRef = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to='/' />;
  }

  async function createNewUser(e) {
    e.preventDefault();
    let newUser = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      isDriver: isDriverRef.current.checked,
    };
    let response = await axios.post("http://localhost:8000/signup", newUser);
    console.log(response);
    // catch an error from database
    if (response.data.msg) {
      alert(response.data.msg);
    }
    // after sign up, we log in the user
    if (response.data.token) {
      // save token to local storage
      localStorage.setItem("token", response.data.token);
      // call onLogin function passed from props
      props.onLogin();
      // navigate to home page
      navigate("/About");
    }
  }

  return (
    <div className='formcontainer'>
      <div className='form'>
        <form onSubmit={createNewUser}>
          <h1>Create account</h1>
          <label htmlFor='name'></label>
          <input id='name' type='text' ref={nameRef} placeholder='Name' />
          <br />
          <br />
          <label htmlFor='surname'></label>
          <input
            id='surname'
            type='text'
            ref={surnameRef}
            placeholder='Surname'
          />
          <br />
          <br />
          <label htmlFor='email'></label>
          <input id='email' type='email' ref={emailRef} placeholder='Email' />
          <br />
          <br />
          <label htmlFor='username'></label>
          <input
            id='username'
            type='text'
            ref={usernameRef}
            placeholder='Username'
          />
          <br />
          <br />
          <label htmlFor='password'></label>
          <input
            id='password'
            type='text'
            ref={passwordRef}
            placeholder='Password'
          />
          <br />
          <br />
          <label htmlFor='isDriver'></label>
          <input id='isDriver' type='checkbox' ref={isDriverRef} />
          <span>Are you a driver?</span>
          <br />
          <br />
          <button type='submit'>
            <span>Sign Up</span>
          </button>
          <br />
          <br />
          <span>
            Already have an account with us? Please <a href='/login'>log in</a>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
