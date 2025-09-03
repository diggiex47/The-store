// components/Chat.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

// Define the shape of a message for TypeScript
interface Message {
  content: string;
  userID: string;
  username: string;
}

const WEBSOCKET_URL = "ws://localhost:8000/api/ws";

export default function Chat() {
  const { user } = useAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);
    ws.onopen = () => setConnectionStatus("Connected");
    ws.onmessage = (event) => {
      const receivedMessage: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };
    ws.onerror = () => setConnectionStatus("Error: Connection failed.");
    ws.onclose = () => {
      if (connectionStatus !== "Connected") {
        setConnectionStatus("Error: Could not connect.");
      }
    };
    setSocket(ws);
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && input && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ content: input }));
      setInput("");
    }
  };

  // The UI part using DaisyUI classes
  return (
    <div className="card bg-base-100 w-96 shadow-xl align-center">
      <div className="card-body">
        <h2 className="card-title">Chat Room</h2>

        {/* Message Display Box */}
        <div className="bg-base-200 h-80 overflow-y-auto rounded-lg p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${msg.userID === user?.id ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header">{msg.username}</div>
              <div
                className={`chat-bubble ${msg.userID === user?.id ? "chat-bubble-primary" : ""}`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Text Box to Send Message */}
        <div className="card-actions mt-4 items-center justify-between">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage} className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
