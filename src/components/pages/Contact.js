import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import initIcons from "../../icons/icons";

let countRef = 0;
initIcons();

export default function Contact() {
  const [isLoggedIn, setIsLoggedIn] = useState("NOT_LOGGED_IN");
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
        setIsLoggedIn("LOGGED_IN");
      })
      .catch(console.error)
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div className="Contact">
      <h1>Contact Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-entry">
            <FontAwesomeIcon icon="envelope" />
          </label>
          <input
            id="email-field"
            type="email"
            name="email"
            placeholder="Email"
            ref={emailRef}
          />
        </div>

        <div>
          <label htmlFor="name-input">
            <FontAwesomeIcon icon="user" />
          </label>
          <input
            id="name-input"
            type="text"
            name="contact-name"
            placeholder="Full Name"
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

      {isLoggedIn === "EMIAL_SUBMITTED" && (
        <div>
          <h1>
            Thank you for your time we will get back to you as soon as possible!
          </h1>
        </div>
      )}
    </div>
  );
}
