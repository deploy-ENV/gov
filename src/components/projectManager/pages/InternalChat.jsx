import React, { useState, useRef, useEffect } from 'react';
import { User, Send, Paperclip, Circle, Camera, FileText, MapPin, Mic, X, FileImage } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DUMMY_PROJECTS = [
  // { id: 1, name: 'Bridge Construction', unread: 2 },
  // { id: 2, name: 'School Renovation', unread: 0 },
  // { id: 3, name: 'Water Supply Upgrade', unread: 1 },
];

const DUMMY_USERS = {
  pm: { name: 'Project Manager', role: 'PM', online: true },
  supervisor: { name: 'Arjun Kumar', role: 'Supervisor', online: true },
  contractor: { name: 'Priya Verma', role: 'Contractor', online: false },
};

const DUMMY_MESSAGES = [
  // {
  //   id: 1,
  //   sender: 'pm',
  //   content: "Hello team, please share today's progress update.",
  //   timestamp: '10:00 AM',
  // },
  // {
  //   id: 2,
  //   sender: 'supervisor',
  //   content: 'Site inspection completed. All safety protocols followed.',
  //   timestamp: '10:05 AM',
  // },
  // {
  //   id: 3,
  //   sender: 'contractor',
  //   content: 'Materials delivered and work started on foundation.',
  //   timestamp: '10:10 AM',
  // },
  // {
  //   id: 4,
  //   sender: 'pm',
  //   content: 'Great! Please upload photos in the Documents section.',
  //   timestamp: '10:12 AM',
  // },
];

function ChatHeader({ project, partner }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-white rounded-t-xl">
      <div>
        <div className="font-bold text-primary text-lg">{project.name}</div>
        <div className="flex items-center gap-2 text-sm text-secondary">
          <User className="text-accent" size={16} />
          {partner.role}: {partner.name}
          <Circle size={10} className={partner.online ? 'text-success' : 'text-secondary'} fill={partner.online ? '#2ECC71' : '#6E7A8A'} />
          <span className={partner.online ? 'text-success' : 'text-secondary'}>{partner.online ? 'Online' : 'Offline'}</span>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message, user }) {
  const isPM = message.sender === 'pm';
  return (
    <div className={`flex ${isPM ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-[75%] flex flex-col ${isPM ? 'items-end' : 'items-start'}`}>
        <div className={`text-xs mb-1 ${isPM ? 'text-primary' : 'text-secondary'}`}>{user.name} • {message.timestamp}</div>
        <div
          className={`rounded-2xl px-4 py-2 text-sm break-words shadow-card
            ${isPM ? 'bg-primary text-white' : 'bg-[#E1EAF2] text-primary'}`}
        >
          {message.content}
          {message.attachment && (
            <div className="mt-2">
              <AttachmentPreview attachment={message.attachment} isBubble />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AttachmentMenu({ open, onClose, onSelect }) {
  const ATTACH_OPTIONS = [
    {
      key: 'photo',
      icon: <Camera size={28} />, label: 'Photo/Video', accept: 'image/*,video/*', color: 'bg-accent text-white',
    },
    {
      key: 'document',
      icon: <FileText size={28} />, label: 'Document', accept: '.pdf,.doc,.docx', color: 'bg-blue-500 text-white',
    },
    {
      key: 'location',
      icon: <MapPin size={28} />, label: 'Location', color: 'bg-green-500 text-white',
    },
    {
      key: 'contact',
      icon: <User size={28} />, label: 'Contact', color: 'bg-yellow-500 text-white',
    },
    {
      key: 'audio',
      icon: <Mic size={28} />, label: 'Audio', color: 'bg-purple-500 text-white',
    },
  ];
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pb-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="bg-white rounded-2xl shadow-xl px-6 py-4 flex gap-6">
              {ATTACH_OPTIONS.map((opt) =>
                opt.accept ? (
                  <label key={opt.key} className="flex flex-col items-center cursor-pointer group">
                    <input
                      type="file"
                      className="hidden"
                      accept={opt.accept}
                      onChange={(e) => onSelect(opt.key, e.target.files ? e.target.files[0] : null)}
                    />
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-full mb-1 ${opt.color} group-hover:scale-110 transition`}
                    >
                      {opt.icon}
                    </div>
                    <span className="text-xs text-primary">{opt.label}</span>
                  </label>
                ) : (
                  <button
                    key={opt.key}
                    type="button"
                    className="flex flex-col items-center group"
                    onClick={() => onSelect(opt.key)}
                  >
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-full mb-1 ${opt.color} group-hover:scale-110 transition`}
                    >
                      {opt.icon}
                    </div>
                    <span className="text-xs text-primary">{opt.label}</span>
                  </button>
                )
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function AttachmentPreview({ attachment, onRemove, isBubble }) {
  if (!attachment) return null;
  return (
    <div className={`flex items-center gap-3 ${isBubble ? '' : 'bg-[#F9FAFB] border border-accent rounded-lg p-3 mb-2'}`}>
      {attachment.type === 'photo' && attachment.file && (
        <img src={URL.createObjectURL(attachment.file)} alt="preview" className="w-16 h-16 object-cover rounded" />
      )}
      {attachment.type === 'document' && attachment.file && (
        <div className="flex items-center gap-2">
          <FileText className="text-blue-600" size={20} />
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">{attachment.file.name}</span>
        </div>
      )}
      {attachment.type === 'location' && (
        <span className="text-green-600 font-medium">📍 {attachment.value || 'Location shared'}</span>
      )}
      {attachment.type === 'contact' && (
        <span className="text-yellow-600 font-medium">👤 {attachment.value?.name || 'Contact'}</span>
      )}
      {attachment.type === 'audio' && (
        <span className="text-purple-600 font-medium">🎤 Audio message</span>
      )}
      {onRemove && !isBubble && (
        <button type="button" className="ml-auto text-error hover:bg-error/10 rounded-full p-1" onClick={onRemove}>
          <X size={18} />
        </button>
      )}
    </div>
  );
}

function ChatInput({ onSend }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [input, setInput] = useState("");

  const handleAttach = (type, fileOrValue) => {
    setMenuOpen(false);
    if (type === "photo" || type === "document") {
      setAttachment({ type, file: fileOrValue });
    } else if (type === "location") {
      setAttachment({ type, value: "28.6139° N, 77.2090° E" }); // Dummy location
    } else if (type === "contact") {
      setAttachment({ type, value: { name: "Amit Kumar", phone: "+91-9876543210" } }); // Dummy contact
    } else if (type === "audio") {
      setAttachment({ type, value: "AudioBlob" }); // Simulate audio
    }
  };

  const handleSend = () => {
    if (!input.trim() && !attachment) return;
    onSend(input, attachment);
    setInput("");
    setAttachment(null);
  };

  return (
    <div className="relative">
      <AttachmentPreview attachment={attachment} onRemove={() => setAttachment(null)} />
      <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-white rounded-b-xl">
        <button
          type="button"
          className="text-accent hover:bg-accent/10 rounded-full p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Attach"
        >
          <Paperclip size={20} />
        </button>
        <textarea
          className="flex-1 resize-none glass p-3 rounded-lg border border-border focus:ring-2 focus:ring-accent/30 text-primary text-sm"
          placeholder="Type your message..."
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          type="button"
          className="bg-accent text-white rounded-full p-3 shadow-card hover:scale-105 transition"
          onClick={handleSend}
          aria-label="Send"
        >
          <Send size={20} />
        </button>
      </div>
      <AttachmentMenu open={menuOpen} onClose={() => setMenuOpen(false)} onSelect={handleAttach} />
    </div>
  );
}

function ChatPanel() {
  const [selectedProject, setSelectedProject] = useState(DUMMY_PROJECTS[0]);
  const [partner, setPartner] = useState(DUMMY_USERS.supervisor);
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text, attachment) => {
    if (!text.trim() && !attachment) return;
    setMessages(msgs => [
      ...msgs,
      {
        id: msgs.length + 1,
        sender: 'pm',
        content: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachment: attachment || null,
      },
    ]);
  };

  return (
    <div className="flex h-[80vh] bg-[#F7F9FC] rounded-xl shadow-card overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-80 bg-white border-r border-border p-4 gap-2">
        <div className="font-bold text-primary mb-2">Projects</div>
        {DUMMY_PROJECTS.map(p => (
          <button
            key={p.id}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-left transition font-medium ${selectedProject.id === p.id ? 'bg-accent/10 text-primary' : 'hover:bg-accent/5 text-secondary'}`}
            onClick={() => setSelectedProject(p)}
          >
            <span>{p.name}</span>
            {p.unread > 0 && <span className="ml-2 bg-accent text-white text-xs rounded-full px-2 py-0.5">{p.unread}</span>}
          </button>
        ))}
      </div>
      {/* Main Chat Panel */}
      <div className="flex-1 flex flex-col">
        <ChatHeader project={selectedProject} partner={partner} />
        <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-6 bg-[#F7F9FC]">
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} user={DUMMY_USERS[msg.sender]} />
          ))}
        </div>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default function InternalChat() {
  return (
    <div className="h-full w-full bg-[#F7F9FC] p-0 m-0">
      <ChatPanel />
    </div>
  );
} 