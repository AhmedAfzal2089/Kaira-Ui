/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

// Add type definition for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1];
        
        if (lastResult.isFinal) {
          const text = lastResult[0].transcript;
          setInput((prev) => prev + (prev ? ' ' : '') + text);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Browser does not support speech recognition.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative bg-[#1a1a1a] rounded-2xl border transition-colors shadow-lg ${isListening ? 'border-red-500/50' : 'border-gray-800 focus-within:border-gray-700'}`}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening..." : "Ask Kaira anything..."}
            disabled={disabled}
            rows={1}
            className="w-full bg-transparent text-white placeholder-gray-500 p-3 md:p-4 pb-10 md:pb-12 outline-none resize-none max-h-48 rounded-2xl disabled:opacity-50 text-sm md:text-base"
            style={{ minHeight: '60px' }}
          />
          
          <div className="absolute left-3 bottom-3 md:left-4 md:bottom-4">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 transition-colors rounded-lg ${isListening ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20' : 'text-gray-500 hover:text-white hover:bg-gray-800/50'}`}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          </div>

          <div className="absolute right-4 bottom-4">
            <button
              type="submit"
              disabled={disabled || !input.trim()}
              className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-800"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        <p className="text-center text-[10px] text-gray-500 mt-3 font-medium">
          Al-powered assistant. Messages may be monitored for quality assurance.
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
