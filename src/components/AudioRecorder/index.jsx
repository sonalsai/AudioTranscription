import { useEffect } from "react";
import { Mic } from "lucide-react";
import { IoMic, IoMicOff, IoStop } from "react-icons/io5";
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
    if (setAppState) {
      setAppState(isRecordingHook ? "recording" : "idle");
    }
  }, [isRecordingHook, setIsRecording, setAppState]);

  return (
    <div className="recording-panel">
      {!isRecordingHook ? (
        <div className="recording-center">
          <div className="mic-wrapper">
            <button className="mic-button" onClick={startTranscription}>
              <Mic size={56} strokeWidth={2} />
            </button>
          </div>
          <div className="hint">Tap to start recording</div>
        </div>
      ) : (
        <div
          className={`recording-center recording-active ${
            isStopping ? "stopping" : ""
          }`}
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
          <div className="recording-status">
            <span className="recording-dot"></span>
            <span className="recording-text">Recording...</span>
          </div>
          <div className="toolbar">
            <button
              className={`toolbar-btn mute-btn ${isMuted ? "muted" : ""}`}
              onClick={() => setIsMuted((v) => !v)}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <IoMicOff size={40} /> : <IoMic size={40} />}
            </button>
            <button
              className="toolbar-btn stop-btn"
              onClick={handleStopTranscription}
              title="Stop Recording"
            >
              <IoStop size={40} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordingSection;
