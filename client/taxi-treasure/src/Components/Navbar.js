import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../Components/icons/taxi.png";
import Treasure from "../Components/icons/treasure-chest.png";
import UserItems from "./UserItems";
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
      <nav>
        <div className='dropdown'>
          <button className='dropbtn'>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className='dropdown-content'>
            <Link to='/allItems/found'>Found Items</Link>
            <Link to='/allItems/lost'>Lost Items</Link>
          </div>
        </div>
      </nav>
      <nav className='logo'>
        <img src={Logo} alt='Logo' />
        <Link to='/'>Taxi Treasures</Link>
        <img id='treasure' src={Treasure} alt='Treasure' />
      </nav>
      <nav>
        {loggedIn ? (
          <>
            <Link to='/addItem'>
              <FaPlus />
            </Link>
            <Link to="/UserItems">
              {decoded ? decoded.username : null}
            </Link>
            <Link onClick={logout} to='/'>
              <FaSignOutAlt />
            </Link>
          </>
        ) : (
          <>
            <Link to='/login'>
              <FaUser />
            </Link>
            <Link to='/signup'>Signup</Link>
          </>
        )}
      </nav>      
    </div>
  );
}

export default Navbar;
