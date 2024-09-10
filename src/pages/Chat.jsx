import React from 'react';
import './Chat.css';
import Users from './Users';
import Prompt from './Prompt';

function Chat() {
  console.log("Chat component is rendering");

  return (
    <div className='flex flex-row justify-start'>
     <div>
        <Users />
      </div>
  
     </div>
  );
}

export default Chat;
