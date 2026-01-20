import { useState } from "react";
import { Search, Send, ArrowLeft, User, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RegulatoryBodyMessages = () => {
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
      name: "BMH Hospital",
      lastMessage: "Hello, can we reschedule our meeting?",
      time: "02:23",
      unread: false,
    },
    {
      id: 2,
      name: "St. Charles",
      lastMessage: "Hello, can we reschedule our meeting?",
      time: "02:23",
      unread: false,
    },
    {
      id: 3,
      name: "Tesla Health Clinic",
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
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-40px)] pb-6 p-4 bg-gray-50/50">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <span className="text-gray-500 font-medium">Messages</span>
      </div>

      <div className="flex gap-6 h-[calc(100%-60px)] bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden">
        {/* Left Sidebar - Chat List */}
        <div className="w-1/3 flex flex-col border-r border-gray-100 pr-6">
          {/* Create Alert Button */}
          <div className="mb-4">
            <Button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-600 border-none shadow-none justify-between h-12 rounded-xl">
              <span className="font-medium">Create Alert</span>
              <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center">
                <Plus className="w-4 h-4 text-blue-600" />
              </div>
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-3 h-3 text-gray-400" />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-1">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  activeChat === chat.id ? "bg-yellow-400" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    activeChat === chat.id ? "bg-blue-100/50" : "bg-blue-100"
                  }`}
                >
                  <User
                    className={`w-5 h-5 ${
                      activeChat === chat.id ? "text-blue-600" : "text-blue-500"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3
                      className={`font-bold text-sm truncate ${
                        activeChat === chat.id
                          ? "text-gray-900"
                          : "text-gray-900"
                      }`}
                    >
                      {chat.name}
                    </h3>
                    <span
                      className={`text-xs font-medium ${
                        activeChat === chat.id
                          ? "text-blue-600"
                          : "text-blue-500"
                      }`}
                    >
                      {chat.time}
                    </span>
                  </div>
                  <p
                    className={`text-xs truncate ${
                      activeChat === chat.id ? "text-gray-700" : "text-gray-500"
                    }`}
                  >
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area - Chat Interface */}
        <div className="flex-1 flex flex-col pl-6">
          {/* Chat Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">BMH Hospital</h3>
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
                {msg.sender === "them" && (
                  <div className="text-xs text-blue-400 mb-1 ml-12">
                    Metro Hospital Enugu
                  </div>
                )}
                {msg.sender === "me" && (
                  <div className="text-xs text-gray-400 mb-1 mr-12 text-right">
                    02:23
                  </div>
                )}

                {msg.sender === "them" && (
                  <div className="text-xs text-blue-400 mb-1 ml-12 text-right w-full flex justify-end px-2">
                    02:23
                  </div>
                )}
                {/* Re-structuring specific to design provided in thought process, standard bubble */}
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    msg.sender === "me" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === "me"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <User className="w-4 h-4" />
                  </div>
                  <div
                    className={`p-3 text-sm leading-relaxed ${
                      msg.sender === "me"
                        ? "bg-gray-200 text-gray-800 rounded-l-xl rounded-br-xl" // Darker gray for me
                        : "bg-gray-50 text-gray-600 rounded-r-xl rounded-bl-xl border border-gray-100" // Light/White for them
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
                {msg.sender === "me" && (
                  <div className="text-[10px] text-gray-400 mt-1 mr-10">Me</div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="pt-4 mt-auto">
            <div className="bg-gray-50 rounded-xl p-2 flex items-center gap-2 border border-gray-100">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Enter to send a message"
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4 outline-none text-gray-600 placeholder:text-gray-400"
              />
              <button className="w-8 h-8 flex items-center justify-center text-blue-500 hover:text-blue-600 transition-colors">
                <Send className="w-5 h-5 rotate-45" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryBodyMessages;
