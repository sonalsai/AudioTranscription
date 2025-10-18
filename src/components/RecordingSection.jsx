import { useState } from "react";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import './RecordingSection.scss'

export default function RecordingSection() {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

    return (
      <div className="recording-panel">
        {!isRecording ? (
          <div className="recording-center">
            <button className="mic-button" onClick={() => setIsRecording(true)}>
              <MicRoundedIcon sx={{ fontSize: 56, color: "#7aa2f7" }} />
            </button>
            <div className="hint">Tap to start recording</div>
          </div>
        ) : (
          <div className="recording-center">
            <div className="wave-box">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className={`bar${isMuted ? " muted" : ""}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                />
              ))}
            </div>
            <div className="action-row">
              <button className="btn" onClick={() => setIsMuted((v) => !v)}>
                <MicOffRoundedIcon sx={{ verticalAlign: 'middle', marginRight: 6 }} />
                {isMuted ? "Unmute" : "Mute"}
              </button>
              <button
                className="btn primary"
                onClick={() => { setIsRecording(false); setIsMuted(false); }}
              >
                <StopRoundedIcon sx={{ verticalAlign: 'middle', marginRight: 6 }} />
                Stop
              </button>
            </div>
          </div>
        )}
      </div>
    );
}
