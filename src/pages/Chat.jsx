import React from 'react';
import './Chat.css';
import Users from './Users';

function Chat() {
  console.log("Chat component is rendering");

  return (
    <div className='flex flex-row '>
     
     <div class="relative">
     <div class="fixed top-0 left-0 right-0">
      
     <Users />

     </div>

     </div>

     </div>
  );
}

export default Chat;
