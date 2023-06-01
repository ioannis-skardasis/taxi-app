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
    try {
      let response = await axios.post("https://taxi-treasures.onrender.com/signup", newUser);
      console.log(response);

      if (response.data.msg) {
        alert(response.data.msg);
      }

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        props.onLogin();
        navigate("/About");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating user. Please try again later.");
    }
  }

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to='/' />;
  }

  return (
    <div className='formcontainerSignup'>
      <div className='formSignup'>
        <form id="formSignup" onSubmit={createNewUser}>
          <h1 id="createAccount">Create account</h1>
          <label htmlFor='name'></label>
          <input id='name' type='text' ref={nameRef} placeholder='Name' />
          <br />
          <label htmlFor='surname'></label>
          <input
            id='surname'
            type='text'
            ref={surnameRef}
            placeholder='Surname'
          />
          <br />
          <label htmlFor='email'></label>
          <input id='email' type='email' ref={emailRef} placeholder='Email' />
          <br />
          <label htmlFor='username'></label>
          <input
            id='username'
            type='text'
            ref={usernameRef}
            placeholder='Username'
          />
          <br />
          <label htmlFor='password'></label>
          <input
            id='password'
            type='password'
            ref={passwordRef}
            placeholder='Password'
          />
          <br />
          <label htmlFor='isDriver'></label>
          <input id='isDriver' type='checkbox' ref={isDriverRef} />
          <span>Are you a driver?</span>
          <br />
          <button type='submit'>
            <span>Sign Up</span>
          </button>
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
