import axios from 'axios';
import type { WebhookPayload, WebhookResponse } from '../types';

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

if (!WEBHOOK_URL) {
  console.error('VITE_N8N_WEBHOOK_URL is not defined in environment variables');
}

export const sendMessage = async (message: string, sessionId: string): Promise<WebhookResponse> => {
  try {
    const payload: WebhookPayload = {
      message,
      session_id: sessionId
    };
    
    const response = await axios.post<WebhookResponse>(WEBHOOK_URL, payload);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
