import React, { useRef, useState } from "react";
import { Send, Paperclip, Smile, Mic, X } from "lucide-react";

function MessageInput({ onSend, attachments = [], onAttachmentChange, onRemoveAttachment }) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() || attachments.length > 0) {
      onSend(input, attachments);
      setInput("");
      // Clear attachments after sending
      attachments.forEach((_, index) => onRemoveAttachment(index));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const attachment = {
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        file: file
      };
      onAttachmentChange(attachment);
    });
  };

  const removeAttachment = (index) => {
    onRemoveAttachment(index);
  };

  return (
    <div className="border-t border-slate-700 p-4">
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="mb-3 p-3 bg-slate-700/50 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-slate-600 rounded-lg">
                <span className="text-sm text-white">{attachment.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="p-1 hover:bg-slate-500 rounded transition-colors"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            placeholder="Type your message..."
            className="w-full p-3 pr-12 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="1"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
          
          {/* Action Buttons */}
          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 hover:bg-slate-600 rounded transition-colors"
              title="Attach file"
            >
              <Paperclip className="w-4 h-4 text-gray-400" />
            </button>
            <button
              type="button"
              className="p-1.5 hover:bg-slate-600 rounded transition-colors"
              title="Emoji"
            >
              <Smile className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() && attachments.length === 0}
          className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <Send className="w-4 h-4 text-white" />
        </button>

        {/* Voice Message Button */}
        <button
          type="button"
          className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          title="Voice message"
        >
          <Mic className="w-4 h-4 text-gray-400" />
        </button>
      </form>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}

export default MessageInput; 