import React, { useState, useRef } from "react";
import FuzzySearch from "fuzzy-search";
import EmojiPopup from "./EmojiPopup";

const mockMessages = [
  { id: 1, username: "Alice", content: "Hello everyone!", tagged: false },
  { id: 2, username: "Bob", content: "@Alice How are you?", tagged: true },
];

const mockUsers = ["Alice", "Bob", "Charlie", "Dave", "edeuxk"];
const commands = ["mute", "ban", "title", "description"];

const searcher = new FuzzySearch(mockUsers, [], {
  caseSensitive: false,
});

const Chat = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUserPicker, setShowUserPicker] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showCommandPicker, setShowCommandPicker] = useState(false);
  const inputRef = useRef();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const atIndex = value.lastIndexOf("@");
    const slashIndex = value.lastIndexOf("/");

    if (atIndex !== -1) {
      const query = value.slice(atIndex + 1).toLowerCase();
      const matches = searcher.search(query);
      setFilteredUsers(matches);
      setShowUserPicker(matches.length > 0);
      setShowCommandPicker(false);
    } else if (slashIndex !== -1) {
      const query = value.slice(slashIndex + 1).toLowerCase();
      const matches = commands.filter((command) =>
        command.toLowerCase().includes(query)
      );
      setShowCommandPicker(matches.length > 0);
      setShowUserPicker(false);
    } else {
      setShowUserPicker(false);
      setShowCommandPicker(false);
    }
  };

  const handleSend = () => {
    if (input.trim() === "") {
      return;
    }
    const newMessage = {
      id: messages.length + 1,
      username: "You",
      content: input,
      tagged: false,
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  const handleEmojiClick = (emojiObject) => {
    setInput(input + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleUserTag = (username) => {
    const atIndex = input.lastIndexOf("@");
    const newInput = input.slice(0, atIndex + 1) + username + " ";
    setInput(newInput);
    setShowUserPicker(false);
  };

  const handleCommandSelect = (command) => {
    const slashIndex = input.lastIndexOf("/");
    const newInput = input.slice(0, slashIndex + 1) + command + " ";
    setInput(newInput);
    setShowCommandPicker(false);
  };

  const renderMessageContent = (content) => {
    const parts = content.split(/(:\w+:)/g);
    return parts.map((part, index) => {
      if (part.startsWith(":") && part.endsWith(":")) {
        const emoji = part.slice(1, -1);
        return (
          <img
            key={index}
            src={`/emojis/${emoji}.png`}
            alt={emoji}
            className="inline w-5 h-5"
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-xl relative">
      <div className="h-64 overflow-y-scroll mb-4 p-4 bg-gray-50 rounded-2xl shadow-inner">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 my-2 rounded-lg ${
              message.tagged ? "bg-yellow-100" : "bg-white"
            } shadow-md`}
          >
            <strong>{message.username}:</strong>{" "}
            {renderMessageContent(message.content)}
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="p-3 border border-gray-300 rounded-lg w-full mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <div className="flex items-center space-x-2 mb-2">
        <button
          onClick={() => setShowEmojiPicker(true)}
          className="p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:-translate-y-1"
        >
          Emojis
        </button>
        <button
          onClick={handleSend}
          className="p-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-transform transform hover:-translate-y-1"
        >
          Send
        </button>
      </div>
      {showEmojiPicker && (
        <EmojiPopup
          onEmojiClick={handleEmojiClick}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}
      {showUserPicker && (
        <div className="absolute bottom-24 left-0 z-10 bg-white border p-2 rounded-lg shadow-lg max-h-64 overflow-y-auto w-48">
          {filteredUsers.map((user) => (
            <div
              key={user}
              onClick={() => handleUserTag(user)}
              className="p-2 cursor-pointer hover:bg-gray-200 rounded"
            >
              {user}
            </div>
          ))}
        </div>
      )}
      {showCommandPicker && (
        <div className="absolute bottom-24 left-0 z-10 bg-white border p-2 rounded-lg shadow-lg max-h-64 overflow-y-auto w-48">
          {commands.map((command) => (
            <div
              key={command}
              onClick={() => handleCommandSelect(command)}
              className="p-2 cursor-pointer hover:bg-gray-200 rounded"
            >
              {command}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
