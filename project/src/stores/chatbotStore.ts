import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatbotState {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setLoading: (isLoading: boolean) => void;
  clearMessages: () => void;
}

export const useChatbotStore = create<ChatbotState>()((set) => ({
  messages: [],
  isLoading: false,
  
  addMessage: (message) => set((state) => ({
    messages: [
      ...state.messages,
      { 
        ...message, 
        id: Date.now().toString(), 
        timestamp: Date.now() 
      }
    ]
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  clearMessages: () => set({ messages: [] }),
}));