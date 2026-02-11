import { useState, useEffect, useCallback } from 'react';
import type { Message, ChatState } from '../types';
import { getOrCreateSessionId, resetSession } from '../utils/session';
import { sendMessage } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    sessionId: ''
  });

  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    setState(prev => ({ ...prev, sessionId }));
  }, []);

  const addMessage = useCallback((text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: uuidv4(),
      text,
      sender,
      timestamp: Date.now()
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    addMessage(text, 'user');
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await sendMessage(text, state.sessionId);
      
      // Handle the response structure from n8n
      // Assuming the response contains 'output', 'message', or 'text'
      const botResponse = response.output || response.message || response.text || "I'm sorry, I couldn't process that.";
      
      addMessage(botResponse, 'bot');
    } catch (error) {
      console.error('Failed to send message:', error);
      addMessage("Sorry, I'm having trouble connecting to the server. Please try again.", 'bot');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.sessionId, addMessage]);

  const handleResetSession = useCallback(() => {
    const newSessionId = resetSession();
    setState({
      messages: [],
      isLoading: false,
      sessionId: newSessionId
    });
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    sendMessage: handleSendMessage,
    resetSession: handleResetSession
  };
};
