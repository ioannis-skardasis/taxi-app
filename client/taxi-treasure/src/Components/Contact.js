import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import "./Contact.css";



function Contact() {
  let token = localStorage.getItem("token");
  let decodedToken = "";
  let username = "";

  if (token) {
    try {
      decodedToken = jwt_decode(token);
      username = decodedToken.username;
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);
    }
  }

  function sendMessage(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_hxxncqs",
        "template_tkenoc4",
        e.target,
        "8bMqEAmin5kA_Tm_i"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          toast.error("Failed to send message. Please try again.");
        }
      );
  }

  if (!token) {
    return (
      <h1 id="contact-noToken">You have to log in to be able to contact us through this page.</h1>
    );
  }

  return (
    <div className='contact-container'>
      <ToastContainer />
      <h1>
        Contact us for any queries or suggestions. We will get back to you
        soon!.
      </h1>
      <form onSubmit={sendMessage} className='contactUs-form'>
        <label htmlFor=''>name</label>
        <input type='text' name='name' defaultValue={username} readOnly />
        <label htmlFor=''>message</label>
        <textarea name='message' rows='4' />
        <input type='submit' value='submit' className='submit-btn' />
      </form>
    </div>
  );
}

export default Contact;

