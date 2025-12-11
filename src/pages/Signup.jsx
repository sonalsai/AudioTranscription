import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic2, ArrowRight } from "lucide-react";
import speechToTextSvg from "../assets/undraw_speech-to-text_4kov.svg";
import "./Auth.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-wrapper reversed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Visual Side (Will be on Right due to reversed class) */}
        <div className="auth-visual-side">
          <div className="visual-content">
            <div className="visual-logo">
              <Mic2 size={24} currentColor />
            </div>

            <div className="visual-illustration">
              <img
                src={speechToTextSvg}
                alt="Speech to Text Illustration"
                style={{
                  maxWidth: "80%",
                  height: "auto",
                  maxHeight: "350px",
                  objectFit: "contain",
                }}
              />
            </div>

            <div className="visual-text">
              <h2>
                Join the
                <br />
                Revolution
              </h2>
              <p>Create your account and start transcribing in seconds.</p>
            </div>
          </div>
        </div>

        {/* Form Side (Will be on Left due to reversed class) */}
        <div className="auth-form-side">
          <div className="auth-header">
            <div className="icon-wrapper">
              <Mic2 size={32} className="main-icon" />
            </div>
            <h1>Create Account</h1>
            <p>Start transcribing your audio today</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? (
                "Creating Account..."
              ) : (
                <>
                  Sign Up <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer-text">
            Already have an account? <Link to="/">Sign in</Link>
          </div>

          <div className="powered-by">© 2025 AudioTranscribe AI</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
