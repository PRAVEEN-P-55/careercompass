import { Menu, Bell, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-accent">
          <UserIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
}
