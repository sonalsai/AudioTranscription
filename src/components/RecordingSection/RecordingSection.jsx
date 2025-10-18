import { useState, useEffect } from "react";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import "./RecordingSection.scss";
import { closeWebSocket, connectWebSocket } from "../../services/apiServices";

const RecordingSection = ({ setTranscriptionText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [socket, setSocket] = useState(null);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  let textFromServer = "";

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

  const startTranscription = () => {
    console.log("Starting transcription...");
    const ws = connectWebSocket();
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connection opened, waiting for server ready...");
    };

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      // Wait for server to signal Deepgram is ready
      if (data.type === "ready") {
        console.log("✅ Server ready, starting recording...");

        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              channelCount: 1,
              sampleRate: 16000,
              sampleSize: 16,
              echoCancellation: false,
              noiseSuppression: false,
            },
          });
          setStream(stream);

          const recorder = new MediaRecorder(stream, {
            mimeType: "audio/webm;codecs=opus",
            audioBitsPerSecond: 128000,
          });
          setMediaRecorder(recorder);
          recorder.start(1000);

          recorder.ondataavailable = (event) => {
            if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
              console.log("Sending audio chunk:", event.data.size, "bytes");
              ws.send(event.data);
            }
          };
        } catch (err) {
          console.error("Error accessing microphone:", err);
        }
      } else {
        console.log("Transcription result:", data);
        if (data.channel && data.channel.alternatives[0]) {
          const transcript = data.channel.alternatives[0].transcript;
          if (transcript && transcript.trim().length > 0) {
            textFromServer += transcript + " ";
            setTranscriptionText(textFromServer);
          }
        }
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const stopTranscription = () => {
    console.log("Stopping transcription...");
    if (mediaRecorder) {
      mediaRecorder.stop();
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }
    closeWebSocket(socket);
  };

  return (
    <div className="recording-panel">
      {!isRecording ? (
        <div className="recording-center">
          <button
            className="mic-button"
            onClick={() => {
              setIsRecording(true);
              startTranscription();
            }}
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
              onClick={() => {
                setIsRecording(false);
                setIsMuted(false);
                setRecordingTime(0);
                stopTranscription();
              }}
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
