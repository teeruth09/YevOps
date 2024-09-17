import React, { useState } from 'react';
import ChatUI from '@/components/ChatUi';

const ChatPage = () => {
 
  return (
    <div>
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <ChatUI />
    </div>
    </div>
  );
};

export default ChatPage;
