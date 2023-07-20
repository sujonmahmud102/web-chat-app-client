import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => newSocket.close(); // Clean up the socket connection
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected to server');
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socket.on('newMessage', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [socket]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('newMessage', { username, message });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Real-time Chat App</h1>

      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" value={username} onChange={handleUsernameChange} />
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <input id="message" type="text" value={message} onChange={handleMessageChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}: </strong>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatApp;