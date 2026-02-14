import { useState, useEffect, useCallback } from 'react';
import type { Message, ChatState } from '../types';
import { getOrCreateSessionId, resetSession } from '../utils/session';
import { sendMessage } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseBotResponse = (data: any): string => {
  if (data === null || data === undefined) return '';

  // Handle Array: [ { output: "..." } ]
  if (Array.isArray(data)) {
    if (data.length > 0) {
      return parseBotResponse(data[0]);
    }
    return '';
  }

  // Handle Object
  if (typeof data === 'object') {
    // Check specific fields in order of likelihood
    if (data.output) return parseBotResponse(data.output);
    if (data.message) return parseBotResponse(data.message);
    if (data.text) return parseBotResponse(data.text);
    if (data.content) return parseBotResponse(data.content);
    if (data.response) return parseBotResponse(data.response);
    
    // If we have an object but none of the known fields, 
    // it might be the leaf node if we want to stringify it,
    // OR we might want to return it as is if it's not a known structure?
    // But the user's case is { "output": "..." } which is caught above.
    
    // Use JSON stringify as fallback for unknown objects so we see something
    return JSON.stringify(data);
  }

  // Handle String (potentially stringified JSON)
  if (typeof data === 'string') {
    // Try to parse if it looks like a JSON object/array
    if (data.trim().startsWith('{') || data.trim().startsWith('[')) {
        try {
            const parsed = JSON.parse(data);
            if (typeof parsed === 'object') {
                return parseBotResponse(parsed);
            }
        } catch {
            // Not JSON, return original string
        }
    }
    return data;
  }

  return String(data);
};

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
      console.log('Raw Webhook Response:', response); // For debugging
      
      const botResponse = parseBotResponse(response) || "I'm sorry, I couldn't process that.";
      
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
