export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  sessionId: string;
}

export interface WebhookPayload {
  message: string;
  session_id: string;
}

export interface WebhookResponse {
  output?: string;
  message?: string;
  text?: string;
  [key: string]: unknown;
}
