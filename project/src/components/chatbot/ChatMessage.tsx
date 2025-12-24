import React from 'react';
import { ChatMessage as ChatMessageType } from '../../stores/chatbotStore';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { role, content } = message;
  
  // Format timestamp
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  if (role === 'user') {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="py-2 px-4 bg-nutrify-accent text-white rounded-2xl rounded-tr-none max-w-xs md:max-w-md break-words">
          <p>{content}</p>
          <span className="block text-right mt-1 text-xs text-white text-opacity-70">
            {formattedTime}
          </span>
        </div>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <User size={18} className="text-gray-600" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nutrify-accent flex items-center justify-center">
        <Bot size={18} className="text-white" />
      </div>
      <div className="py-2 px-4 bg-gray-100 rounded-2xl rounded-tl-none max-w-xs md:max-w-md break-words">
        <p>{content}</p>
        <span className="block text-left mt-1 text-xs text-gray-500">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;