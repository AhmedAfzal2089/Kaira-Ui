import React from 'react';
import KairaAvatar from '../assets/kaira.jpeg';
import KOSLogo from '../assets/KOS.png';

const ChatHeader: React.FC = () => {
  return (
    <div className="p-8 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-4 mb-6">
       <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm border border-gray-800">
         <img src={KairaAvatar} alt="Kaira" className="w-full h-full object-cover" />
      </div>
       <div className="h-16 flex items-center">
          <img src={KOSLogo} alt="KOS" className="h-full object-contain" />
       </div>
     </div>
      <div>
        <p className="text-gray-300 text-lg mb-2">How can I help you recover?</p>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          Ask me about muscle recovery, booking sessions, or our AI technology.
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
