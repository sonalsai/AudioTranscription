import { motion } from "framer-motion";
import "./style.scss";

const StateIndicator = ({ state }) => {
  const variants = {
    idle: {
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "none",
    },
    recording: {
      width: "100%",
      backgroundColor: "#ef4444",
      boxShadow: "0 0 10px #ef4444, 0 0 20px rgba(239, 68, 68, 0.5)",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    transcribing: {
      width: "100%",
      backgroundColor: "#00FFA3",
      boxShadow: "0 0 10px #00FFA3, 0 0 20px rgba(0, 255, 163, 0.5)",
    },
    processing: {
      width: "100%",
      backgroundColor: "#38BDF8",
      boxShadow: "0 0 10px #38BDF8",
    },
  };

  return (
    <div className="state-indicator">
      <motion.div
        className={`state-bar ${state}`}
        initial="idle"
        animate={state}
        variants={variants}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
};

export default StateIndicator;
