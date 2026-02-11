import React from 'react';
import type { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-800 ${
          isUser ? 'bg-[#1a1a1a]' : 'bg-[#1a1a1a]'
        }`}
      >
        {isUser ? (
          <User size={16} className="text-gray-400" />
        ) : (
          <Bot size={16} className="text-gray-400" />
        )}
      </div>
      
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed border border-gray-800 ${
          isUser
            ? 'bg-[#1a1a1a] text-gray-200 rounded-tr-sm'
            : 'bg-[#1a1a1a] text-gray-200 rounded-tl-sm'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
