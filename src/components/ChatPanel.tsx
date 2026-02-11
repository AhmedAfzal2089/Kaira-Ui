import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import SuggestionPills from './SuggestionPills';
import type { Message } from '../types';

import { Trash2 } from 'lucide-react';

interface ChatPanelProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onClear: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, isLoading, onSendMessage, onClear }) => {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white relative">
      {messages.length > 0 && (
        <button 
          onClick={onClear} 
          className="absolute top-4 left-4 z-10 p-2 text-gray-500 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-800/50"
          title="Clear Conversation"
        >
          <Trash2 size={20} />
        </button>
      )}
      <div className="flex-1 overflow-hidden flex flex-col relative bg-[#0a0a0a]">
        {messages.length === 0 ? (
           <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center p-4">
              <ChatHeader />
              <SuggestionPills onSelect={onSendMessage} />
           </div>
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
        )}

        <div className="p-4 bg-[#0a0a0a]">
          <ChatInput onSend={onSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
