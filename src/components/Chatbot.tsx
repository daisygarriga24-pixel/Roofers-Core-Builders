/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  FileText,
  Shield,
  Clock,
  Check,
  ChevronRight,
  Sparkle,
  User,
  HelpCircle
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  isQuickReply?: boolean;
}

// Custom simple responses for simulated AI
const ROOFING_KNOWLEDGE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["price", "cost", "estimate", "quote", "charge", "much"],
    answer: "We offer 100% free inspections and detailed, upfront estimates with absolutely no hidden fees. A typical roof depends on square footage, materials (asphalt vs. metal), and slopes. Would you like to request a free estimate right now? Just type your name or click 'Get Free Estimate'."
  },
  {
    keywords: ["leak", "water", "ceiling", "rain", "drip", "mold"],
    answer: "Active leaks can cause structural and mold issues very quickly. We offer priority Roof Repair services to find and seal leaks immediately. Would you like to schedule an emergency inspection within 24 hours?"
  },
  {
    keywords: ["insurance", "storm", "wind", "hail", "damage", "claim"],
    answer: "We specialize in storm restoration! We perform detailed multi-point safety inspections and provide complete HD photo documentation to assist with your insurance claim paperwork. Let's secure your home today!"
  },
  {
    keywords: ["warranty", "guarantee", "insured", "licensed"],
    answer: "Your investment is safe with us! We are fully licensed, bonded, and insured. All our complete roof replacements are backed by reliable multi-year to lifetime manufacturer warranty options."
  },
  {
    keywords: ["time", "duration", "how long", "schedule"],
    answer: "Most roof replacements take only 1 to 2 days to complete from start to finish! Our team works quickly and cleans up meticulously every single afternoon using magnetic sweeps. When were you looking to get started?"
  },
  {
    keywords: ["where", "location", "miami", "florida", "area", "serve"],
    answer: "We proudly serve the entire Miami-Dade area and surrounding Florida regions. We are a locally rated 4.8-star business with years of weatherproof building experience."
  },
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    answer: "Hello! I'm your Expert Roofing AI Assistant. How can I protect, restore, or enhance your home today? Feel free to ask me about repair, replacements, storm damage, or request an instant free estimate!"
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hi there! 👋 I am your Core Promise AI Assistant. I can answer common roofing questions, explain our 4-step process, or help you request a free 24-hour estimate. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);

  // Lead Collection State Machine
  const [leadStep, setLeadStep] = useState<"none" | "name" | "contact" | "details" | "done">("none");
  const [leadData, setLeadData] = useState({
    name: "",
    contact: "",
    details: ""
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasNewMessage(false);
      // Focus input
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (textToSend: string, isFromQuickAction = false) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
      isQuickReply: isFromQuickAction
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulated AI Processing Delay
    setTimeout(() => {
      generateBotResponse(textToSend.toLowerCase());
    }, 1200);
  };

  const generateBotResponse = (userInput: string) => {
    setIsTyping(false);
    let replyText = "";
    const cleanInput = userInput.trim().toLowerCase();
    const isAffirmative = [
      "yes", "yeah", "sure", "yep", "ok", "okay", "absolutely", "please", "of course", "definitely", "yes please", "y", "do it"
    ].includes(cleanInput) || cleanInput.startsWith("yes ") || cleanInput.startsWith("yeah ") || cleanInput.startsWith("sure ");

    // 1. Lead state machine logic
    if (leadStep === "none" && isAffirmative) {
      setLeadStep("name");
      replyText = "Wonderful! Let's gather a few quick details to schedule your 100% free roofing inspection & estimate. To get started, what is your first and last name?";
    } else if (leadStep === "name") {
      setLeadData((prev) => ({ ...prev, name: userInput }));
      setLeadStep("contact");
      replyText = `Pleasure meeting you, ${userInput}! 😊 What is the best phone number or email address to reach you at?`;
    } else if (leadStep === "contact") {
      setLeadData((prev) => ({ ...prev, contact: userInput }));
      setLeadStep("details");
      replyText = `Perfect. Lastly, can you briefly tell me about your roofing needs? (e.g. Roof Replacement, Active Leak Repair, Gutter Inspection, Storm Assessment)`;
    } else if (leadStep === "details") {
      const finalDetails = userInput;
      setLeadData((prev) => ({ ...prev, details: finalDetails }));
      setLeadStep("done");
      replyText = `🎉 Thank you, ${leadData.name}! I've successfully logged your request for "${finalDetails}". Our project lead, Leonard, will contact you shortly at ${leadData.contact}. I'm also scrolling you down to our advanced offline estimator form for any custom material selections!`;
      
      // Auto-scroll page to estimate form safely
      setTimeout(() => {
        const estimateEl = document.getElementById("estimate");
        if (estimateEl) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = estimateEl.getBoundingClientRect().top;
          const offsetPosition = elementRect - bodyRect - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 2000);
    } 
    // 2. Main command matches
    else if (userInput.includes("free estimate") || userInput.includes("estimate") || userInput.includes("quote") || userInput.includes("get free")) {
      setLeadStep("name");
      replyText = "I'd love to help you schedule a fast, 100% free roofing inspection & quote! To get started, what is your first and last name?";
    } else if (userInput.includes("roof repair") || userInput.includes("repair") || userInput.includes("fix") || userInput.includes("leak")) {
      replyText = "We tackle shingle repair, wind damage, and leak stop services fast to protect your beautiful interiors! We can dispatch an expert within 24 hours. Would you like to get a free repair estimate now?";
    } else if (userInput.includes("roof replacement") || userInput.includes("replace") || userInput.includes("install")) {
      replyText = "Upgrading your roof increases curb value and resists tropical storms! We specialize in high-wind rated premium shingles and modern architectural metal roofs with extensive warranties. Would you like a free upfront replacement quote?";
    } else if (userInput.includes("storm damage") || userInput.includes("storm") || userInput.includes("hail") || userInput.includes("wind")) {
      replyText = "Storm wind and hail can trigger invisible structural weaknesses. Our crew performs high-definition multi-point storm inspections. If you have active storm damage, let's start a free inspection right now!";
    } else if (userInput.includes("speak") || userInput.includes("team") || userInput.includes("call") || userInput.includes("phone")) {
      replyText = "You can speak directly with our team at (645) 666-1250! Or leave your name and contact details here, and we'll call you right back!";
    } 
    // 3. Fallback to roofing knowledge base
    else {
      const matched = ROOFING_KNOWLEDGE.find((entry) =>
        entry.keywords.some((keyword) => userInput.includes(keyword))
      );
      if (matched) {
        replyText = matched.answer;
      } else {
        replyText = "That's a great question! I'm continuing to learn all aspects of premium roofing. If you'd like a quick estimate or to talk to our licensed crew, type 'Get Free Estimate' or dial (645) 666-1250!";
      }
    }

    const botMsg: Message = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: replyText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, botMsg]);
    setHasNewMessage(!isOpen);
  };

  const handleQuickAction = (text: string) => {
    handleSendMessage(text, true);
  };

  return (
    <>
      {/* --- FLOATING CHAT TRIGGER BUTTON --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50 flex items-center"
          >
            {/* Animated prompt bubble shown next to the widget if unopened */}
            <AnimatePresence>
              {hasNewMessage && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ delay: 1 }}
                  className="mr-3.5 bg-neutral-900/90 backdrop-blur-md text-white py-2 px-4 rounded-2xl shadow-xl text-xs border border-white/10 flex items-center space-x-2 pointer-events-none select-none"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="font-sans font-medium">Have roofing questions? Let's chat!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button
              onClick={() => {
                setIsOpen(true);
                setHasNewMessage(false);
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_8px_30px_rgba(220,38,38,0.25)] border transition-all duration-300 bg-red-600 text-white border-red-500/30 hover:bg-red-50 hover:shadow-[0_12px_35px_rgba(220,38,38,0.35)]"
              id="floating-ai-chatbot-trigger"
              aria-label="Open Expert AI Chatbot"
            >
              <div className="relative">
                <MessageSquare className="w-6 h-6" />
                {/* Unread alert indicator */}
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-amber-400 border-2 border-red-600 rounded-full animate-pulse" />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PREMIUM GLASSMORPHISM CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 lg:right-8 w-[calc(100vw-32px)] sm:w-[380px] h-[480px] sm:h-[550px] max-h-[calc(100vh-32px)] sm:max-h-[calc(100vh-64px)] bg-slate-900/95 backdrop-blur-xl rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 z-[9999] flex flex-col overflow-visible text-white"
            id="premium-roofing-ai-chat-window"
          >
            {/* Soft decorative visual background ambient circles */}
            <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            {/* Chat Header */}
            <div className="relative z-10 px-5 py-4 border-b border-white/5 bg-white/[0.03] backdrop-blur-md flex items-center justify-between rounded-t-[28px]">
              <div className="flex items-center space-x-3">
                {/* Custom AI Avatar Badging with Green Online Dot */}
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center shadow-md">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
                </div>
                
                <div>
                  <div className="flex items-center space-x-1">
                    <h4 className="font-display font-black text-sm tracking-tight">Core Promise AI</h4>
                    <Sparkle className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
                  </div>
                  <p className="font-mono text-[10px] text-slate-400">Roofing Expert • Active Online</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Minimize chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Chat Messages Container */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 relative z-10 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start space-x-2`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5 mt-0.5">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  )}

                  <div className="max-w-[80%] flex flex-col">
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed font-sans
                        ${msg.sender === "user"
                          ? "bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium rounded-tr-none shadow-md shadow-red-950/20"
                          : "bg-white/10 border border-white/5 text-slate-100 rounded-tl-none"
                        }
                      `}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 self-end font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing/Analysis Indicator */}
              {isTyping && (
                <div className="flex justify-start items-start space-x-2">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5 mt-0.5 animate-pulse">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center space-x-1.5 max-w-[80%]">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Smart Suggestions Panel (Scrollable Pills) */}
            <div className="px-4 py-3 bg-white/[0.01] border-t border-white/5 relative z-10">
              <div className="flex items-center space-x-1.5 mb-2">
                <HelpCircle className="w-3 h-3 text-amber-400" />
                <span className="font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider">Quick Actions</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleQuickAction("Get Free Estimate")}
                  className="bg-red-500/20 hover:bg-red-500/35 border border-red-500/35 text-red-200 text-[10px] font-sans font-bold py-1.5 px-3 rounded-full transition-all cursor-pointer flex items-center space-x-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>Get Free Estimate</span>
                </button>
                <button
                  onClick={() => handleQuickAction("Roof Repair")}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-[10px] font-sans font-medium py-1.5 px-3 rounded-full transition-all cursor-pointer"
                >
                  <span>Roof Repair</span>
                </button>
                <button
                  onClick={() => handleQuickAction("Roof Replacement")}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-[10px] font-sans font-medium py-1.5 px-3 rounded-full transition-all cursor-pointer"
                >
                  <span>Roof Replacement</span>
                </button>
                <button
                  onClick={() => handleQuickAction("Storm Damage")}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-[10px] font-sans font-medium py-1.5 px-3 rounded-full transition-all cursor-pointer"
                >
                  <span>Storm Damage</span>
                </button>
                <button
                  onClick={() => handleQuickAction("Speak to Our Team")}
                  className="bg-amber-500/20 hover:bg-amber-500/35 border border-amber-500/30 text-amber-200 text-[10px] font-sans font-bold py-1.5 px-3 rounded-full transition-all cursor-pointer flex items-center space-x-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Speak to Team</span>
                </button>
              </div>
            </div>

            {/* Chat Input form area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="px-4 py-3 border-t border-white/5 bg-slate-950/40 relative z-10 flex items-center space-x-2.5 rounded-b-[28px]"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  leadStep !== "none" && leadStep !== "done"
                    ? "Type your response here..."
                    : "Ask about pricing, repairs, warranties..."
                }
                className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 font-sans text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md shadow-red-950/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
