import emailjs from "emailjs-com";
import jwt_decode from "jwt-decode";

let token = null;
token = localStorage.getItem("token");
const decodedToken = jwt_decode(token);
const username = decodedToken.username;

const Mailer = () => {
  function sendEmail(e) {
    e.preventDefault();
    console.log(username);

    emailjs
      .sendForm(
        "service_44zx28q",
        "template_bqt69fs",
        e.target,
        "8bMqEAmin5kA_Tm_i"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <>
      <h1>Contact form</h1>
      <form onSubmit={sendEmail}>
        <label htmlFor=''>name</label>
        <input type='text' name='name' defaultValue={username} readOnly />
        {/* <label htmlFor=''>email</label>
        <input type='text' name='user_email' /> */}
        <label htmlFor=''>message</label>
        <textarea name='message' rows='4' />
        <input type='submit' value='submit' />
      </form>
    </>
  );
};

export default Mailer;
