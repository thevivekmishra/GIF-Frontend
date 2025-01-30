import React, { useState, useRef, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { RiSparkling2Line } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { saveAs } from 'file-saver';  // Import FileSaver
import chatimage from '../assets/chatimage.webp';

const AIComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const conversationEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    setLoading(true);

    setConversation((prevConversation) => [
      ...prevConversation,
      { text: userInput, sender: 'user' },
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
                    text: userInput,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await result.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI';

      setConversation((prevConversation) => [
        ...prevConversation,
        { text: aiResponse, sender: 'ai' },
      ]);
    } catch (error) {
      console.error('Error generating content:', error);
      setConversation((prevConversation) => [
        ...prevConversation,
        { text: 'Something went wrong. Please try again.', sender: 'ai' },
      ]);
    } finally {
      setLoading(false);
    }

    setUserInput('');
  };

  // Scroll to the bottom when the conversation updates
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Function to download the conversation as a Word document
  const downloadChat = () => {
    let content = '<html><head><style>body{font-family: Arial, sans-serif;}</style></head><body>';
    conversation.forEach((message) => {
      content += `<p><strong>${message.sender === 'user' ? 'User' : 'AI'}:</strong> ${message.text}</p>`;
    });
    content += '</body></html>';

    // Blob object to represent the HTML content as a Word file
    const blob = new Blob([content], { type: 'application/msword' });
    saveAs(blob, 'chat-conversation.doc');
  };

  return (
    <div className="flex flex-col items-center p-1 pt-16 h-screen pb-7 bg-gray-200">
      <h1 className="text-3xl font-mono mb-6">Chat with AI</h1>

      {conversation.length === 0 && (
        <img src={chatimage} alt="AI Chat" className="h-80 justify-center items-center flex " />
      )}

      <div className="w-full md:max-w-5xl h-[calc(100vh-150px)] p-1 md:p-4 overflow-y-auto space-y-4 mb-6 relative custom-scrollbar">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-200 self-end' : 'bg-gray-300 self-start'}`}
          >
            <strong className={`${message.sender === 'user' ? 'text-blue-700' : 'text-yellow-600'}`}>
              {message.sender === 'user' ? <FaUser /> : <RiSparkling2Line />}
            </strong>
            <p>
              <pre className="whitespace-pre-wrap break-words overflow-hidden">{message.text}</pre>
            </p>
          </div>
        ))}
        <div ref={conversationEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg fixed bottom-4 flex items-center px-4 py-2 bg-gray-200">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
          className="w-full p-2 mr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !userInput.trim()}
          className={`py-[7px] px-4 bg-blue-500 text-white rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
        >
          {loading ? 'Analyzing...' : <IoMdSend className='text-2xl' />}
        </button>
      </form>

      {conversation.length != 0 && (
        <button
          onClick={downloadChat}
          className="mt-4 py-2 px-4 mb-12 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Download Chat as Word File
        </button>
      )}

    </div>
  );
};

export default AIComponent;
