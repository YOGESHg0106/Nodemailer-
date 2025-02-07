import { useState } from "react";
import axios from "axios";
import "./styles.css"; // Import CSS

const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    text: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://nodemailer-production.up.railway.app/send-email",
        emailData
      );
      setStatus({ message: "✅ Email Sent Successfully!", type: "success" });
    } catch (error) {
      setStatus({ message: "❌ Failed to Send Email.", type: "error" });
    }
  };

  return (
    <div className="container">
      <h2>📧 Send an Email</h2>
      <form className="email-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="to"
          placeholder="Recipient's Email"
          value={emailData.to}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={emailData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="text"
          placeholder="Message"
          value={emailData.text}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">🚀 Send Email</button>
      </form>
      {status && <p className={`status ${status.type}`}>{status.message}</p>}
    </div>
  );
};

export default EmailForm;
