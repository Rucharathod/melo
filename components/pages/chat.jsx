// pages/chat.js
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function Chat() {
  const { user } = useAuth();
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Melo, your emotional support companion. How are you feeling today?",
      sender: 'melo',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'melo',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const generateAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('sad') || lowerInput.includes('unhappy') || lowerInput.includes('depressed')) {
      return "I'm sorry to hear you're feeling down. Remember that it's okay to not be okay. Would you like to try a quick breathing exercise to help?";
    } else if (lowerInput.includes('anxious') || lowerInput.includes('nervous') || lowerInput.includes('worried')) {
      return "It sounds like you're feeling anxious. Let's try the 5-4-3-2-1 grounding technique. Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.";
    } else if (lowerInput.includes('happy') || lowerInput.includes('good') || lowerInput.includes('great')) {
      return "That's wonderful to hear! I'm glad you're feeling positive. What do you think contributed to your good mood today?";
    } else if (lowerInput.includes('angry') || lowerInput.includes('frustrated') || lowerInput.includes('mad')) {
      return "I understand that you're feeling angry. Sometimes taking a moment to pause and breathe can help. Would you like to try a quick mindfulness exercise?";
    } else {
      const responses = [
        "Thank you for sharing that with me. How has that been affecting you?",
        "I appreciate you opening up about this. Would you like to talk more about it?",
        "I'm here to listen. How can I support you right now?",
        "That sounds challenging. Remember to be kind to yourself during this time.",
        "I understand. Would it help to explore some coping strategies together?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real app, you would initialize voice recording here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, you would process the recorded audio here
    // For now, we'll simulate a voice-to-text conversion
    const simulatedVoiceText = "This is a simulated voice message transcription";
    setInputText(simulatedVoiceText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20 relative overflow-hidden">
      {/* Floating elements */}
      <div className="floating-element element-1">💬</div>
      <div className="floating-element element-2">🤖</div>
      <div className="floating-element element-3">✨</div>
      <div className="floating-element element-4">🌼</div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Melo AI Chat</h1>
            <p className="text-gray-600">Your supportive companion</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <span className="text-lg">🤖</span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 shadow-lg mb-4 h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex items-center bg-white/70 backdrop-blur-lg rounded-2xl p-3 shadow-lg">
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            className={`p-2 rounded-full mr-2 ${isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none outline-none px-2"
          />
          <button
            onClick={handleSendMessage}
            disabled={inputText.trim() === ''}
            className="p-2 rounded-full bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}