
import React, { useState, useRef, useEffect } from 'react';

const AIComponent = () => {
  const [userInput, setUserInput] = useState('');        // Store user input
  const [conversation, setConversation] = useState([]);   // Store the conversation history
  const [loading, setLoading] = useState(false);          // Loading state
  const conversationEndRef = useRef(null);                // Ref for auto-scrolling to the end of conversation

  const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY;     // Get API key from env

  // Function to handle the prompt submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;  // Prevent sending empty messages

    setLoading(true);  // Start loading while making the request

    // Update conversation with the user's prompt
    setConversation((prevConversation) => [
      ...prevConversation,
      { text: userInput, sender: 'user' },  // Add user input to conversation history
    ]);

    try {
      const result = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: userInput,  // Send the user's input as the prompt
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await result.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI';

      // Update conversation with the AI's response
      setConversation((prevConversation) => [
        ...prevConversation,
        { text: aiResponse, sender: 'ai' },  // Add AI response to conversation history
      ]);
    } catch (error) {
      console.error('Error generating content:', error);
      setConversation((prevConversation) => [
        ...prevConversation,
        { text: 'Something went wrong. Please try again.', sender: 'ai' },
      ]);
    } finally {
      setLoading(false);  // Stop loading when request is complete
    }

    // Clear the user input field after submitting
    setUserInput('');
  };

  // Scroll to the bottom when the conversation updates
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Chat with AI</h1>

      {/* Display conversation history */}
      <div className="w-full max-w-4xl h-96 p-4 overflow-y-auto space-y-4 mb-6 relative custom-scrollbar">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}
          >
            <strong className={`${message.sender === 'user' ? 'text-blue-700' : 'text-gray-700'}`}>
              {message.sender === 'user' ? 'You' : 'AI'}:
            </strong>
            <p>{message.text}</p>
          </div>
        ))}
        {/* This is the element that will be used for auto-scrolling */}
        <div ref={conversationEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg flex items-center">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}  
          placeholder="Type your message here..."
          className="w-full p-3 mr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !userInput.trim()}  // Disable the button if the input is empty or loading
          className={`py-2 px-4 bg-blue-500 text-white rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default AIComponent;
