import { useState, useEffect, useCallback } from "react";
import {
  connectWebSocket,
  startRecording,
  stopRecording,
  closeWebSocket,
} from "../services/apiServices";

const useRecording = (setTranscriptionText) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isStopping, setIsStopping] = useState(false);

  const handleStopTranscription = useCallback(() => {
    setIsStopping(true);
    // Simulate animation duration before stopping
    setTimeout(() => {
      stopRecording();
      closeWebSocket();
      setIsRecording(false);
      setIsMuted(false);
      setRecordingTime(0);
      setIsStopping(false);
    }, 500);
  }, []);

  const startTranscription = useCallback(() => {
    setIsRecording(true);

    const onOpen = () => {}; // No console.log
    const onMessage = (data) => {
      if (data.channel && data.channel.alternatives[0]) {
        const transcript = data.channel.alternatives[0].transcript;
        if (transcript && transcript.trim().length > 0) {
          setTranscriptionText((prev) => prev + transcript + " ");
        }
      }
    };
    const onClose = () => {}; // No console.log
    const onError = (error) => {
      console.error("WebSocket error:", error); // Keep error logs
      handleStopTranscription();
    };
    const onServerReady = () => {
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

  return {
    isRecording,
    setIsRecording,
    isMuted,
    setIsMuted,
    recordingTime,
    isStopping,
    handleStopTranscription,
    startTranscription,
    formatTime,
  };
};

export default useRecording;
