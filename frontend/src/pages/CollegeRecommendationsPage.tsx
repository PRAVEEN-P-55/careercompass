import { Building2, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const colleges = [
  { name: "Government Engineering College", district: "Coimbatore", state: "Tamil Nadu", courses: "B.Tech, B.E.", cutoff: 90, facilities: "Hostel, Labs, WiFi" },
  { name: "National Institute of Science", district: "Madurai", state: "Tamil Nadu", courses: "B.Sc Physics, B.Sc CS", cutoff: 85, facilities: "Labs, Library" },
];

export function CollegeRecommendationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recommended Colleges</h2>
          <p className="text-muted-foreground">Nearby government colleges matching your profile.</p>
        </div>
        <div className="flex items-center gap-2 max-w-sm w-full">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8" placeholder="Search districts or colleges..." />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {colleges.map((college, idx) => (
          <div key={idx} className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{college.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {college.district}, {college.state}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Cutoff</div>
                <div className="font-bold text-primary">{college.cutoff}%</div>
              </div>
            </div>
            
            <div className="space-y-2 mt-4 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Courses</span>
                <span className="font-medium">{college.courses}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-muted-foreground">Facilities</span>
                <span className="font-medium">{college.facilities}</span>
              </div>
            </div>

            <Button className="w-full mt-6" variant="secondary">View Details</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
