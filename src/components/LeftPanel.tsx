import React from 'react';
import { Phone } from 'lucide-react';
import { ASSETS } from '../config/assets';

interface LeftPanelProps {
  onResetSession: () => void;
}

const ANAM_URL = import.meta.env.VITE_ANAM_IFRAME_URL;

const LeftPanel: React.FC<LeftPanelProps> = ({ onResetSession }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-100 rounded-2xl shadow-lg relative overflow-hidden">
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-inner bg-black mb-6">
        <iframe
          src={ANAM_URL}
          allow="microphone"
          className="w-full h-full border-0"
          title="Anam AI Avatar"
        />
      </div>
      
      <div className="flex flex-col items-center w-full max-w-xs">
        <button
          onClick={onResetSession}
          className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 transition-colors py-3 px-6 rounded-full font-medium shadow-md active:scale-95"
        >
           <Phone size={18} />
           <span>Start Conversation</span>
        </button>
      </div>

      <div className="mt-auto pt-6 text-center">
        <p className="text-xs text-gray-400 font-medium">Powered by Anam · Privacy Policy</p>
      </div>
      
      <div className="absolute bottom-4 left-6">
          <img src={ASSETS.ANAM_LOGO} alt="Anam" className="h-6 object-contain opacity-50 grayscale" />
      </div>
    </div>
  );
};

export default LeftPanel;
