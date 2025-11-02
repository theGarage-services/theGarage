import React, { Suspense, lazy } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

// Optimized loading component
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

// Group lazy imports by functionality
const JobSeekerComponents = {
  Homepage: lazy(() => import('./Homepage').then(module => ({ default: module.Homepage }))),
  JobTracker: lazy(() => import('./JobTracker').then(module => ({ default: module.JobTracker }))),
  Profile: lazy(() => import('./Profile').then(module => ({ default: module.Profile }))),
  JobDetailsPage: lazy(() => import('./JobDetailsPage').then(module => ({ default: module.JobDetailsPage }))),
  QueueDetailPage: lazy(() => import('./QueueDetailPage').then(module => ({ default: module.QueueDetailPage }))),
  QueueSelector: lazy(() => import('./QueueSelector').then(module => ({ default: module.QueueSelector }))),
  MyQueues: lazy(() => import('./MyQueues').then(module => ({ default: module.MyQueues }))),
};

const RecruiterComponents = {
  RecruiterHomepage: lazy(() => import('./RecruiterHomepage').then(module => ({ default: module.RecruiterHomepage }))),
  JobPostingPage: lazy(() => import('./JobPostingPage').then(module => ({ default: module.JobPostingPage }))),
  RecruiterProfile: lazy(() => import('./RecruiterProfile').then(module => ({ default: module.RecruiterProfile }))),
  RecruiterJobManagement: lazy(() => import('./RecruiterJobManagement').then(module => ({ default: module.RecruiterJobManagement }))),
  RecruiterCandidateManagement: lazy(() => import('./RecruiterCandidateManagement').then(module => ({ default: module.RecruiterCandidateManagement }))),
  RecruiterCandidateProfilePage: lazy(() => import('./RecruiterCandidateProfilePage').then(module => ({ default: module.RecruiterCandidateProfilePage }))),
  QueueSourcingPage: lazy(() => import('./QueueSourcingPage').then(module => ({ default: module.QueueSourcingPage }))),
  InterviewCalendar: lazy(() => import('./InterviewCalendar').then(module => ({ default: module.InterviewCalendar }))),
  InstitutionAdminPanel: lazy(() => import('./InstitutionAdminPanel').then(module => ({ default: module.InstitutionAdminPanel }))),
  InstitutionManagement: lazy(() => import('./InstitutionManagement').then(module => ({ default: module.InstitutionManagement }))),
  InstitutionAnalyticsDashboard: lazy(() => import('./InstitutionAnalyticsDashboard').then(module => ({ default: module.InstitutionAnalyticsDashboard }))),
  CompanyProfile: lazy(() => import('./CompanyProfile').then(module => ({ default: module.CompanyProfile }))),
};

const SharedComponents = {
  Notifications: lazy(() => import('./Notifications').then(module => ({ default: module.Notifications }))),
  Support: lazy(() => import('./Support').then(module => ({ default: module.Support }))),
  AccountSettings: lazy(() => import('./AccountSettings').then(module => ({ default: module.AccountSettings }))),
  ReportIssue: lazy(() => import('./ReportIssue').then(module => ({ default: module.ReportIssue }))),
  PlatformOverview: lazy(() => import('./PlatformOverview').then(module => ({ default: module.PlatformOverview }))),
  MetricsDashboard: lazy(() => import('./MetricsDashboard').then(module => ({ default: module.MetricsDashboard }))),
};

interface ViewRendererProps {
  currentView: string;
  userRole: 'job-seeker' | 'recruiter';
  user: any;
  selectedJob: any;
  selectedQueue: any;
  selectedCandidate: any;
  trackedJobs: any[];
  userQueues: string[];
  queueStatuses: Record<string, boolean>;
  autoApplyEnabled: boolean;
  navigationHistory: string[];
  onNavigate: (view: string) => void;
  onBack: () => void;
  onLogout: () => void;
  onJobApplication: (job: any, method: string) => void;
  onNavigateToJobDetails: (job: any) => void;
  onNavigateToQueueDetail: (queue: any) => void;
  onUpdateTrackedJobs: (jobs: any[]) => void;
  onUpdateQueues: (queues: string[]) => void;
  onUpdateQueueStatuses: (statuses: Record<string, boolean>) => void;
  onToggleAutoApply: (enabled: boolean) => void;
  setSelectedJob: (job: any) => void;
  setSelectedCandidate: (candidate: any) => void;
}

export function ViewRenderer({ 
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
  onNavigate,
  onBack,
  onLogout,
  onJobApplication,
  onNavigateToJobDetails,
  onNavigateToQueueDetail,
  onUpdateTrackedJobs,
  onUpdateQueues,
  onUpdateQueueStatuses,
  onToggleAutoApply,
  setSelectedJob,
  setSelectedCandidate
}: ViewRendererProps) {

  const renderView = () => {
    // Job Seeker view renderer
    if (userRole === 'job-seeker') {
      switch (currentView) {
        case 'homepage':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <JobSeekerComponents.Homepage 
                onNavigate={onNavigate}
                onNavigateToJobDetails={onNavigateToJobDetails}
                onNavigateToQueueDetail={onNavigateToQueueDetail}
                onJobApplication={onJobApplication}
                trackedJobs={trackedJobs}
                user={user}
                onLogout={onLogout}
                autoApplyEnabled={autoApplyEnabled}
                onToggleAutoApply={onToggleAutoApply}
              />
            </Suspense>
          );
        
        case 'job-tracker':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <JobSeekerComponents.JobTracker 
                trackedJobs={trackedJobs}
                onUpdateTrackedJobs={onUpdateTrackedJobs}
                onNavigateToJobDetails={onNavigateToJobDetails}
                onBack={onBack}
                user={user}
              />
            </Suspense>
          );
        
        case 'profile':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <JobSeekerComponents.Profile 
                onBack={onBack}
                onNavigate={onNavigate}
                user={user}
              />
            </Suspense>
          );
        
        case 'job-details':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <JobSeekerComponents.JobDetailsPage 
                job={selectedJob}
                onBack={onBack}
                onJobApplication={onJobApplication}
                onNavigateToQueueDetail={onNavigateToQueueDetail}
                user={user}
              />
            </Suspense>
          );
        
        case 'queue-detail':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <JobSeekerComponents.QueueDetailPage 
                queue={selectedQueue}
                onBack={onBack}
                onNavigate={onNavigate}
                user={user}
              />
            </Suspense>
          );
        
        case 'queue-selector':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <JobSeekerComponents.QueueSelector 
                onClose={onBack}
                currentQueues={userQueues}
                onUpdateQueues={onUpdateQueues}
                queueStatuses={queueStatuses}
                onUpdateQueueStatuses={onUpdateQueueStatuses}
              />
            </Suspense>
          );
        
        case 'my-queues':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <JobSeekerComponents.MyQueues 
                onEditQueues={() => onNavigate('queue-selector')}
                onQueueClick={onNavigateToQueueDetail}
                onBack={onBack}
                showAsPage={true}
                user={user}
              />
            </Suspense>
          );
      }
    }

    // Recruiter view renderer
    if (userRole === 'recruiter') {
      switch (currentView) {
        case 'homepage':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.RecruiterHomepage 
                user={user}
                onLogout={onLogout}
                onNavigate={onNavigate}
              />
            </Suspense>
          );
        
        case 'job-posting':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.JobPostingPage 
                onBack={onBack}
                user={user}
              />
            </Suspense>
          );
        
        case 'recruiter-profile':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.RecruiterProfile 
                onBack={onBack}
                onNavigate={onNavigate}
                user={user}
              />
            </Suspense>
          );
        
        case 'job-management':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.RecruiterJobManagement 
                onBack={onBack}
                user={user}
                onNavigate={onNavigate}
                setGlobalSelectedCandidate={setSelectedCandidate}
                onNavigateToCandidates={(job) => {
                  setSelectedJob(job);
                  onNavigate('candidate-management');
                }}
              />
            </Suspense>
          );
        
        case 'candidate-management':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.RecruiterCandidateManagement 
                onBack={onBack}
                user={user}
                onNavigate={onNavigate}
                setGlobalSelectedCandidate={setSelectedCandidate}
                onNavigateToQueueSourcing={() => onNavigate('queue-sourcing')}
              />
            </Suspense>
          );
        
        case 'institution-profile':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.InstitutionAnalyticsDashboard 
                institution={{
                  id: 'inst-1',
                  name: user?.company || 'TechCorp Solutions',
                  logo: null,
                  description: 'Leading technology company focused on innovation'
                }}
                user={user}
                onBack={onBack}
                onMemberClick={(member) => {
                  setSelectedCandidate(member);
                  onNavigate('member-dashboard');
                }}
              />
            </Suspense>
          );

        case 'institution-management':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.InstitutionManagement 
                onBack={onBack}
                user={user}
                institution={{
                  id: 'inst-1',
                  name: user?.company || 'TechCorp Solutions',
                  logo: null,
                  description: 'Leading technology company focused on innovation'
                }}
              />
            </Suspense>
          );
        
        case 'institution-admin':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.InstitutionAdminPanel 
                onBack={onBack}
                user={user}
                institution={{
                  id: 'inst-1',
                  name: user?.company || 'TechCorp Solutions',
                  logo: null,
                  description: 'Leading technology company focused on innovation'
                }}
              />
            </Suspense>
          );
        
        case 'queue-sourcing':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.QueueSourcingPage 
                onBack={onBack}
                user={user}
                onViewCandidate={(candidate) => {
                  setSelectedCandidate(candidate);
                  onNavigate('candidate-profile');
                }}
                onMessageCandidate={() => {
                  onNavigate('recruiter-chat');
                }}
              />
            </Suspense>
          );
        
        case 'interview-calendar':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.InterviewCalendar 
                onScheduleInterview={() => {}}
                onBack={onBack}
              />
            </Suspense>
          );
        
        case 'candidate-profile':
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.RecruiterCandidateProfilePage 
                candidate={selectedCandidate}
                onBack={onBack}
                onUpdateStatus={(candidateId, status) => {
                  console.log('Updating status:', candidateId, status);
                  // Here you would update the candidate status in your state management
                }}
                onScheduleInterview={(candidate, interviewData) => {
                  console.log('Scheduling interview:', candidate, interviewData);
                  // Here you would handle interview scheduling
                }}
                onSendMessage={(candidate) => {
                  console.log('Sending message to:', candidate);
                  // Here you would handle sending messages
                }}
                onSaveNotes={(candidateId, notes) => {
                  console.log('Saving notes:', candidateId, notes);
                  // Here you would save the notes to your backend
                }}
                availableJobs={[]}
              />
            </Suspense>
          );
      }
    }

    // Shared components for both roles
    switch (currentView) {
      case 'notifications':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <SharedComponents.Notifications onNavigate={onNavigate} />
          </Suspense>
        );
      
      case 'support':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <SharedComponents.Support onBack={onBack} />
          </Suspense>
        );
      
      case 'settings':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <SharedComponents.AccountSettings onBack={onBack} />
          </Suspense>
        );
      
      case 'report-issue':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <SharedComponents.ReportIssue onBack={onBack} />
          </Suspense>
        );
      
      case 'platform-overview':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <SharedComponents.PlatformOverview 
              onBack={onBack}
              onNavigate={onNavigate}
              user={user}
              onLogout={onLogout}
            />
          </Suspense>
        );
      
      case 'metrics-dashboard':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <SharedComponents.MetricsDashboard 
              onBack={onBack}
              onNavigate={onNavigate}
              user={user}
              onLogout={onLogout}
            />
          </Suspense>
        );
      
      default:
        // Default to homepage
        if (userRole === 'job-seeker') {
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <JobSeekerComponents.Homepage 
                onNavigate={onNavigate}
                onNavigateToJobDetails={onNavigateToJobDetails}
                onNavigateToQueueDetail={onNavigateToQueueDetail}
                onJobApplication={onJobApplication}
                trackedJobs={trackedJobs}
                user={user}
                onLogout={onLogout}
                autoApplyEnabled={autoApplyEnabled}
                onToggleAutoApply={onToggleAutoApply}
              />
            </Suspense>
          );
        } else {
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <RecruiterComponents.RecruiterHomepage 
                user={user}
                onLogout={onLogout}
                onNavigate={onNavigate}
              />
            </Suspense>
          );
        }
    }
  };

  return (
    <ErrorBoundary>
      {renderView()}
    </ErrorBoundary>
  );
}