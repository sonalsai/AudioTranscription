import RecordingSection from "./components/RecordingSection/RecordingSection";
import TranscriptionSection from "./components/TranscriptionSection/TranscriptionSection";
import "./App.scss";
import { githubLogo } from "./assets";
import { useState } from "react";

function App() {
  const [transcriptionText, setTranscriptionText] = useState("");

  return (
    <div className="app-shell">
      <div className="app-header">
        <h1>Audio to Text Converter</h1>
        <img
          src={githubLogo}
          alt="github logo"
          onClick={() =>
            window.open(
              "https://github.com/sonalsai/AudioTranscription",
              "_blank"
            )
          }
        />
      </div>
      <div className="content-grid">
        <div>
          <RecordingSection setTranscriptionText={setTranscriptionText} />
        </div>
        <div>
          <TranscriptionSection transcriptionText={transcriptionText} />
        </div>
      </div>
    </div>
  );
}

export default App;
