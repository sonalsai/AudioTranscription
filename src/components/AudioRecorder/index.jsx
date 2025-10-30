import { useEffect } from "react";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import "./style.scss";
import useRecording from "../../hooks/useRecording";

const RecordingSection = ({ setTranscriptionText, isRecording, setIsRecording }) => {
  const {
    isRecording: isRecordingHook,
    setIsRecording: setIsRecordingHook,
    isMuted,
    setIsMuted,
    recordingTime,
    isStopping,
    handleStopTranscription,
    startTranscription,
    formatTime,
  } = useRecording(setTranscriptionText);

  useEffect(() => {
    setIsRecording(isRecordingHook);
  }, [isRecordingHook, setIsRecording]);

  return (
    <div className="recording-panel">
      {!isRecordingHook ? (
        <div className="recording-center">
          <button className="mic-button" onClick={startTranscription}>
            <MicRoundedIcon sx={{ fontSize: 56, color: "#1e1e1e" }} />
          </button>
          <div className="hint">Tap to start recording</div>
        </div>
      ) : (
        <div
          className={`recording-center recording-active ${isStopping ? "stopping" : ""}`}
        >
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
          <div className="recording-status"></div>
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