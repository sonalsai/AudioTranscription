let socket;
let mediaRecorder;
let stream;

const connectWebSocket = (
  onOpen,
  onMessage,
  onClose,
  onError,
  onServerReady
) => {
  const url = import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8080/ws";
  socket = new WebSocket(url);

  socket.onopen = onOpen;
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "ready") {
      onServerReady();
    } else {
      onMessage(data);
    }
  };
  socket.onclose = onClose;
  socket.onerror = onError;
};

const startRecording = async (onDataAvailable) => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        sampleRate: 16000,
        sampleSize: 16,
        echoCancellation: false,
        noiseSuppression: false,
      },
    });

    mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
      audioBitsPerSecond: 128000,
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0 && socket && socket.readyState === WebSocket.OPEN) {
        socket.send(event.data);
        onDataAvailable(event.data);
      }
    };

    mediaRecorder.start(1000);
  } catch (err) {
    console.error("Error accessing microphone:", err);
    // Handle error appropriately, maybe call an onError callback
  }
};

const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
};

const closeWebSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
};

export {
  connectWebSocket,
  startRecording,
  stopRecording,
  closeWebSocket,
};