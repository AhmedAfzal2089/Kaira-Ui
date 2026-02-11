import React from 'react';

const ANAM_URL = import.meta.env.VITE_ANAM_IFRAME_URL;

const LeftPanel: React.FC = () => {
  return (
    <>
    
    <div className="h-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-lg relative overflow-hidden gap-10">
       <div className="relative group cursor-pointer animate-fade-in transform hover:-translate-y-1 transition-all duration-300">
          <button className="relative px-8 py-4 bg-[#1a1a1a] rounded-full leading-none flex items-center justify-center space-x-2 border border-white/10 group-hover:bg-gray-800 group-hover:border-white/30 transition-all duration-300 shadow-2xl">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 group-hover:from-blue-200 group-hover:via-gray-200 group-hover:to-pink-200 tracking-widest uppercase">
               Talk to Kaira
            </span>
          </button>
       </div>
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-inner bg-black mb-6">
        <iframe
          src={ANAM_URL}
          allow="microphone"
          className="w-full h-full border-0"
          title="Anam AI Avatar"
        />
      </div>
      
     
    </div>
    </> 
  );
};

export default LeftPanel;
