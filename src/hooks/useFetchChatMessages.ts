import { useState, useEffect } from "react";

export const useFetchChatMessages = (
  conversationId: string,
  isOpen: boolean,
  isChatWidgetOpen: boolean,
  messageType: "chat" | "order"
) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  // Function to fetch messages
  const fetchMessages = async () => {
    if (!conversationId || !isOpen || !isChatWidgetOpen) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/chat/fetch-messages/${conversationId}`,
        {
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  };

  // Manual refresh function
  const refresh = async () => {
    setRetryCount(0);
    await fetchMessages();
  };

  // Polling effect for fetching messages every 5 seconds
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (isOpen && conversationId && isChatWidgetOpen) {
      fetchMessages(); // Initial fetch
      intervalId = setInterval(() => {
        fetchMessages();
      }, 5000);
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [conversationId, isOpen, isChatWidgetOpen]);

  // Retry mechanism for failed fetches
  useEffect(() => {
    if (error && retryCount < 3) {
      const retryTimeout = setTimeout(() => {
        setRetryCount(retryCount + 1);
        fetchMessages();
      }, 5000);

      return () => clearTimeout(retryTimeout);
    }
  }, [error, retryCount]);

  return {
    messages,
    isLoading,
    error,
    refresh,
  };
};
