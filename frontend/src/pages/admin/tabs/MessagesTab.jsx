import React, { useState } from 'react';
import { 
  Trash2, MessageSquare, Clock, Mail, Search, Send, ArrowLeft, Copy, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MessagesTab({ messages, handleDeleteMessage }) {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Filter messages based on search query
  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeMessage = selectedMessageId 
    ? messages.find(m => m.id === selectedMessageId) 
    : null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onDeleteClick = (id) => {
    if (activeMessage && activeMessage.id === id) {
      setSelectedMessageId(null);
    }
    handleDeleteMessage(id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] min-h-[550px] max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="flex justify-between items-start mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold text-admin-text mb-2 tracking-tight">Bình luận & Hộp thư</h1>
          <p className="text-admin-muted text-xs font-medium">Kiểm duyệt, xem và phản hồi các tin nhắn từ người truy cập portfolio</p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-admin-accent/15 border border-admin-accent/30 text-admin-accent text-xs font-bold">
          {messages.length} tin nhắn
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-admin-border rounded-3xl bg-admin-card p-12">
          <div className="w-20 h-20 rounded-full bg-admin-input-bg border border-admin-border flex items-center justify-center mb-6">
            <MessageSquare size={32} className="text-admin-muted" />
          </div>
          <h3 className="text-xl font-bold text-admin-text mb-2">Hộp thư trống</h3>
          <p className="text-admin-muted text-sm text-center max-w-sm">Khi khách truy cập gửi tin nhắn qua biểu mẫu liên hệ trong portfolio của bạn, chúng sẽ xuất hiện ở đây.</p>
        </div>
      ) : (
        <div className="flex-1 flex border border-admin-border rounded-2xl bg-admin-card overflow-hidden shadow-xl">
          {/* LEFT COLUMN: Message List */}
          <div className={`w-full md:w-2/5 flex flex-col border-r border-admin-border bg-admin-sidebar/25 ${selectedMessageId ? 'hidden md:flex' : 'flex'}`}>
            {/* Search Box */}
            <div className="p-4 border-b border-admin-border shrink-0 bg-admin-sidebar/10">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-admin-muted" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm người gửi, email, nội dung..." 
                  className="w-full bg-admin-input-bg border border-admin-border rounded-xl py-2.5 pl-10 pr-4 text-xs text-admin-text focus:outline-none focus:border-admin-accent transition-colors shadow-inner"
                />
              </div>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-10 text-admin-muted text-xs font-medium">
                  Không tìm thấy tin nhắn phù hợp
                </div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-2"
                >
                  {filteredMessages.map((m) => {
                    const isActive = activeMessage && activeMessage.id === m.id;
                    return (
                      <motion.div 
                        variants={itemVariants}
                        key={m.id}
                        onClick={() => setSelectedMessageId(m.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group select-none ${
                          isActive 
                            ? 'bg-admin-accent/10 border-admin-accent/50 shadow-md shadow-admin-accent/5' 
                            : 'bg-admin-input-bg/40 border-admin-border hover:bg-admin-card-hover hover:border-admin-border-strong'
                        }`}
                      >
                        {/* Selected Indicator strip */}
                        <div className={`absolute left-0 top-0 w-1 h-full bg-admin-accent transition-transform duration-300 ${
                          isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                        }`}></div>

                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <h4 className="font-bold text-sm text-admin-text truncate pr-2">{m.name}</h4>
                          <span className="text-[10px] font-semibold text-admin-muted whitespace-nowrap">
                            {new Date(m.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-admin-text-secondary truncate font-medium mb-1">{m.email}</p>
                        <p className="text-xs text-admin-muted truncate italic">
                          "{m.message}"
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Details View */}
          <div className={`w-full md:w-3/5 flex flex-col bg-admin-card/50 ${selectedMessageId ? 'flex' : 'hidden md:flex'}`}>
            <AnimatePresence mode="wait">
              {activeMessage ? (
                <motion.div 
                  key={activeMessage.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col h-full"
                >
                  {/* Message Detail Header */}
                  <div className="p-6 border-b border-admin-border flex items-center justify-between gap-4 shrink-0 bg-admin-sidebar/5">
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Back button (Mobile only) */}
                      <button 
                        onClick={() => setSelectedMessageId(null)}
                        className="md:hidden p-2 rounded-xl bg-admin-input-bg border border-admin-border text-admin-text hover:bg-admin-card-hover transition-colors mr-2 shrink-0 cursor-pointer"
                      >
                        <ArrowLeft size={16} />
                      </button>

                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-admin-accent to-orange-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-admin-accent/20 shrink-0">
                        {activeMessage.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-admin-text font-black text-lg truncate leading-tight mb-1">{activeMessage.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-admin-muted font-medium truncate">
                          <Mail size={12} className="text-admin-accent" />
                          <span>{activeMessage.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-admin-muted bg-admin-input-bg border border-admin-border px-3 py-1.5 rounded-lg">
                        <Clock size={12} />
                        {new Date(activeMessage.createdAt).toLocaleDateString()}
                      </div>
                      
                      <button 
                        onClick={() => onDeleteClick(activeMessage.id)} 
                        className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 cursor-pointer"
                        title="Xóa tin nhắn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Message Detail Content */}
                  <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-xs lg:hidden text-admin-muted font-semibold bg-admin-input-bg border border-admin-border p-3 rounded-xl">
                        <span className="flex items-center gap-2"><Clock size={14} /> Thời gian nhận:</span>
                        <span>{new Date(activeMessage.createdAt).toLocaleString()}</span>
                      </div>

                      <div className="bg-admin-input-bg border border-admin-border rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleCopy(activeMessage.message)}
                            className="p-2 rounded-lg bg-admin-sidebar border border-admin-border text-admin-muted hover:text-admin-text hover:bg-admin-card-hover transition-colors cursor-pointer"
                            title="Sao chép nội dung tin nhắn"
                          >
                            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          </button>
                        </div>
                        <h4 className="text-xs uppercase font-bold tracking-widest text-admin-accent mb-4">Nội dung tin nhắn</h4>
                        <p className="text-admin-text-secondary text-sm leading-relaxed whitespace-pre-wrap font-sans italic">
                          "{activeMessage.message}"
                        </p>
                      </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="pt-6 border-t border-admin-border mt-8 flex flex-wrap gap-4 items-center justify-between shrink-0">
                      <div className="text-xs text-admin-muted font-medium">
                        Cần phản hồi? Hãy sử dụng liên kết nhanh để gửi phản hồi qua email.
                      </div>
                      <a 
                        href={`mailto:${activeMessage.email}?subject=Re: Message from Portfolio&body=Hi ${activeMessage.name},%0D%0A%0D%0AThank you for reaching out via my portfolio.%0D%0A%0D%0ABest regards,%0D%0A`}
                        className="group bg-gradient-to-r from-admin-accent to-orange-500 shadow-md shadow-admin-accent/15 hover:shadow-admin-accent/30 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all hover:scale-[1.02] text-sm cursor-pointer"
                      >
                        <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        <span>Phản hồi qua Email</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center select-none">
                  <div className="w-16 h-16 rounded-full bg-admin-input-bg border border-admin-border flex items-center justify-center mb-4 text-admin-muted opacity-40">
                    <MessageSquare size={28} />
                  </div>
                  <h4 className="text-admin-text font-bold mb-1">Chưa chọn cuộc hội thoại</h4>
                  <p className="text-admin-muted text-xs max-w-xs">Chọn một tin nhắn từ danh sách bên trái để xem chi tiết, phản hồi hoặc xóa.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
