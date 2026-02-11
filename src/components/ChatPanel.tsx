import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import SuggestionPills from './SuggestionPills';
import type { Message } from '../types';

interface ChatPanelProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, isLoading, onSendMessage }) => {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white">
      <ChatHeader />
      
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {messages.length === 0 ? (
           <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-end">
              <SuggestionPills onSelect={onSendMessage} />
           </div>
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
        )}

        <div className="p-6 pt-2 bg-[#0a0a0a]">
          <ChatInput onSend={onSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
