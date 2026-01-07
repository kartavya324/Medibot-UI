
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm MediBOT AI. How can I assist you with your medical inquiries today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction: "You are MediBOT, a professional medical AI assistant. Every response MUST begin with a professional medical disclaimer stating: 'DISCLAIMER: I am an AI, not a doctor. This information is for educational purposes and not medical advice. For emergencies, call your local emergency services immediately.' After the disclaimer, provide helpful, accurate, and empathetic medical information based on current clinical standards. Keep your tone professional and encouraging.",
          temperature: 0.7,
        }
      });

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "I'm sorry, I'm having trouble processing your request at the moment.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "DISCLAIMER: I am an AI, not a doctor. I encountered a technical error. Please try again or consult a medical professional.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-blue-600 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold">AI Health Assistant</h3>
            <p className="text-xs text-blue-100 flex items-center">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse" />
              Powered by MediBOT Intelligence
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2 bg-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-medium">
          <Sparkles size={14} />
          <span>Advanced Diagnostic Model v2.4</span>
        </div>
      </div>

      {/* Warning Bar */}
      <div className="bg-amber-50 border-b border-amber-100 px-6 py-2 flex items-center space-x-3">
        <ShieldAlert size={16} className="text-amber-500 shrink-0" />
        <p className="text-[11px] text-amber-700 font-medium">
          Note: This AI does not replace professional medical diagnosis. In case of emergencies, call 911 or local emergency services.
        </p>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
              <div className={`p-2 rounded-xl shrink-0 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-100 text-blue-600'}`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
              }`}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('DISCLAIMER') ? 'font-bold text-xs mb-3 italic opacity-80 border-b border-current pb-2' : 'mb-2 last:mb-0'}>
                    {line}
                  </p>
                ))}
                <p className={`text-[10px] mt-2 opacity-60 text-right`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-3">
              <div className="bg-white border border-slate-100 text-blue-600 p-2 rounded-xl">
                <Bot size={18} />
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
                <Loader2 size={16} className="text-blue-600 animate-spin" />
                <span className="text-sm text-slate-500 italic">MediBOT is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center space-x-3 bg-slate-50 border border-slate-200 p-2 rounded-2xl"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms or ask a medical question..."
            className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-slate-700"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-100"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-3">
          End-to-end encrypted medical consultation.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
