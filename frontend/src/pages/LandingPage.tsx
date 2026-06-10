import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, Map, Award, Briefcase } from "lucide-react";

const features = [
  { icon: GraduationCap, title: "Course Matching", description: "Find the best courses based on your academic strengths and personal interests." },
  { icon: Map, title: "Career Roadmap", description: "Visualize your entire educational and career journey from start to finish." },
  { icon: Award, title: "Scholarships", description: "Discover eligible government scholarships to fund your education." },
  { icon: Briefcase, title: "AI Counselor", description: "Get personalized, real-time advice from our AI career expert." }
];

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between px-6 md:px-12 border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">EduPath AI</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
        </nav>
        <div className="flex gap-4">
          <Button variant="ghost" asChild><Link to="/login">Log in</Link></Button>
          <Button asChild><Link to="/register">Get Started</Link></Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-32 text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Your Personalized Career & <br className="hidden md:block"/>
            <span className="text-primary">Education Advisor</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Discover the right course, college, scholarship, and career path based on your unique interests and academic strengths. Join thousands of students making informed decisions.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" asChild className="text-md"><Link to="/register">Start Your Journey</Link></Button>
            <Button size="lg" variant="outline" asChild className="text-md"><Link to="/colleges">Explore Colleges</Link></Button>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-muted/50 py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">Why Choose EduPath AI?</h2>
              <p className="mt-4 text-muted-foreground">Comprehensive tools designed to guide you at every step.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card p-6 rounded-2xl shadow-sm border text-center hover:shadow-md transition-shadow"
                >
                  <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
