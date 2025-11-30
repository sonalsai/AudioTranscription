import { useEffect } from "react";
import { Mic } from "lucide-react";
import { IoMic, IoMicOff, IoStop } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import "./style.scss";
import useRecording from "../../hooks/useRecording";

const RecordingSection = ({
  setTranscriptionText,
  isRecording,
  setIsRecording,
  setAppState,
}) => {
  const {
    isRecording: isRecordingHook,
    recordingTime,
    isMuted,
    setIsMuted,
    startTranscription,
    handleStopTranscription,
    isStopping,
  } = useRecording(setTranscriptionText);

  useEffect(() => {
    setIsRecording(isRecordingHook);
    if (setAppState) {
      setAppState(isRecordingHook ? "recording" : "idle");
    }
  }, [isRecordingHook, setIsRecording, setAppState]);

  return (
    <div className="recording-panel">
      <AnimatePresence mode="wait">
        {!isRecording ? (
          <motion.div
            key="idle"
            className="recording-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mic-wrapper">
              <motion.button
                className="mic-button"
                onClick={startTranscription}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Mic size={56} strokeWidth={2} />
              </motion.button>
            </div>
            <motion.div
              className="hint"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Tap to start recording
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="recording"
            className={`recording-center recording-active ${
              isStopping ? "stopping" : ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mic-container">
              <motion.div
                className={`mic-button recording ${isMuted ? "muted" : ""}`}
                animate={{
                  scale: isMuted ? 1 : [1, 1.05, 1],
                  boxShadow: isMuted
                    ? "0 8px 32px rgba(0, 0, 0, 0.2)"
                    : [
                        "0 8px 32px rgba(0, 255, 163, 0.4)",
                        "0 0 60px rgba(0, 255, 163, 0.6)",
                        "0 8px 32px rgba(0, 255, 163, 0.4)",
                      ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="timer-display">{formatTime(recordingTime)}</div>
              </motion.div>

              {/* Pulse Rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`pulse-ring ${isMuted ? "muted" : ""}`}
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{
                    scale: 2.5,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            <motion.div
              className="recording-status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="recording-dot"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="recording-text">
                {isStopping ? "Stopping..." : "Recording..."}
              </span>
            </motion.div>

            <motion.div
              className="toolbar"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <motion.button
                className={`toolbar-btn mute-btn ${isMuted ? "muted" : ""}`}
                onClick={() => setIsMuted((v) => !v)}
                title={isMuted ? "Unmute" : "Mute"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <IoMicOff size={40} /> : <IoMic size={40} />}
              </motion.button>
              <motion.button
                className="toolbar-btn stop-btn"
                onClick={handleStopTranscription}
                title="Stop Recording"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoStop size={40} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export default RecordingSection;
