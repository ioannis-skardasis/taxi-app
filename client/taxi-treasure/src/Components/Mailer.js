import emailjs from "emailjs-com";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Mailer.css";

const Mailer = () => {
  const location = useLocation();
  const data = location.state;
  const { email } = data;

  let token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const username = decodedToken.username;

  function sendEmail(e) {
    e.preventDefault();
    console.log(username);
    console.log(email);

    emailjs
      .sendForm(
        "service_hxxncqs",
        "template_90j3j77",
        e.target,
        "8bMqEAmin5kA_Tm_i"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Email sent successfully!");
        },
        (error) => {
          console.log(error.text);
          toast.error("Failed to send email.");
        }
      );
  }

  return (
    <div className="mailer-container">
      <ToastContainer />
      <h1>Contact form</h1>
      <form onSubmit={sendEmail} className="mailer-form">
        <label htmlFor=''>name</label>
        <input type='text' name='name' defaultValue={username} readOnly />
        <label htmlFor=''>email</label>
        <input type='password' name='user_email' defaultValue={email} readOnly />
        <label htmlFor=''>message</label>
        <textarea name='message' rows='4' />
        <input type='submit' value='submit' className="submit-btn" />
      </form>
    </div>
  );
};

export default Mailer;
