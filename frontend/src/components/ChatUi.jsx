import React, { useState } from 'react';

const ChatMessage = ({ message, isUser }) => {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
        <div
          className={`${
            isUser ? 'bg-blue-200' : 'bg-gray-300'
          } p-2 rounded-lg max-w-xs`}
        >
          {message}
        </div>
      </div>
    );
};
  

const ChatUI = () => {
  const [messages, setMessages] = useState([
    { text: "สินค้าใกล้เสร็จแล้วยังครับ", isUser: true },
    { text: "ใกล้แล้วครับ ตอนนี้อยู่ในขั้นตอนการผลิตอยู่", isUser: false },
    { text: "โอเคครับ", isUser: true },
    { text: "ยินดีครับ", isUser: false },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, isUser: true }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full w-96 bg-gray-100 shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between bg-red-800 p-4 text-white rounded-t-lg">
        <h3 className="font-semibold">Chat App</h3>
        <div className="space-x-2">
          <span>👤</span>
          <span>⚙️</span>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
      </div>

      {/* Input field */}
      <div className="flex items-center p-2 bg-white border-t">
        <input
          type="text"
          className="flex-grow p-2 border rounded-lg outline-none"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="ml-2 p-2 bg-blue-600 text-white rounded-full"
          onClick={handleSendMessage}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatUI;