import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // For extracting URL parameters
import {jwtDecode} from 'jwt-decode';  // JWT decoding library
import './Chat.css';

function Prompt() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [translationEnabled, setTranslationEnabled] = useState(false);
  const [ws, setWs] = useState(null);
  
  const { id: chatId } = useParams();  // Extract chatId from URL params (e.g., /chat/:id)

  // Extract userId from JWT stored in localStorage
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('jwtToken');  // Assume the JWT is stored under 'jwtToken'
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;  // Assuming 'userId' is in the payload of the JWT
      } catch (error) {
        console.error("Invalid JWT token:", error);
        return null;
      }
    }
    return null;
  };

  const userId = getUserIdFromToken();  // Extract the userId from the token

  const useTranslation = (enabled) => {
    const translate = (message) => {
      if (enabled) {
        return message.split('').reverse().join('');  // Simple mock translation logic
      }
      return message;
    };
    return translate;
  };

  const translateMessage = useTranslation(translationEnabled);

  useEffect(() => {
    if (!userId || !chatId) {
      console.error('Missing userId or chatId');
      return;
    }

    // WebSocket connection setup
    const wsConnection = new WebSocket(`ws://localhost:8080/?userId=${userId}&chatId=${chatId}`);

    wsConnection.onopen = () => {
      console.log('Connected to WebSocket');
    };

    wsConnection.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setChat((prevChat) => [...prevChat, messageData.content]);
    };

    wsConnection.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(wsConnection);

    return () => {
      wsConnection.close();  // Cleanup WebSocket on component unmount
    };
  }, [userId, chatId]);

  const sendMessage = () => {
    const translated = translateMessage(message);
    if (ws && ws.readyState === WebSocket.OPEN) {
      const messageObj = {
        type: 'message',
        senderId: userId,
        content: translated
      };
      ws.send(JSON.stringify(messageObj));
      setChat((prevChat) => [...prevChat, `Me: ${translated}`]);
      setMessage('');  // Clear input field
    }
  };

  return (
    <div className="chat-container">
      <button
        className="translate-btn"
        onClick={() => setTranslationEnabled(!translationEnabled)}
      >
        {translationEnabled ? 'Disable Translation' : 'Enable Translation'}
      </button>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Prompt;
