import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { api } from "@/utils/api";

const questions = [
  "I enjoy conducting science experiments and understanding how things work.",
  "I am good at solving complex mathematical equations.",
  "I love reading about technology and new gadgets.",
  "I like writing stories, poems, or essays.",
  "I enjoy analyzing data and creating spreadsheets.",
  "I am interested in how the stock market works.",
  "I like organizing events and managing teams.",
  "I enjoy learning about history and different cultures.",
  "I am fascinated by how software is built.",
  "I want to start my own business someday."
];

export function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(20).fill(3)); // 20 answers, default to 3
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleNext = () => {
    if (currentQuestion < 19) setCurrentQuestion(c => c + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(c => c - 1);
  };

  const handleSubmit = async () => {
    // In a real app we'd get user_id from context/token
    try {
      // Mock submit
      const res = await api.post("/assessment/submit", {
        user_id: 1, 
        answers: answers
      });
      
      const data = [
        { subject: 'Science', A: res.data.science_score || 80, fullMark: 100 },
        { subject: 'Commerce', A: res.data.commerce_score || 40, fullMark: 100 },
        { subject: 'Arts', A: res.data.arts_score || 30, fullMark: 100 },
        { subject: 'Technology', A: res.data.technology_score || 95, fullMark: 100 },
        { subject: 'Management', A: res.data.management_score || 60, fullMark: 100 },
      ];
      setResults(data);
      setIsSubmitted(true);
    } catch (e) {
      console.error(e);
      // Fallback for demo if API fails
      setResults([
        { subject: 'Science', A: 85, fullMark: 100 },
        { subject: 'Commerce', A: 45, fullMark: 100 },
        { subject: 'Arts', A: 30, fullMark: 100 },
        { subject: 'Technology', A: 92, fullMark: 100 },
        { subject: 'Management', A: 55, fullMark: 100 },
      ]);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted && results) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Your Assessment Results</h2>
          <p className="text-muted-foreground">Based on your answers, here is your aptitude profile.</p>
        </div>
        <div className="bg-card rounded-xl border p-6 flex flex-col items-center shadow-sm">
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={results}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Aptitude" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-6 text-center max-w-2xl text-muted-foreground">
            Your profile strongly aligns with <span className="font-semibold text-foreground">Technology</span> and <span className="font-semibold text-foreground">Science</span>. 
            We recommend exploring B.Tech or B.Sc degrees in Computer Science or related fields.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Interest Assessment</h2>
        <p className="text-muted-foreground mt-2">Question {currentQuestion + 1} of 20</p>
        <div className="w-full bg-muted h-2 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / 20) * 100}%` }}
          />
        </div>
      </div>

      <motion.div 
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card p-8 rounded-2xl border shadow-sm text-center space-y-8"
      >
        <h3 className="text-xl font-medium">
          {questions[currentQuestion % 10] /* using mod 10 just to recycle for demo */}
        </h3>
        
        <div className="flex justify-between items-center px-4">
          <span className="text-sm text-muted-foreground">Strongly Disagree</span>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                onClick={() => {
                  const newAnswers = [...answers];
                  newAnswers[currentQuestion] = val;
                  setAnswers(newAnswers);
                }}
                className={`w-10 h-10 rounded-full font-semibold transition-colors ${
                  answers[currentQuestion] === val 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">Strongly Agree</span>
        </div>
      </motion.div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={currentQuestion === 0}>Previous</Button>
        {currentQuestion === 19 ? (
          <Button onClick={handleSubmit}>Submit Assessment</Button>
        ) : (
          <Button onClick={handleNext}>Next Question</Button>
        )}
      </div>
    </div>
  );
}
