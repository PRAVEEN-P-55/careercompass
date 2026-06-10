import { Award, CalendarDays, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const scholarships = [
  { name: "State Merit Scholarship", amount: "₹50,000 / year", eligibility: "Min 90% Score, Income < 500000", deadline: "2026-08-30" },
  { name: "Tech Talent Scholarship", amount: "₹1,00,000 / year", eligibility: "Min 95% Score, All Income", deadline: "2026-11-30" },
  { name: "EWS Higher Education Fund", amount: "₹40,000 / year", eligibility: "Min 80% Score, Income < 250000", deadline: "2026-10-01" },
];

export function ScholarshipsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Government Scholarships</h2>
        <p className="text-muted-foreground">Financial aid programs you are currently eligible for.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((s, idx) => (
          <div key={idx} className="bg-card border rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 leading-tight">{s.name}</h3>
              
              <div className="space-y-2 text-sm mt-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  <span className="font-semibold text-foreground">{s.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Deadline: {s.deadline}</span>
                </div>
                <div className="pt-2 border-t mt-4 text-xs">
                  <span className="font-medium text-foreground">Eligibility:</span> {s.eligibility}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button className="flex-1">Apply Now</Button>
              <Button variant="outline" className="flex-1">Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
