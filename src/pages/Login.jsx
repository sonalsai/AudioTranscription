import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic2 } from "lucide-react";
import speechToTextSvg from "../assets/undraw_speech-to-text_4kov.svg";
import "../App.scss";
import "./Auth.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        className="auth-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Left Side - Visual */}
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
                Be a Part of
                <br />
                Something Beautiful
              </h2>
              <p>Experience the future of audio transcription.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-side">
          <div className="auth-header">
            <div className="icon-wrapper">
              <Mic2 size={32} className="main-icon" />
            </div>
            <h1>Login</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="aimerzoix@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? "Signing in..." : <>Login</>}
            </button>
          </form>

          <div className="auth-footer-text">
            Not a member? <Link to="/signup">Create an account</Link>
          </div>

          <div className="powered-by">© 2025 AudioTranscribe</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
