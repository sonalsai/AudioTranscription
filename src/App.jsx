import RecordingSection from "./components/AudioRecorder";
import TranscriptionSection from "./components/TranscriptDisplay";
import StateIndicator from "./components/StateIndicator";
import "./App.scss";
import { githubLogo } from "./assets";
import { useState, useEffect } from "react";
import { Mic2 } from "lucide-react";
import { motion } from "framer-motion";

const STORAGE_KEY = "audioTranscriptionText";

const App = () => {
  // Load transcription from session storage on mount
  const [transcriptionText, setTranscriptionText] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved || "";
  });
  const [isRecording, setIsRecording] = useState(false);
  const [appState, setAppState] = useState("idle"); // idle, recording, transcribing, processing

  // Save transcription to session storage whenever it changes
  useEffect(() => {
    if (transcriptionText) {
      sessionStorage.setItem(STORAGE_KEY, transcriptionText);
    }
  }, [transcriptionText]);

  const clearTranscription = () => {
    setTranscriptionText("");
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="app-shell">
      <motion.div
        className="app-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="header-left">
          <div className="app-icon">
            <Mic2 size={24} color="white" />
          </div>
          <h1>Audio Transcription Dashboard</h1>
        </div>
        <motion.div
          className="github-link"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            window.open(
              "https://github.com/sonalsai/AudioTranscription",
              "_blank"
            )
          }
        >
          <img src={githubLogo} alt="GitHub" />
        </motion.div>
      </motion.div>

      <StateIndicator state={isRecording ? "recording" : "idle"} />

      <div className="content-grid">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <RecordingSection
            setTranscriptionText={setTranscriptionText}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            setAppState={setAppState}
          />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <TranscriptionSection
            transcriptionText={transcriptionText}
            clearTranscription={clearTranscription}
            isRecording={isRecording}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default App;
