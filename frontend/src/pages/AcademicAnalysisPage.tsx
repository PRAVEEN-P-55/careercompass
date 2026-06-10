import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AcademicAnalysisPage() {
  const [marks, setMarks] = useState({
    physics: "", chemistry: "", mathematics: "", biology: "", computer_science: "", english: ""
  });

  const handleChange = (e: any) => {
    setMarks({ ...marks, [e.target.id]: e.target.value });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Academic Analysis</h2>
        <p className="text-muted-foreground">Enter your 12th standard marks to help us find the best eligible courses.</p>
      </div>

      <div className="bg-card p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Class 12 Marks (out of 100)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="physics">Physics</Label>
            <Input id="physics" type="number" min="0" max="100" value={marks.physics} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chemistry">Chemistry</Label>
            <Input id="chemistry" type="number" min="0" max="100" value={marks.chemistry} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mathematics">Mathematics</Label>
            <Input id="mathematics" type="number" min="0" max="100" value={marks.mathematics} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biology">Biology</Label>
            <Input id="biology" type="number" min="0" max="100" value={marks.biology} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="computer_science">Computer Science</Label>
            <Input id="computer_science" type="number" min="0" max="100" value={marks.computer_science} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="english">English</Label>
            <Input id="english" type="number" min="0" max="100" value={marks.english} onChange={handleChange} />
          </div>
        </div>

        <div className="mt-8">
          <Button size="lg">Generate Recommendations</Button>
        </div>
      </div>
    </div>
  );
}
