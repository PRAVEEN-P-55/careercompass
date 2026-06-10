import { Card } from "@/components/ui/card";
import { GraduationCap, Building2, ClipboardList, Award } from "lucide-react";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Student!</h2>
        <p className="text-muted-foreground">Here is an overview of your career guidance progress.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><ClipboardList className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Assessment</p>
              <h3 className="text-2xl font-bold">Completed</h3>
            </div>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><GraduationCap className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rec. Courses</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><Building2 className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rec. Colleges</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Award className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Scholarships</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card border rounded-xl p-6 shadow-sm min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Interest Analysis Chart (See Assessment Page)</p>
        </div>
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div>
                <p className="text-sm font-medium">Completed Interest Assessment</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <div>
                <p className="text-sm font-medium">Updated Academic Profile</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
