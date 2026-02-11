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
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative bg-gray-800 rounded-xl border border-gray-700 focus-within:border-blue-500 transition-colors">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Kaira anything..."
          disabled={disabled}
          rows={1}
          className="w-full bg-transparent text-white placeholder-gray-400 p-4 pr-24 outline-none resize-none max-h-32 rounded-xl disabled:opacity-50"
          style={{ minHeight: '56px' }}
        />
        
        <div className="absolute right-2 bottom-2 flex items-center gap-1">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
            title="Voice input (coming soon)"
          >
            <Mic size={20} />
          </button>
          
          {input.trim() && (
            <button
              type="submit"
              disabled={disabled}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          )}
        </div>
      </div>
      <p className="text-center text-[10px] text-gray-500 mt-2">
        AI-powered assistant. Messages may be monitored for quality assurance.
      </p>
    </form>
  );
};

export default ChatInput;
