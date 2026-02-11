import React from 'react';
import { ASSETS } from '../config/assets';

const ChatHeader: React.FC = () => {
  return (
    <div className="border-b border-gray-800 p-6 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4 overflow-hidden shadow-lg shadow-blue-900/20">
         <img src={ASSETS.KAIRA_LOGO} alt="Kaira Logo" className="w-full h-full object-cover" />
      </div>
      <div>
        <h2 className="text-white text-2xl font-bold flex items-center justify-center gap-2">
          Kaira
        </h2>
        <p className="text-gray-400 text-sm mt-2">How can I help you recover?</p>
        <p className="text-gray-500 text-xs mt-1 max-w-md">Ask me about muscle recovery, booking sessions, or our AI technology.</p>
      </div>
    </div>
  );
};

export default ChatHeader;
