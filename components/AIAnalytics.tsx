import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, FileText } from 'lucide-react';
import { generateERPAnalysis } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAnalytics: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Halo, saya adalah Analis AI NexusHealth Anda. Saya dapat menganalisis tren keuangan, demografi pasien, atau penolakan klaim berdasarkan data ERP langsung Anda. Apa yang bisa saya bantu hari ini?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await generateERPAnalysis(userMsg.text, history);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Analysis Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Analisis proyeksi Pendapatan Q3",
    "Kenapa tingkat penolakan klaim tinggi?",
    "Tampilkan 5 diagnosis teratas berdasarkan biaya",
    "Identifikasi hambatan rantai pasok"
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 ml-64 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center shadow-sm">
        <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mr-4 shadow-lg shadow-indigo-200">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Analisis Bisnis Cerdas (BI)</h1>
          <p className="text-xs text-slate-500">Ditenagai oleh Gemini 2.5 Flash • Konteks: Keuangan, Klinis, Operasional</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-3xl ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mx-3 shadow-md ${
                msg.role === 'user' ? 'bg-white border border-slate-200' : 'bg-gradient-to-br from-teal-500 to-emerald-600'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-slate-600" /> : <Bot className="w-6 h-6 text-white" />}
              </div>
              <div className={`p-5 rounded-3xl shadow-sm text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user' 
                  ? 'bg-white text-slate-800 border border-slate-200 rounded-tr-sm' 
                  : 'bg-white text-slate-800 border border-emerald-100 rounded-tl-sm shadow-emerald-100/50'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="flex max-w-3xl flex-row">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mx-3">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white p-5 rounded-3xl rounded-tl-sm shadow-sm border border-emerald-100 flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                  <span className="text-sm text-slate-500 font-medium">Menganalisis data ERP...</span>
                </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {suggestions.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => { setQuery(s); }}
                  className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-medium text-indigo-700 hover:bg-indigo-100 hover:border-indigo-200 transition-all whitespace-nowrap shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          
          <div className="relative group">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Tanyakan tentang laporan, tren, atau data pasien spesifik..."
              className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-sm shadow-inner transition-all focus:bg-white"
              rows={2}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !query.trim()}
              className="absolute right-3 bottom-3 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 font-medium">
            AI NexusHealth dapat membuat kesalahan. Verifikasi data klinis dan keuangan yang kritis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;