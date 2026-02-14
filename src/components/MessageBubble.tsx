import React, { useMemo } from 'react';
import type { Message } from '../types';
import { User } from 'lucide-react';
import chatAvatar from '../assets/chat_avatar.jpeg';
import { formatMessage } from '../utils/messageFormatter';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const formattedContent = useMemo(() => {
    return formatMessage(message.text);
  }, [message.text]);

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''} max-w-full`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-800 ${
          isUser ? 'bg-[#1a1a1a]' : 'bg-[#1a1a1a]'
        }`}
      >
        {isUser ? (
          <User size={16} className="text-gray-400" />
        ) : (
          <img 
            src={chatAvatar} 
            alt="AI Assistant" 
            className="w-full h-full rounded-full object-cover"
          />
        )}
      </div>
      
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed border border-gray-800 overflow-hidden break-words ${
          isUser
            ? 'bg-[#1a1a1a] text-gray-200 rounded-tr-sm'
            : 'bg-[#1a1a1a] text-gray-200 rounded-tl-sm'
        }`}
      >
        <div 
          dangerouslySetInnerHTML={{ __html: formattedContent }} 
          className="prose prose-invert prose-sm max-w-none break-words whitespace-pre-line"
        />
      </div>
    </div>
  );
};

export default MessageBubble;
