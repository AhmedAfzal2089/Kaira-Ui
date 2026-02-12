/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback } from 'react';
import { unsafe_createClientWithApiKey } from '@anam-ai/js-sdk';

const API_KEY = import.meta.env.VITE_ANAM_API_KEY;
const PERSONA_ID = import.meta.env.VITE_ANAM_PERSONA_ID;

export const useAnamClient = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const clientRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const streamInitRef = useRef(false);

  useEffect(() => {
    // Check credentials early
    if (!API_KEY || !PERSONA_ID) {
      console.error('Anam AI credentials missing');
      // Set error asynchronously to avoid render loop warning
      setTimeout(() => setError('Anam AI credentials missing in .env'), 0);
      return;
    }

    if (clientRef.current) return;

    // Initialize client
    try {
        console.log("Initializing Anam Client...");
        const client = unsafe_createClientWithApiKey(API_KEY, {
            personaId: PERSONA_ID,
        } as any);
        
        clientRef.current = client;
        setIsLoaded(true);
    } catch (err: any) {
        console.error("Failed to initialize Anam client:", err);
        // Set error asynchronously
        setTimeout(() => setError(`Init Error: ${err.message || err}`), 0);
    }
    
    return () => {
      if (clientRef.current) {
          try {
            clientRef.current.stopStreaming().catch(() => {});
          } catch(e) {
              console.error("Error stopping stream on cleanup", e);
          }
      }
    };
  }, []);

  const startStreaming = useCallback(async () => {
    if (!clientRef.current || !videoRef.current) return;
    if (streamInitRef.current) return;

    try {
      console.log("Starting stream...");
      streamInitRef.current = true;
      setError(null);
      await clientRef.current.streamToVideoElement("anam-ai-video");
      setIsStreaming(true);
    } catch (err: any) {
      console.error('Failed to start streaming:', err);
      setError(`Stream Error: ${err.message || err}`);
      streamInitRef.current = false;
    }
  }, []);

  const stopStreaming = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.stopStreaming().catch(() => {});
      setIsStreaming(false);
      streamInitRef.current = false;
    }
  }, []);

  return {
    videoRef,
    isLoaded,
    isStreaming,
    startStreaming,
    stopStreaming,
    error,
  };
};
