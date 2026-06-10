import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AssessmentPage } from '@/pages/AssessmentPage';
import { AcademicAnalysisPage } from '@/pages/AcademicAnalysisPage';
import { CourseRecommendationsPage } from '@/pages/CourseRecommendationsPage';
import { CollegeRecommendationsPage } from '@/pages/CollegeRecommendationsPage';
import { ScholarshipsPage } from '@/pages/ScholarshipsPage';
import { CareerRoadmapPage } from '@/pages/CareerRoadmapPage';
import { CareerMindMapPage } from '@/pages/CareerMindMapPage';
import { ChatPage } from '@/pages/ChatPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/academic" element={<AcademicAnalysisPage />} />
        <Route path="/courses" element={<CourseRecommendationsPage />} />
        <Route path="/colleges" element={<CollegeRecommendationsPage />} />
        <Route path="/roadmap" element={<CareerRoadmapPage />} />
        <Route path="/mindmap" element={<CareerMindMapPage />} />
        <Route path="/scholarships" element={<ScholarshipsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<div>Profile Setup Page (Coming Soon)</div>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
