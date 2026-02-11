import React from 'react';


const ChatHeader: React.FC = () => {
  return (
    <div className="border-b border-gray-800 p-6 flex flex-col items-center justify-center text-center">

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
