import React from "react";
import { useState, useEffect } from "react";

import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [messages, setMessages] = useState([]);

  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [messages]);


  const sendMessage = () => {
    if(messageInput.trim() !== '') {
      socket.emit('message', messageInput)

      setMessageInput("");

    }
  }


  return (
    <div>
      <h1>Simple Chat App</h1>

      <input
        type="text"
        value={messageInput}
        placeholder="Type your message..."
        onChange={(e) => setMessageInput(e.target.value)}
      />



    <button onClick={sendMessage}>Send</button>


    {/* Render all the messages  */}
    <section>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </section>



    </div>
  );
};

export default App;
