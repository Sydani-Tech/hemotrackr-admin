import { useState, useEffect, useRef } from "react";
import { Search, Send, ArrowLeft, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { MessageAPI, type Conversation, type Message } from "@/core/services/MessageService";
import { toast } from "react-toastify";
import { authInstance } from "@/core/api/apiInstances";

const Messages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChatUser, setActiveChatUser] = useState<any | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize and load conversations
  useEffect(() => {
    fetchCurrentUser();
    loadConversations();

    // Check if we navigated here with a specific user to chat with
    const stateParams = location.state as { chatWithUserId?: number };
    if (stateParams?.chatWithUserId) {
      handleChatSelect(stateParams.chatWithUserId);
    }

    // Set up polling for real-time (mocking socket for now)
    const interval = setInterval(() => {
      loadConversations(false); // Silent update
      if (activeChatUser) {
        // If chat open, refresh messages silently
        fetchChatMessages(activeChatUser.id, false);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeChatUser]);

  // Search debouncer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await authInstance.get("/auth/profile");
      setCurrentUserId(response.data.user.id);
    } catch (error) {
      console.error("Failed to get current user", error);
    }
  };

  const loadConversations = async (showLoading = true) => {
    try {
      if (showLoading) setIsLoadingConversations(true);
      const response = await MessageAPI.getConversations();
      setConversations(response.data.data);
    } catch (error) {
      console.error("Failed to load conversations", error);
    } finally {
      if (showLoading) setIsLoadingConversations(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const response = await MessageAPI.searchUsers(searchQuery);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Failed to search users", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleChatSelect = async (userId: number) => {
    try {
      setIsLoadingMessages(true);
      // Optimistically set active chat if we have the user data in conversations
      const response = await MessageAPI.getChat(userId);
      setMessages(response.data.data);
      setActiveChatUser(response.data.other_user);

      // Refresh conversations to update unread counts
      loadConversations(false);
    } catch (error) {
      console.error("Failed to load chat", error);
      toast.error("Failed to load chat");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSearchResultSelect = async (user: any) => {
    setSearchQuery("");
    setSearchResults([]);
    await handleChatSelect(user.id);
  };

  const fetchChatMessages = async (userId: number, showLoading = false) => {
    try {
      if (showLoading) setIsLoadingMessages(true);
      const response = await MessageAPI.getChat(userId);

      // Only update if we have new messages to avoid jitter or if forced
      setMessages(prev => {
        if (response.data.data.length !== prev.length) {
          return response.data.data;
        }
        return prev; // No change
      });

    } catch (error) {
      console.error("Failed to refresh chat", error);
    } finally {
      if (showLoading) setIsLoadingMessages(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !activeChatUser) return;

    const tempId = Date.now();
    const text = messageInput;
    setMessageInput(""); // Clear input immediately

    // Optimistic update
    const tempMessage: Message = {
      id: tempId,
      from_user_id: currentUserId || 0,
      to_user_id: activeChatUser.id,
      body: text,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, tempMessage]);

    try {
      await MessageAPI.sendMessage(activeChatUser.id, text);
      // Refresh to get real message ID and state
      fetchChatMessages(activeChatUser.id);
      loadConversations(false); // Update last message in sidebar
    } catch (error) {
      console.error("Failed to send message", error);
      toast.error("Failed to send message");
      // Remove temp message if failed
      setMessages(prev => prev.filter(m => m.id !== tempId));
      setMessageInput(text); // Restore text
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to get display name
  const getDisplayName = (user: any) => {
    return user?.organization?.name || `${user?.first_name} ${user?.last_name}`;
  };

  // Helper to get avatar
  const getAvatarUrl = (user: any) => {
    if (user?.organization?.logo_url) {
      return `${import.meta.env.VITE_API_BASE_URL}/storage/${user.organization.logo_url}`;
    }
    return null;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-140px)] pb-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-3xl font-bold text-blue-600">Messages</h1>
      </div>

      <div className="flex gap-6 h-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden">
        {/* Left Sidebar - Chat List */}
        <div className={`w-full md:w-1/3 flex flex-col border-r border-gray-100 pr-0 md:pr-6 ${activeChatUser ? 'hidden md:flex' : 'flex'}`}>
          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search people to chat..."
              className="w-full bg-gray-50 border-none rounded-xl py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-blue-500/20"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
              <Search className="w-3 h-3 text-white" />
            </div>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && searchQuery.length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-10 max-h-60 overflow-y-auto">
                <div className="p-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Search Results</div>
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleSearchResultSelect(user)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 overflow-hidden">
                      {getAvatarUrl(user) ? (
                        <img src={getAvatarUrl(user)!} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">{getDisplayName(user)}</h4>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {isSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white p-4 rounded-xl shadow-lg text-center text-sm text-gray-500 z-10">
                Searching...
              </div>
            )}
            {!isSearching && searchResults.length === 0 && searchQuery.length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white p-4 rounded-xl shadow-lg text-center text-sm text-gray-500 z-10">
                No results found
              </div>
            )}
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-1">
            {isLoadingConversations ? (
              <div className="text-center py-4 text-gray-500">Loading chats...</div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p>No conversations yet.</p>
                <p className="text-xs mt-2">Search for someone above to start chatting!</p>
              </div>
            ) : (
              conversations.filter(c =>
                !searchQuery || getDisplayName(c.user).toLowerCase().includes(searchQuery.toLowerCase())
              ).map((conv) => (
                <div
                  key={conv.user_id}
                  onClick={() => handleChatSelect(conv.user_id)}
                  className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-colors ${activeChatUser?.id === conv.user_id ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                >
                  <div className="relative w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {getAvatarUrl(conv.user) ? (
                      <img src={getAvatarUrl(conv.user)!} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-blue-500" />
                    )}
                    {conv.unread_count > 0 && (
                      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className={`font-bold text-sm truncate ${conv.unread_count > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                        {getDisplayName(conv.user)}
                      </h3>
                      <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-2">
                        {conv.last_message ? new Date(conv.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className={`text-xs truncate max-w-[85%] ${conv.unread_count > 0 ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                        {conv.last_message?.body || 'No messages'}
                      </p>
                      {conv.unread_count > 0 && (
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                          {conv.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Area - Chat Interface */}
        <div className={`flex-1 flex flex-col ${!activeChatUser ? 'hidden md:flex' : 'flex'}`}>
          {activeChatUser ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <button onClick={() => setActiveChatUser(null)} className="md:hidden">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    {getAvatarUrl(activeChatUser) ? (
                      <img src={getAvatarUrl(activeChatUser)!} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{getDisplayName(activeChatUser)}</h3>
                    <p className="text-xs text-green-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto py-6 space-y-6 px-4">
                {isLoadingMessages ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-400 mt-10">
                    <p>No messages yet.</p>
                    <p className="text-sm">Say hello!</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.from_user_id === currentUserId;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div className={`flex items-end gap-2 max-w-[80%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${isMe
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-500"
                              }`}
                          >
                            {isMe ? (
                              <User className="w-4 h-4" />
                            ) : (
                              getAvatarUrl(activeChatUser) ? (
                                <img src={getAvatarUrl(activeChatUser)!} alt="Avatar" className="w-full h-full object-cover" />
                              ) : <User className="w-4 h-4" />
                            )}
                          </div>
                          <div
                            className={`p-4 text-sm leading-relaxed ${isMe
                                ? "bg-blue-600 text-white rounded-t-2xl rounded-bl-2xl shadow-md"
                                : "bg-gray-100 text-gray-800 rounded-t-2xl rounded-br-2xl"
                              }`}
                          >
                            {msg.body}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] text-gray-400 mt-1 ${isMe ? "mr-12" : "ml-12"
                            }`}
                        >
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {isMe && (
                            <span className="ml-1">
                              {msg.is_read ? "• Read" : "• Sent"}
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="pt-4 mt-auto">
                <div className="bg-gray-50 rounded-xl p-2 flex items-center gap-2 border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4 outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${messageInput.trim()
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                        : "text-gray-400 bg-gray-100 cursor-not-allowed"
                      }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Your Messages</h3>
              <p className="max-w-xs text-center text-sm">Select a conversation from the left to start chatting or view previous messages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
