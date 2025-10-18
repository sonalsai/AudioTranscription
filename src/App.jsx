import RecordingSection from "./components/RecordingSection";
import TranscriptionSection from "./components/TranscriptionSection";
import './App.scss'

function App() {
  return (
    <div className="app-shell">
      <div className="app-header">Real-time Transcription Prototype</div>
      <div className="content-grid">
        <div>
          <RecordingSection />
        </div>
        <div>
          <TranscriptionSection />
        </div>
      </div>
    </div>
  );
}

export default App;
