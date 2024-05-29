import React from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPopup = ({ onEmojiClick, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-4 rounded-lg shadow-lg max-h-96 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <EmojiPicker onEmojiClick={onEmojiClick} />
      </div>
    </div>
  );
};

export default EmojiPopup;
