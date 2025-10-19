import { useState, useEffect, useCallback } from "react";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import "./RecordingSection.scss";
import {
  connectWebSocket,
  startRecording,
  stopRecording,
  closeWebSocket,
} from "../../services/apiServices";

const RecordingSection = ({ setTranscriptionText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  let textFromServer = "";

  const handleStopTranscription = useCallback(() => {
    console.log("Stopping transcription...");
    stopRecording();
    closeWebSocket();
    setIsRecording(false);
    setIsMuted(false);
    setRecordingTime(0);
  }, []);

  const startTranscription = useCallback(() => {
    console.log("Starting transcription...");
    setIsRecording(true);

    const onOpen = () =>
      console.log("WebSocket connection opened, waiting for server ready...");
    const onMessage = (data) => {
      console.log("Transcription result:", data);
      if (data.channel && data.channel.alternatives[0]) {
        const transcript = data.channel.alternatives[0].transcript;
        if (transcript && transcript.trim().length > 0) {
          textFromServer += transcript + " ";
          setTranscriptionText(textFromServer);
        }
      }
    };
    const onClose = () => console.log("WebSocket connection closed.");
    const onError = (error) => {
      console.error("WebSocket error:", error);
      handleStopTranscription(); // Stop everything on error
    };
    const onServerReady = () => {
      console.log("✅ Server ready, starting recording...");
      startRecording(() => {});
    };

    connectWebSocket(onOpen, onMessage, onClose, onError, onServerReady);
  }, [setTranscriptionText, handleStopTranscription]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isRecording && !isMuted) {
      interval = setInterval(() => {
        setRecordingTime((time) => time + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isMuted]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="recording-panel">
      {!isRecording ? (
        <div className="recording-center">
          <button
            className="mic-button"
            onClick={startTranscription}
          >
            <MicRoundedIcon sx={{ fontSize: 56, color: "#1e1e1e" }} />
          </button>
          <div className="hint">Tap to start recording</div>
        </div>
      ) : (
        <div className="recording-center recording-active">
          <div className="mic-container">
            <div className={`mic-button recording ${isMuted ? "muted" : ""}`}>
              <div className="timer-display">{formatTime(recordingTime)}</div>
            </div>
            <div className={`pulse-ring ${isMuted ? "muted" : ""}`}></div>
            <div
              className={`pulse-ring ${isMuted ? "muted" : ""}`}
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className={`pulse-ring ${isMuted ? "muted" : ""}`}
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
          <div className="recording-status">
            <div className="status-indicator">
              <div
                className={`status-dot ${isMuted ? "muted" : "active"}`}
              ></div>
              <span>{isMuted ? "Muted" : "Recording..."}</span>
            </div>
          </div>
          <div className="toolbar">
            <button
              className={`toolbar-btn mute-btn ${isMuted ? "muted" : ""}`}
              onClick={() => setIsMuted((v) => !v)}
            >
              <MicOffRoundedIcon sx={{ fontSize: 20, color: "#1e1e1e" }} />
            </button>
            <button
              className="toolbar-btn stop-btn"
              onClick={handleStopTranscription}
            >
              <StopRoundedIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordingSection;
