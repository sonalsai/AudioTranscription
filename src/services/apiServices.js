export const connectWebSocket = () => {
  const url = "ws://localhost:8080";

  const socket = new WebSocket(url);

  return socket;
};

export const sendMessage = (socket, message) => {
  console.log(WebSocket);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.error("WebSocket is not open. Ready state: " + socket.readyState);
  }
};

export const closeWebSocket = (socket) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.close();
  } else {
    console.error("WebSocket is not open. Ready state: " + socket.readyState);
  }
};
