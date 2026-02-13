import React from 'react';
import chatAvatar from '../assets/chat_avatar.jpeg';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img 
          src={chatAvatar} 
          alt="AI" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-gray-800 rounded-2xl p-4 rounded-tl-none">
        <div className="flex gap-1.5 h-full items-center">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
