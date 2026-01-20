import { useState } from "react";
import { Search, Send, ArrowLeft, User} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(0);
  const [messageInput, setMessageInput] = useState("");

  const conversations = [
    {
      id: 0,
      name: "Metro Hospital Enugu",
      lastMessage: "Hello, can we reschedule our meeting?",
      time: "02:23",
      unread: false,
    },
    {
      id: 1,
      name: "Metro Hospital Enugu",
      lastMessage: "Hello, can we reschedule our meeting?",
      time: "02:23",
      unread: false,
    },
    {
      id: 2,
      name: "Metro Hospital Enugu",
      lastMessage: "Hello, can we reschedule our meeting?",
      time: "02:23",
      unread: false,
    },
    {
      id: 3,
      name: "Metro Hospital Enugu",
      lastMessage: "Hello, can we reschedule our meeting?",
      time: "02:23",
      unread: false,
    },
    {
      id: 4,
      name: "Metro Hospital Enugu",
      lastMessage: "Hello, can we reschedule our meeting?",
      time: "02:23",
      unread: false,
    },
    {
      id: 5,
      name: "Metro Hospital Enugu",
      lastMessage: "Hello, can we reschedule our meeting?",
      time: "02:23",
      unread: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "them",
      text: "Hello, I'd like to schedule a blood donation session. Could you let me know the available slots?",
      time: "02:23",
    },
    {
      id: 2,
      sender: "me",
      text: "Hi! Thank you for reaching out. We currently have slots available tomorrow at 10 AM, 12 PM, and 3 PM. Which one works best for you?",
      time: "02:23",
    },
    {
      id: 3,
      sender: "me",
      text: "Hi! Thank you for reaching out. We currently have slots available tomorrow at 10 AM, 12 PM, and 3 PM. Which one works best for you?",
      time: "02:23",
    },
    {
      id: 4,
      sender: "them",
      text: "Hello, I'd like to schedule a blood donation session. Could you let me know the available slots?",
      time: "02:23",
    },
    {
      id: 5,
      sender: "them",
      text: "Hello, I'd like to schedule a blood donation session. Could you let me know the available slots?",
      time: "02:23",
    },
  ];

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
        <div className="w-1/3 flex flex-col border-r border-gray-100 pr-6">
          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-50 border-none rounded-xl py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-blue-500/20"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
              <Search className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-1">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  activeChat === chat.id ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 text-sm truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-blue-500 font-medium">
                      {chat.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area - Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-gray-900">Metro Hospital Enugu</h3>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6 px-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "me" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`flex items-end gap-2 max-w-[80%] ${
                    msg.sender === "me" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === "me"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-500"
                    }`}
                  >
                    <User className="w-4 h-4" />
                  </div>
                  <div
                    className={`p-4 text-sm leading-relaxed ${
                      msg.sender === "me"
                        ? "bg-gray-100 text-gray-700 rounded-t-2xl rounded-bl-2xl"
                        : "bg-blue-50 text-gray-700 rounded-t-2xl rounded-br-2xl"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
                <span
                  className={`text-[10px] text-blue-400 mt-1 ${
                    msg.sender === "me" ? "mr-12" : "ml-12"
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="pt-4 mt-auto">
            <div className="bg-gray-50 rounded-xl p-2 flex items-center gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Enter to send a message"
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4 outline-none"
              />
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                <Send className="w-5 h-5 rotate-45" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
