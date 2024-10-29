import React, { useState, useRef, useEffect } from 'react'
import NavbarClient from '../components/NavbarClient'

const DesignAIPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null); // Ref to track the end of the messages list

  // Array of image URLs
  const imageLinks = [
    'https://i.ytimg.com/vi/bWPmZgUuouk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBi_n9HHRFsN5yONiwS_rIs8wNvuQ',
    'https://ae-pic-a1.aliexpress-media.com/kf/HTB1PGhTKh9YBuNjy0Ffq6xIsVXaa/Student-Uniforms-British-Academic-Outfit-Long-Sleeve-School-Uniform-Students-Sweet-Clothes-Plus-Size-3pcs-Shcool.jpg_640x640Q90.jpg_.webp',
    'https://i.ytimg.com/vi/bWPmZgUuouk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBi_n9HHRFsN5yONiwS_rIs8wNvuQ',
    // Add more direct URLs here
];


  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // User's message
    const userMessage = { text: inputText, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear input
    setInputText('');

    // AI Response with delay to simulate response time
    setTimeout(() => {
      const aiMessage = {
        text: 'Here is Suggestion',
        sender: 'AI',
        imageUrl: imageLinks[Math.floor(Math.random() * imageLinks.length)]
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }, 500); // 500ms delay to simulate AI processing
  };

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-white text-red-700">
      <NavbarClient />
      <div className="flex flex-col items-center pt-5">
        <div className="bg-white border rounded-lg shadow-md w-full max-w-lg p-5">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Design Suggestions
          </h1>

          {/* Messages Section */}
          <div className="overflow-y-auto max-h-96 mb-5 p-3">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <p className={`inline-block px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                  {msg.text}
                </p>
                {msg.imageUrl && (
                  <div className="mt-2">
                    <img src={msg.imageUrl} alt="Suggestion" className="w-24 h-24 rounded-lg" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Empty div to scroll to */}
          </div>

          {/* Input Section */}
          <div className="flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about designs..."
              className="flex-grow p-2 border rounded-l-md focus:outline-none text-black"
            />
            <button onClick={handleSendMessage} className="bg-red-700 text-white px-4 py-2 rounded-r-md">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignAIPage
