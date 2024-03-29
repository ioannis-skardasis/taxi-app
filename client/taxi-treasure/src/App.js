import "./App.css";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import About from "./Components/About";
import AddItem from "./Components/AddItem";
import AllFound from "./Components/AllFound";
import AllLost from "./Components/AllLost";
import UserItems from "./Components/UserItems";
import Footer from "./Components/Footer";
import Mailer from "./Components/Mailer";
import Faq from "./Components/Faq";
import Contact from "./Components/Contact";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/signup' element={<Signup onLogin={handleLogin} />} />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='/addItem' element={<AddItem />} />
        <Route path='/allItems/found' element={<AllFound />} />
        <Route path='/allItems/lost' element={<AllLost />} />
        <Route path='/UserItems' element={<UserItems />} />
        <Route path='/mailer' element={<Mailer />} />
        <Route path='/about' element={<About />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
