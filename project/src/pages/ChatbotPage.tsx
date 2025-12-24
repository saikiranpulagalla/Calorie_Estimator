import React, { useState, useRef, useEffect } from 'react';
import { useChatbotStore } from '../stores/chatbotStore';
import { Send, Bot } from 'lucide-react';
import ChatMessage from '../components/chatbot/ChatMessage';
import { sendChatbotMessage } from '../services/chatbotService';

const ChatbotPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { messages, addMessage, isLoading, setLoading } = useChatbotStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    addMessage({
      role: 'user',
      content: message,
    });
    
    // Clear input
    setMessage('');
    
    // Show typing indicator
    setIsTyping(true);
    setLoading(true);
    
    try {
      // Get response from chatbot service
      const response = await sendChatbotMessage(message);
      
      // Add bot response
      addMessage({
        role: 'assistant',
        content: response,
      });
    } catch (error) {
      // Handle error
      addMessage({
        role: 'assistant',
        content: "I'm sorry, I couldn't process your request. Please try again.",
      });
    } finally {
      setIsTyping(false);
      setLoading(false);
    }
  };

  // Initial welcome message if no messages
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        role: 'assistant',
        content: "Hello! I'm your Nutrify nutrition assistant. You can ask me about calories, nutrients, diet tips, recipe ideas, or any nutrition-related questions. How can I help you today?",
      });
    }
  }, [messages.length, addMessage]);

  return (
    <div className="min-h-screen bg-nutrify-light dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="nutrify-card bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Nutrition Assistant</h1>
          <p className="text-gray-600">
            Ask me anything about nutrition, diets, or healthy eating
          </p>
        </header>
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nutrify-accent flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="py-2 px-4 bg-gray-100 rounded-2xl rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a nutrition question..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-nutrify-accent focus:border-nutrify-accent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className={`rounded-full p-2 ${
                  message.trim() 
                    ? 'bg-nutrify-accent text-white hover:bg-green-600' 
                    : 'bg-gray-200 text-gray-400'
                } transition-colors`}
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
        
        {/* Suggestion Chips */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested questions:</h3>
          <div className="flex flex-wrap gap-2">
            <SuggestionChip 
              text="How many calories in an apple?" 
              onClick={() => setMessage("How many calories in an apple?")} 
            />
            <SuggestionChip 
              text="Protein-rich vegetarian foods" 
              onClick={() => setMessage("What are good protein-rich vegetarian foods?")} 
            />
            <SuggestionChip 
              text="Is coffee healthy?" 
              onClick={() => setMessage("Is coffee healthy or unhealthy?")} 
            />
            <SuggestionChip 
              text="Healthy snack ideas" 
              onClick={() => setMessage("Give me some healthy snack ideas")} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface SuggestionChipProps {
  text: string;
  onClick: () => void;
}

const SuggestionChip: React.FC<SuggestionChipProps> = ({ text, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-nutrify-light border border-nutrify-secondary text-gray-800 rounded-full px-3 py-1 text-sm hover:bg-nutrify-secondary transition-colors"
    >
      {text}
    </button>
  );
};

export default ChatbotPage;