import { useState, useRef, useEffect } from 'react'

const DesignAIPage = () => {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef(null) // Ref to track the end of the messages list

  // Array of image URLs
  const randomImageLinks = [
    'https://i.ytimg.com/vi/bWPmZgUuouk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBi_n9HHRFsN5yONiwS_rIs8wNvuQ',
    'https://ae-pic-a1.aliexpress-media.com/kf/HTB1PGhTKh9YBuNjy0Ffq6xIsVXaa/Student-Uniforms-British-Academic-Outfit-Long-Sleeve-School-Uniform-Students-Sweet-Clothes-Plus-Size-3pcs-Shcool.jpg_640x640Q90.jpg_.webp',
    'https://m.media-amazon.com/images/I/71pZzEYz4FL._AC_UF1000,1000_QL80_.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp7VCuytfoe5mETVTYHIbf5pBnOx7rLc_bAw&s',
    // Add more direct URLs here
  ]

  // Map of genres to images
  const imageMaps = {
    Suits: 'https://static.independent.co.uk/2024/09/19/11/Men-in-Black.jpg',
    Wedding:
      'https://www.weddingchicks.com/wp-content/uploads/2020/09/2019_wedding_jj_bridegroom-77-2-1.jpg',
    'Formal Dress':
      'https://www.southcoastbrides.com.au/cdn/shop/products/16412660704741e1a353133cf1b44_1346b233-3bde-4fd4-bb2f-8dc73a79d1b9.jpg?v=1644026364&width=1946',
    Police:
      'https://static.wikia.nocookie.net/prisonbreak/images/e/ea/Bellickseason1.jpg/revision/latest?cb=20140807231436',
    Cosplay:
      'https://i.ytimg.com/vi/jEOOUKsWh3M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLArfhDsjh8cz1bZhfz5PXsGFOD-sA',
    Others: 'https://example.com/others-image.jpg',
  }

  // Default image to return if no genre is found
  // const defaultImage = 'https://example.com/random-image.jpg'

  const getImageFromText = (text) =>
    imageMaps[
      Object.keys(imageMaps).find((genre) =>
        text.toLowerCase().includes(genre.toLowerCase())
      )
    ] || randomImageLinks[Math.floor(Math.random() * randomImageLinks.length)]

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    // User's message
    const userMessage = { text: inputText, sender: 'user' }
    setMessages((prevMessages) => [...prevMessages, userMessage])

    // Clear input
    setInputText('')

    // AI Response with delay to simulate response time
    setTimeout(() => {
      const aiMessage = {
        text: 'Here is Suggestion',
        sender: 'AI',
        // imageUrl: randomImageLinks[Math.floor(Math.random() * randomImageLinks.length)],
        imageUrl: getImageFromText(inputText),
      }
      setMessages((prevMessages) => [...prevMessages, aiMessage])
    }, 500) // 500ms delay to simulate AI processing
  }

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='min-h-screen bg-white text-red-700'>
      <div className='flex flex-col items-center pt-5'>
        <div className='bg-white border rounded-lg shadow-md w-full max-w-lg p-5'>
          <h1 className='text-2xl font-semibold mb-4 text-center'>
            Design Suggestions
          </h1>

          {/* Messages Section */}
          <div className='overflow-y-auto max-h-96 mb-5 p-3'>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <p
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {msg.text}
                </p>
                {msg.imageUrl && (
                  <div className='mt-2'>
                    <img
                      src={msg.imageUrl}
                      alt='Suggestion'
                      className='w-24 h-24 rounded-lg'
                    />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Empty div to scroll to */}
          </div>

          {/* Input Section */}
          <div className='flex'>
            <input
              type='text'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder='Ask about designs...'
              className='flex-grow p-2 border rounded-l-md focus:outline-none text-black'
            />
            <button
              onClick={handleSendMessage}
              className='bg-red-700 text-white px-4 py-2 rounded-r-md'
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignAIPage
