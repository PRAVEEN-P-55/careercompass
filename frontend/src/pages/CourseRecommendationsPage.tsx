import { motion } from "framer-motion";

const recommendations = [
  { course: "B.Tech AI & DS", score: 95, desc: "High alignment with your tech interest and math scores.", eligibility: "Eligible" },
  { course: "B.Sc Computer Science", score: 91, desc: "Great alternative for deep computer science fundamentals.", eligibility: "Eligible" },
  { course: "BCA", score: 87, desc: "Good fit for software development roles.", eligibility: "Eligible" },
];

export function CourseRecommendationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Course Recommendations</h2>
        <p className="text-muted-foreground">Based on your assessment (40%), academics (40%), and eligibility (20%).</p>
      </div>

      <div className="grid gap-6">
        {recommendations.map((rec, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-primary/30">#{idx + 1}</span>
                <h3 className="text-xl font-bold">{rec.course}</h3>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                  {rec.eligibility}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">{rec.desc}</p>
            </div>
            
            <div className="w-full md:w-64 space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Match Score</span>
                <span className="text-primary">{rec.score}%</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${rec.score}%` }}
                  transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                  className="bg-primary h-full rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
