import React, { useState, useCallback, useMemo } from 'react';
import './styles/globals.css';

// Essential components for authentication flow
import { LandingPage } from './components/LandingPage';
import { RoleSelector } from './components/RoleSelector';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { ForgotPassword } from './components/ForgotPassword';
import { ViewRenderer } from './components/ViewRenderer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ResumeUploadFlow } from './components/ResumeUploadFlow';

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-orange-200 border-t-[#ff6b35] rounded-full animate-spin mx-auto mb-4"></div>
      <h1 className="text-2xl font-bold mb-2">
        <span className="text-slate-900">the</span>
        <span className="text-[#ff6b35]">Garage</span>
      </h1>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ onRetry }: { onRetry: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
    <div className="text-center p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">
        <span className="text-slate-900">the</span>
        <span className="text-[#ff6b35]">Garage</span>
      </h1>
      <p className="text-gray-600 mb-4">Something went wrong. Please try again.</p>
      <div className="flex gap-3 justify-center">
        <button 
          onClick={onRetry}
          className="px-6 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors"
        >
          Try Again
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  </div>
);

// Demo user profiles
const demoProfiles = {
  'admin@thegarage.com': {
    id: 'admin-1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'admin@thegarage.com',
    role: 'admin',
    company: 'TechCorp Solutions',
    department: 'Human Resources',
    title: 'Senior Talent Acquisition Manager',
    isInstitutionCreator: true,
    isInstitutionAdmin: true,
    institutionId: 'inst-1',
    avatar: null,
    permissions: ['all']
  },
  'member@thegarage.com': {
    id: 'member-1',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'member@thegarage.com',
    role: 'recruiter',
    company: 'TechCorp Solutions',
    department: 'Human Resources',
    title: 'Recruiter',
    isInstitutionCreator: false,
    isInstitutionAdmin: false,
    institutionId: 'inst-1',
    avatar: null,
    permissions: ['recruit', 'interview', 'post_jobs']
  },
  'premium@thegarage.com': {
    id: 'premium-1',
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'premium@thegarage.com',
    role: 'job-seeker',
    title: 'Senior Data Scientist',
    location: 'San Francisco, CA',
    isPremium: true,
    avatar: null,
    premiumFeatures: {
      queueIntelligence: true,
      profileComparison: true,
      smartRecommendations: true,
      prioritySupport: true,
      advancedAnalytics: true,
      unlimitedQueues: true,
      profileBoost: true,
      expertReviews: true
    },
    subscription: {
      plan: 'Premium',
      status: 'active',
      renewsAt: '2025-01-30',
      features: ['All Premium Features', 'Priority Support', 'Advanced Analytics']
    }
  },
  'basic@thegarage.com': {
    id: 'basic-1',
    firstName: 'Jordan',
    lastName: 'Smith',
    email: 'basic@thegarage.com',
    role: 'job-seeker',
    title: 'Software Engineer',
    location: 'Austin, TX',
    isPremium: false,
    avatar: null,
    premiumFeatures: {
      queueIntelligence: false,
      profileComparison: false,
      smartRecommendations: false,
      prioritySupport: false,
      advancedAnalytics: false,
      unlimitedQueues: false,
      profileBoost: false,
      expertReviews: false
    },
    subscription: {
      plan: 'Free',
      status: 'active',
      renewsAt: null,
      features: ['Basic Job Tracking', 'Up to 3 Queues', 'Standard Support']
    }
  }
};

function App() {
  // App State
  const [showLanding, setShowLanding] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<'job-seeker' | 'recruiter' | null>(null);
  const [authView, setAuthView] = useState<'login' | 'signup' | 'forgot-password' | 'role-select'>('role-select');
  const [authIntent, setAuthIntent] = useState<'login' | 'signup'>('signup');
  
  // Resume Upload Flow State
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [newUserData, setNewUserData] = useState<any>(null);
  
  // Application Navigation State
  const [currentView, setCurrentView] = useState<string>('homepage');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['homepage']);
  const [trackedJobs, setTrackedJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedQueue, setSelectedQueue] = useState<any>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [userQueues, setUserQueues] = useState<string[]>(['data-engineer', 'senior-analyst', 'machine-learning']);
  const [queueStatuses, setQueueStatuses] = useState<Record<string, boolean>>({});
  const [autoApplyEnabled, setAutoApplyEnabled] = useState<boolean>(true);

  const createDefaultUser = useCallback((userData: any, role: 'job-seeker' | 'recruiter') => {
    return {
      ...userData,
      id: '1',
      firstName: userData.firstName || userData.name?.split(' ')[0] || 'Test',
      lastName: userData.lastName || userData.name?.split(' ')[1] || 'User',
      email: userData.email || 'test@example.com',
      role: role,
      avatar: null,
      isPremium: false,
      ...(role === 'recruiter' && {
        company: userData.company || 'Tech Corp',
        department: userData.department || 'Engineering',
        title: userData.title || 'Recruiter',
        isInstitutionCreator: false,
        isInstitutionAdmin: false,
        institutionId: 'inst-1',
        permissions: ['recruit', 'interview']
      })
    };
  }, []);

  // Authentication handlers
  const handleLogin = useCallback((userData: any, role: 'job-seeker' | 'recruiter') => {
    let mockUser;

    if (userData.email && demoProfiles[userData.email as keyof typeof demoProfiles]) {
      const demoProfile = demoProfiles[userData.email as keyof typeof demoProfiles];
      if (demoProfile.role === role || (demoProfile.role === 'admin' && role === 'recruiter')) {
        mockUser = { ...demoProfile, role: role };
      } else {
        mockUser = createDefaultUser(userData, role);
      }
    } else {
      mockUser = createDefaultUser(userData, role);
    }
    
    setUser(mockUser);
    setUserRole(role);
    setIsAuthenticated(true);
    setError(null);
  }, [createDefaultUser]);

  const handleSignUp = useCallback((userData: any, role: 'job-seeker' | 'recruiter') => {
    // Check if this is a new job seeker who needs resume upload flow
    if (role === 'job-seeker' && userData.isNewUser && !userData.profileComplete) {
      setNewUserData({ ...userData, role });
      setShowResumeUpload(true);
      return;
    }

    let mockUser;

    if (userData.email && demoProfiles[userData.email as keyof typeof demoProfiles]) {
      const demoProfile = demoProfiles[userData.email as keyof typeof demoProfiles];
      if (demoProfile.role === role || (demoProfile.role === 'admin' && role === 'recruiter')) {
        mockUser = { ...demoProfile, role: role };
      } else {
        mockUser = createDefaultUser(userData, role);
      }
    } else {
      // For social auth users, we might have incomplete profile data
      if (userData.isNewUser && role === 'recruiter') {
        // Recruiters from social auth get basic profile setup
        mockUser = createDefaultUser({
          ...userData,
          company: userData.company || 'Company Name',
          title: userData.title || 'Recruiter',
          profileComplete: false, // They can complete it later in settings
        }, role);
      } else {
        mockUser = createDefaultUser(userData, role);
      }
    }
    
    setUser(mockUser);
    setUserRole(role);
    setIsAuthenticated(true);
    setError(null);
  }, [createDefaultUser]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    setShowLanding(true);
    setCurrentView('homepage');
    setNavigationHistory(['homepage']);
    setTrackedJobs([]);
    setSelectedJob(null);
    setSelectedQueue(null);
    setSelectedCandidate(null);
    setUserQueues(['data-engineer', 'senior-analyst', 'machine-learning']);
    setQueueStatuses({});
    setAutoApplyEnabled(true);
    setShowResumeUpload(false);
    setNewUserData(null);
    setError(null);
  }, []);

  // Resume Upload Flow handlers
  const handleResumeUploadComplete = useCallback((resumeData: any) => {
    if (!newUserData) return;
    
    const completeUserData = {
      ...newUserData,
      ...resumeData.profileData,
      resumeFile: resumeData.resumeFile,
      extractedData: resumeData.extractedData,
      profileComplete: true,
      isNewUser: false
    };

    const mockUser = createDefaultUser(completeUserData, newUserData.role);
    setUser(mockUser);
    setUserRole(newUserData.role);
    setIsAuthenticated(true);
    setShowResumeUpload(false);
    setNewUserData(null);
    setError(null);
  }, [newUserData, createDefaultUser]);

  const handleResumeUploadSkip = useCallback(() => {
    if (!newUserData) return;
    
    const mockUser = createDefaultUser({
      ...newUserData,
      profileComplete: false, // Profile is not complete if resume was skipped
      isNewUser: false
    }, newUserData.role);
    
    setUser(mockUser);
    setUserRole(newUserData.role);
    setIsAuthenticated(true);
    setShowResumeUpload(false);
    setNewUserData(null);
    setError(null);
  }, [newUserData, createDefaultUser]);

  // Navigation handlers
  const handleNavigate = useCallback((view: string) => {
    setCurrentView(view);
    setNavigationHistory(prev => {
      const newHistory = [...prev, view];
      return newHistory.slice(-10);
    });
    
    if (view !== 'job-details') setSelectedJob(null);
    if (view !== 'queue-detail') setSelectedQueue(null);
    if (view !== 'candidate-profile') setSelectedCandidate(null);
    if (error) setError(null);
  }, [error]);
  
  const handleBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousView = newHistory[newHistory.length - 1] || 'homepage';
      setNavigationHistory(newHistory);
      setCurrentView(previousView);
    } else {
      handleNavigate('homepage');
    }
  }, [navigationHistory, handleNavigate]);

  const handleJobApplication = useCallback((job: any, method: string) => {
    const isAlreadyTracked = trackedJobs.some(trackedJob => trackedJob.id === job.id);
    if (!isAlreadyTracked) {
      setTrackedJobs(prev => [...prev, {
        ...job,
        status: 'Applied',
        dateApplied: new Date().toISOString(),
        method: method
      }]);
    }
  }, [trackedJobs]);

  const handleNavigateToJobDetails = useCallback((job: any) => {
    setSelectedJob(job);
    handleNavigate('job-details');
  }, [handleNavigate]);

  const handleNavigateToQueueDetail = useCallback((queue: any) => {
    setSelectedQueue(queue);
    handleNavigate('queue-detail');
  }, [handleNavigate]);

  const handleRetry = useCallback(() => {
    setError(null);
    setCurrentView('homepage');
  }, []);

  // Memoized props for ViewRenderer
  const viewRendererProps = useMemo(() => ({
    currentView,
    userRole,
    user,
    selectedJob,
    selectedQueue,
    selectedCandidate,
    trackedJobs,
    userQueues,
    queueStatuses,
    autoApplyEnabled,
    navigationHistory,
    onNavigate: handleNavigate,
    onBack: handleBack,
    onLogout: handleLogout,
    onJobApplication: handleJobApplication,
    onNavigateToJobDetails: handleNavigateToJobDetails,
    onNavigateToQueueDetail: handleNavigateToQueueDetail,
    onUpdateTrackedJobs: setTrackedJobs,
    onUpdateQueues: setUserQueues,
    onUpdateQueueStatuses: setQueueStatuses,
    onToggleAutoApply: setAutoApplyEnabled,
    setSelectedJob,
    setSelectedCandidate
  }), [
    currentView,
    userRole,
    user,
    selectedJob,
    selectedQueue,
    selectedCandidate,
    trackedJobs,
    userQueues,
    queueStatuses,
    autoApplyEnabled,
    navigationHistory,
    handleNavigate,
    handleBack,
    handleLogout,
    handleJobApplication,
    handleNavigateToJobDetails,
    handleNavigateToQueueDetail
  ]);

  // Render current view
  if (error) {
    return <ErrorFallback onRetry={handleRetry} />;
  }

  if (showLanding) {
    return <LandingPage 
      onGetStarted={() => {
        setShowLanding(false);
        setAuthIntent('signup');
        setAuthView('role-select');
      }}
      onLogin={() => {
        setShowLanding(false);
        setAuthIntent('login');
        setAuthView('role-select');
      }}
    />;
  }

  if (!isAuthenticated) {
    if (authView === 'role-select') {
      return <RoleSelector 
        onRoleSelect={(role) => {
          setUserRole(role);
          setAuthView(authIntent);
        }}
        onBack={() => setShowLanding(true)}
      />;
    }

    if (authView === 'login' && userRole) {
      return <Login 
        userRole={userRole}
        onLogin={handleLogin}
        onSwitchToSignUp={() => setAuthView('signup')}
        onForgotPassword={() => setAuthView('forgot-password')}
        onBack={() => setAuthView('role-select')}
      />;
    }

    if (authView === 'signup' && userRole) {
      return <SignUp 
        userRole={userRole}
        onSignUp={handleSignUp}
        onSwitchToLogin={() => setAuthView('login')}
        onBack={() => setAuthView('role-select')}
      />;
    }

    if (authView === 'forgot-password') {
      return <ForgotPassword 
        onBack={() => setAuthView('login')}
      />;
    }
  }

  // Resume Upload Flow for new job seekers
  if (showResumeUpload && newUserData) {
    return <ResumeUploadFlow 
      onComplete={handleResumeUploadComplete}
      onSkip={handleResumeUploadSkip}
      userEmail={newUserData.email}
      userName={`${newUserData.firstName} ${newUserData.lastName}`}
    />;
  }

  if (isAuthenticated && userRole && user) {
    return (
      <div className="min-h-screen bg-background">
        <ErrorBoundary>
          <ViewRenderer {...viewRendererProps} />
        </ErrorBoundary>
      </div>
    );
  }

  return <LoadingSpinner />;
}

export default App;