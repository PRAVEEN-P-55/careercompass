import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ClipboardList, 
  LineChart, 
  GraduationCap, 
  Building2, 
  Map, 
  Network, 
  Award, 
  Bot, 
  User 
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Assessment", href: "/assessment", icon: ClipboardList },
  { name: "Academic Analysis", href: "/academic", icon: LineChart },
  { name: "Course Recs", href: "/courses", icon: GraduationCap },
  { name: "Colleges", href: "/colleges", icon: Building2 },
  { name: "Career Roadmap", href: "/roadmap", icon: Map },
  { name: "Mind Map", href: "/mindmap", icon: Network },
  { name: "Scholarships", href: "/scholarships", icon: Award },
  { name: "AI Counselor", href: "/chat", icon: Bot },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r shadow-sm">
      <div className="flex h-14 items-center px-6 border-b">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          EduPath AI
        </h2>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
