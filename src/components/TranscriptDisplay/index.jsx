import { useEffect, useRef, useState } from "react";
import { FileText, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./style.scss";

const TranscriptionSection = ({
  transcriptionText,
  clearTranscription,
  isRecording,
}) => {
  const textRef = useRef(null);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  // Auto-scroll to bottom when new text appears
  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [displayedText]);

  // Typewriter effect
  useEffect(() => {
    if (transcriptionText.length > displayedText.length) {
      setShowCursor(true);
      const timeout = setTimeout(() => {
        setDisplayedText(transcriptionText.slice(0, displayedText.length + 1));
      }, 20);
      return () => clearTimeout(timeout);
    } else if (transcriptionText.length < displayedText.length) {
      // Text was cleared
      setDisplayedText(transcriptionText);
      setShowCursor(false);
    } else {
      // Finished typing
      const timeout = setTimeout(() => setShowCursor(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [transcriptionText, displayedText]);

  return (
    <div className="transcription-panel">
      <motion.div
        className="transcription-header"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="header-content">
          <FileText size={24} strokeWidth={2} />
          <h2>Transcription</h2>
        </div>
        <motion.button
          className="clear-btn"
          onClick={clearTranscription}
          disabled={isRecording || !transcriptionText}
          title="Clear transcription"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 size={20} />
        </motion.button>
      </motion.div>

      <div className="transcription-divider"></div>

      <div className="transcription-text" ref={textRef}>
        <AnimatePresence mode="wait">
          {displayedText ? (
            <motion.p
              key="text"
              className="text-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {displayedText}
              {showCursor && <span className="typing-cursor">|</span>}
            </motion.p>
          ) : (
            <motion.p
              key="placeholder"
              className="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.span
                className="placeholder-icon"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🎙️
              </motion.span>
              <span>Transcribed text will appear here...</span>
              <span className="placeholder-hint">Start recording to begin</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TranscriptionSection;
