import RecordingSection from "./components/AudioRecorder";
import TranscriptionSection from "./components/TranscriptDisplay";
import StateIndicator from "./components/StateIndicator";
import "./App.scss";
import { githubLogo } from "./assets";
import { useState, useEffect } from "react";
import { Mic2 } from "lucide-react";

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
      <div className="app-header">
        <div className="header-left">
          <div className="app-icon">
            <Mic2 size={24} color="white" />
          </div>
          <h1>Audio Transcription Dashboard</h1>
        </div>
        <div
          className="github-link"
          onClick={() =>
            window.open(
              "https://github.com/sonalsai/AudioTranscription",
              "_blank"
            )
          }
        >
          <img src={githubLogo} alt="GitHub" />
        </div>
      </div>

      <StateIndicator state={isRecording ? "recording" : "idle"} />

      <div className="content-grid">
        <div>
          <RecordingSection
            setTranscriptionText={setTranscriptionText}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            setAppState={setAppState}
          />
        </div>
        <div>
          <TranscriptionSection
            transcriptionText={transcriptionText}
            clearTranscription={clearTranscription}
            isRecording={isRecording}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
