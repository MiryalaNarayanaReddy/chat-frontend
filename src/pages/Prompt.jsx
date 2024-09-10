import React, { useContext, useEffect, useState } from 'react';
import './Chat.css';

function Prompt() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const useTranslation = (enabled) => {
    const [translatedMessage, setTranslatedMessage] = useState('');
  
    const translate = (message) => {
      if (enabled) {
        // Simple mock translation logic
        return message.split('').reverse().join('');
      }
      return message;
    };

    return translate;
  };
  const [translationEnabled,setTranslationEnabled] = useState(false);
  const translateMessage = useTranslation(translationEnabled);

  const sendMessage = () => {
    
  };

  return (
    <div className="chat-container">
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
        <button onClick={()=>setTranslationEnabled(!translationEnabled)}>toggle translation</button>
      </div>
    </div>
  );
}

export default Prompt;
