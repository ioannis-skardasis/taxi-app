import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

function Navbar(props) {
  const [loggedIn, setLoggedIn] = useState(props.isLoggedIn);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  let decoded;

  if (token) {
    try {
      decoded = jwt_decode(token);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  useEffect(() => {
    setLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  function logout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    props.onLogout();
    navigate("/");
  }

  return (
    <div className='navbar'>
      <nav className='nav-links'>
        <Link to='/home' className='nav-link'>
          Home
        </Link>
        <Link to='/allItems/found' className='nav-link'>
          Found Items
        </Link>
        <Link to='/allItems/lost' className='nav-link'>
          Lost Items
        </Link>
        <Link to='/about' className='nav-link'>
          About
        </Link>
        <Link to='/faq' className='nav-link'>
          FAQ
        </Link>
        <Link to='/contact' className='nav-link'>
          Contact us
        </Link>
      </nav>
      <nav>
        {loggedIn ? (
          <>
            <Link to='/addItem' className='nav-link' title='Add Item'>
              <FaPlus />
            </Link>
            <Link to='/UserItems' className='nav-link' title='User Items'>
              {decoded ? decoded.username : null}
            </Link>
            <Link onClick={logout} to='/' className='nav-link' title='Logout'>
              <FaSignOutAlt />
            </Link>
          </>
        ) : (
          <>
            <Link to='/login' className='nav-link' title='Login'>
              <FaUser />
            </Link>
            <Link to='/signup' className='nav-link'>
              Signup
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
