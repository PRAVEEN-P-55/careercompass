import { CheckCircle2, Circle } from "lucide-react";

const steps = [
  { id: 1, title: "12th Science (PCM)", desc: "Completed with 92%", status: "completed" },
  { id: 2, title: "B.Sc Computer Science", desc: "Enroll in a 3-year undergraduate program.", status: "current" },
  { id: 3, title: "Summer Internships", desc: "Apply for tech internships during 2nd year.", status: "pending" },
  { id: 4, title: "Build Portfolio", desc: "Complete 3 major web development projects.", status: "pending" },
  { id: 5, title: "Campus Placement", desc: "Prepare for coding interviews and aptitude tests.", status: "pending" },
  { id: 6, title: "Software Engineer", desc: "Start your career as a full-stack developer.", status: "pending" },
];

export function CareerRoadmapPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Your Career Roadmap</h2>
        <p className="text-muted-foreground">A step-by-step guide to becoming a Software Engineer via B.Sc CS.</p>
      </div>

      <div className="relative border-l-2 border-muted ml-4 md:ml-8 space-y-8 py-4">
        {steps.map((step) => (
          <div key={step.id} className="relative pl-8 md:pl-12">
            <div className={`absolute -left-[11px] top-1 bg-background rounded-full ${
              step.status === 'completed' ? 'text-primary' : 
              step.status === 'current' ? 'text-secondary animate-pulse' : 'text-muted-foreground'
            }`}>
              {step.status === 'completed' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5 fill-background" />
              )}
            </div>
            
            <div className={`bg-card border rounded-xl p-6 shadow-sm transition-all ${
              step.status === 'current' ? 'ring-2 ring-primary border-transparent' : ''
            }`}>
              <h3 className="font-bold text-lg">{step.title}</h3>
              <p className="text-muted-foreground mt-1">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
