import React from 'react';
import KOSLogo from '../assets/KOS.png';

const ChatHeader: React.FC = () => {
  return (
    <div className="p-4 md:p-8 flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mt-2">
      
       <div className="h-12 md:h-14 flex items-center shrink-0">
          <img src={KOSLogo} alt="KOS" className="h-full object-contain" />
       </div>
     </div>
      <div>
        <p className="text-gray-300 text-base md:text-lg mb-2">How can I help you recover?</p>
        <p className="text-gray-500 text-xs md:text-sm max-w-sm md:max-w-md mx-auto leading-relaxed px-4 md:px-0">
          Ask me about muscle recovery, booking sessions, or our AI technology.
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
