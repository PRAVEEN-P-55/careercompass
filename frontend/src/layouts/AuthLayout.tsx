import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-card p-8 shadow-xl border">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            EduPath AI
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your Personalized Career & Education Advisor
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
