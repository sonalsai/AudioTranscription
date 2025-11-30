import { useEffect, useRef, useState } from "react";
import { FileText, Trash2 } from "lucide-react";
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
      <div className="transcription-header">
        <div className="header-content">
          <FileText size={24} strokeWidth={2} />
          <h2>Transcription</h2>
        </div>
        <button
          className="clear-btn"
          onClick={clearTranscription}
          disabled={isRecording || !transcriptionText}
          title="Clear transcription"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="transcription-divider"></div>

      <div className="transcription-text" ref={textRef}>
        {displayedText ? (
          <p className="text-content">
            {displayedText}
            {showCursor && <span className="typing-cursor">|</span>}
          </p>
        ) : (
          <p className="placeholder">
            <span className="placeholder-icon">🎙️</span>
            <span>Transcribed text will appear here...</span>
            <span className="placeholder-hint">Start recording to begin</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default TranscriptionSection;
