"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Calculator, Wrench, CalendarCheck, HelpCircle, MessageSquare, ArrowLeft, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const agents = [
  { id: "advisor", name: "Product Advisor", icon: Bot, desc: "Find the perfect UPS, battery or stabilizer", greeting: "Hi! I'm your Product Advisor. Are you looking for a UPS, battery, voltage stabilizer or complete power backup for your home or business?" },
  { id: "calculator", name: "Power Calculator", icon: Calculator, desc: "Calculate your battery & load requirements", greeting: "Let's calculate your power needs! How many appliances (fans, lights, PCs) do you need to run?" },
  { id: "support", name: "AMC & Repair", icon: Wrench, desc: "Schedule maintenance or repairs", greeting: "Need maintenance? Are you an existing AMC customer, or do you need a one-time repair service?" },
  { id: "tech", name: "Troubleshooting", icon: HelpCircle, desc: "Fix beep codes and errors", greeting: "I can help troubleshoot your system. Is your UPS beeping, showing a red light, or not turning on?" },
  { id: "booking", name: "Booking & Leads", icon: CalendarCheck, desc: "Book an installation or get a quote", greeting: "Ready to get started? I can help you book an installation or schedule a site visit. What's your location?" },
  { id: "whatsapp", name: "WhatsApp Gateway", icon: MessageSquare, desc: "Move this chat to WhatsApp", greeting: "Redirecting you to our human team on WhatsApp..." }
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [messages, setMessages] = useState<{role: 'ai'|'user', text: string}[]>([]);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const activeAgent = agents.find(a => a.id === selectedAgent);

  useEffect(() => {
    if (selectedAgent && activeAgent) {
      if (selectedAgent === "whatsapp") {
        window.open("https://wa.me/919999999999?text=Hi%20PowerTech%20Solutions,%20I%20need%20help.", "_blank");
        setSelectedAgent(null);
        setIsOpen(false);
      } else {
        setMessages([{ role: 'ai', text: activeAgent.greeting }]);
      }
    }
  }, [selectedAgent]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    
    // Simulate AI response based on agent
    setTimeout(() => {
      let reply = "I understand. Please contact our support line at 011-29945496 for immediate assistance.";
      if (selectedAgent === "calculator") reply = "Based on that, you'll need roughly a 1KVA to 1.5KVA online UPS with an Amaron Quanta 150Ah SMF battery for around 4 hours of backup.";
      if (selectedAgent === "advisor") reply = "For that setup, I highly recommend our Powertech Online UPS paired with an Amaron Quanta SMF battery. Would you like a price estimate?";
      if (selectedAgent === "tech") reply = "A continuous beep usually indicates an overload. Try disconnecting non-essential appliances and restart the UPS.";
      
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Bot size={28} className="relative z-10" />
              
              {/* Notification dot */}
              <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] max-h-[600px] h-[80vh] bg-white border border-gray-200 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gray-900 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {selectedAgent ? (
                  <button onClick={() => setSelectedAgent(null)} className="hover:bg-gray-800 p-1 rounded transition-colors">
                    <ArrowLeft size={20} />
                  </button>
                ) : (
                  <Zap size={24} className="text-red-500" />
                )}
                <div>
                  <h3 className="font-bold text-sm">{selectedAgent ? activeAgent?.name : "PowerTech AI System"}</h3>
                  <p className="text-[10px] text-gray-400">{selectedAgent ? "Online" : "Select an agent to begin"}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-gray-800 p-1 rounded transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col">
              {!selectedAgent ? (
                // Agent Selection Menu
                <div className="p-4 flex flex-col gap-2">
                  <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Available Agents</p>
                  {agents.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id)}
                      className="flex items-center gap-4 p-3 bg-white border border-gray-100 hover:border-red-200 hover:shadow-md transition-all text-left group"
                    >
                      <div className="bg-gray-50 p-2 rounded-none group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                        <agent.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{agent.name}</h4>
                        <p className="text-[11px] text-gray-500">{agent.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                // Chat Interface
                <div className="flex-1 p-4 flex flex-col gap-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 text-sm ${
                        msg.role === 'user' 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={endOfMessagesRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            {selectedAgent && (
              <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim()}
                    className="bg-red-600 text-white p-2.5 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
