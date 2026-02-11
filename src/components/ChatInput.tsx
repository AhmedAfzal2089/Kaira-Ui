import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

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
        <div className="relative bg-[#1a1a1a] rounded-2xl border border-gray-800 focus-within:border-gray-700 transition-colors shadow-lg">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Kaira anything..."
            disabled={disabled}
            rows={1}
            className="w-full bg-transparent text-white placeholder-gray-500 p-4 pb-12 outline-none resize-none max-h-48 rounded-2xl disabled:opacity-50"
            style={{ minHeight: '80px' }}
          />
          
          <div className="absolute left-4 bottom-4">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50"
              title="Voice input"
            >
              <Mic size={20} />
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
