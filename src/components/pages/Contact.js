import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import initIcons from "../../icons/icons";

let countRef = 0;
initIcons();

export default function Contact() {
  const [isLoggedIn, setIsLoggedIn] = useState("NOT_EMAIL_SUBMITTED");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.reset();
        emailRef.current.focus();
        setIsLoggedIn("EMAIL_SUBMITTED");
      })
      .catch(console.error)
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div className="contact">
      <h1>Contact Form</h1>

      <form onSubmit={handleSubmit}>
        <div className="contact-form-wrapper">
          <div className="contact-info">
            <label htmlFor="email-entry">
              <FontAwesomeIcon icon="envelope" />
            </label>
            <input
              id="contact-input"
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
            />
          </div>

          <div className="contact-info">
            <label htmlFor="name-input">
              <FontAwesomeIcon icon="user" />
            </label>
            <input
              id="contact-input"
              type="text"
              name="contact-first-name"
              placeholder="First Name"
            />
          </div>

          <div className="contact-info">
            <label htmlFor="name-input">
              <FontAwesomeIcon icon="user" />
            </label>
            <input
              id="contact-input"
              type="text"
              name="contact-last-name"
              placeholder="Last Name"
            />
          </div>

          <label htmlFor="subject-input">
            <FontAwesomeIcon icon="pen" />
          </label>
          <input
            id="contact-input"
            type="text"
            name="subject-text"
            placeholder="Subject"
          />
        </div>
        <div>
          <label htmlFor="subject-input"></label>
          <textarea
            id="message-input"
            type="text"
            name="subject-text"
            maxLength={250}
            rows={10}
            cols={85}
            placeholder="Enter Message Here"
          />
        </div>

        <div>
          {isSubmitting ? (
            <FontAwesomeIcon icon="spinner" spin />
          ) : (
            <button>Submit</button>
          )}
        </div>
      </form>
      <p>Mail me Personally!</p>
      <p>Name: Final Capstone </p>
      <p>Phone: 801-888-8888</p>
      <p>Emial: hereisanemail@email.com</p>
      <p>Hours: Open 24/7</p>

      {isLoggedIn === "EMAIL_SUBMITTED" && (
        <div>
          <h1>Thank you for your inquiry!</h1>
        </div>
      )}
    </div>
  );
}
