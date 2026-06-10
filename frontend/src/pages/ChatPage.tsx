import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User, Send } from "lucide-react";
import { api } from "@/utils/api";

export function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! I am the EduPath AI Career Counselor. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await api.post("/chat", { message: userMessage });
      setMessages(prev => [...prev, { role: "assistant", content: res.data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I am having trouble connecting to the backend right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-card border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-muted/30 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg leading-none">AI Career Counselor</h2>
          <span className="text-xs text-muted-foreground">Powered by Gemini</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Bot className="w-5 h-5" />
              </div>
            )}
            <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
              m.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted text-foreground rounded-tl-none'
            }`}>
              {m.content}
            </div>
            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
             <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-3 rounded-2xl bg-muted text-muted-foreground rounded-tl-none flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-muted/30">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 hide-scrollbar">
          <Button variant="outline" size="sm" onClick={() => setInput("What jobs can I get after B.Sc Physics?")}>
            Jobs after B.Sc Physics
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput("Show scholarships for SC students.")}>
            SC Scholarships
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput("Which course is best for PCM students?")}>
            Best courses for PCM
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your career question..."
            className="flex-1 rounded-full"
          />
          <Button size="icon" className="rounded-full" onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
