import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mic2,
  ArrowLeft,
  Camera,
  Mail,
  User,
  Shield,
  LogOut,
} from "lucide-react";
import "../App.scss";
import "./Profile.scss";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <motion.div
        className="app-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="header-left">
          <div
            className="back-button"
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <ArrowLeft size={20} color="white" />
            <span style={{ fontSize: "14px", fontWeight: 500 }}>Back</span>
          </div>
          <div className="app-icon" style={{ marginLeft: "12px" }}>
            <Mic2 size={24} color="white" />
          </div>
          <h1>My Profile</h1>
        </div>
        <button
          className="logout-button"
          onClick={() => navigate("/login")}
          style={{
            background: "rgba(255, 59, 48, 0.1)",
            color: "#ff3b30",
            border: "1px solid rgba(255, 59, 48, 0.2)",
          }}
        >
          <LogOut size={16} style={{ marginRight: "6px" }} />
          Sign Out
        </button>
      </motion.div>

      <motion.div
        className="profile-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="profile-card glass-strong">
          <div className="profile-header">
            <div className="avatar-wrapper">
              <div className="avatar__placeholder">
                <User size={48} color="white" />
              </div>
              <button className="edit-avatar">
                <Camera size={16} />
              </button>
            </div>
            <div className="profile-info">
              <h2>Demo User</h2>
              <p>Pro Member</p>
            </div>
          </div>

          <div className="profile-sections">
            <div className="section-group">
              <h3>Personal Information</h3>
              <div className="info-row">
                <div className="row-icon">
                  <User size={18} />
                </div>
                <div className="row-content">
                  <label>Full Name</label>
                  <input type="text" value="Demo User" readOnly />
                </div>
              </div>
              <div className="info-row">
                <div className="row-icon">
                  <Mail size={18} />
                </div>
                <div className="row-content">
                  <label>Email Address</label>
                  <input type="email" value="demo@example.com" readOnly />
                </div>
              </div>
            </div>

            <div className="section-group">
              <h3>Security</h3>
              <div className="info-row click-row">
                <div className="row-icon">
                  <Shield size={18} />
                </div>
                <div className="row-content">
                  <label>Change Password</label>
                  <p>Last changed 30 days ago</p>
                </div>
                <div className="row-action">Update</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
