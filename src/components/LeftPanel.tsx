import React from 'react';

const ANAM_URL = import.meta.env.VITE_ANAM_IFRAME_URL;

const LeftPanel: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-lg relative overflow-hidden">
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-inner bg-black mb-6">
        <iframe
          src={ANAM_URL}
          allow="microphone"
          className="w-full h-full border-0"
          title="Anam AI Avatar"
        />
      </div>
      
    
   
    </div>
  );
};

export default LeftPanel;
