import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { InterviewCalendar } from './InterviewCalendar';
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Target,
  Bell,
  Settings,
  LogOut,
  User,
  Star,
  MapPin,
  Clock,
  Eye,
  MessageCircle,
  MoreHorizontal,
  Building2,
  DollarSign,
  UserCheck,
  UserX,
  ArrowUpRight,
  ChevronRight,
  Zap,
  Award,
  Brain,
  Rocket,
  CheckCircle,
  BarChart3
} from 'lucide-react';
import { Avatar, Avatar as AvatarComponent, AvatarFallback } from './ui/avatar';
import { RecruiterProfileDropdown } from './RecruiterProfileDropdown';
import { Progress } from './ui/progress';

interface RecruiterHomepageProps {
  onNavigate: (view: string) => void;
  onLogout: () => void;
  user: any;
}

export function RecruiterHomepage({ onNavigate, onLogout, user }: RecruiterHomepageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock notification count - in a real app, this would come from props or API
  const unreadNotifications = 3;
  const unreadMessages = 5;

  // Determine if user is admin (for admins we show different navigation and content)
  const isUserAdmin = user?.role === 'admin' || user?.isInstitutionCreator;

  // Personal stats for the current recruiter (whether admin or regular recruiter)
  const stats = [
    {
      title: 'My Job Postings',
      value: isUserAdmin ? '15' : '8',
      change: isUserAdmin ? '+4 this month' : '+2 this month',
      icon: Briefcase,
      trend: 'up'
    },
    {
      title: 'My Candidates',
      value: isUserAdmin ? '234' : '156',
      change: isUserAdmin ? '+32 this week' : '+15 this week',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'My Interviews',
      value: isUserAdmin ? '18' : '12',
      change: isUserAdmin ? '+6 this week' : '+3 this week',
      icon: Calendar,
      trend: 'up'
    },
    {
      title: 'My Hires',
      value: isUserAdmin ? '6' : '4',
      change: isUserAdmin ? '+2 this month' : '+1 this month',
      icon: UserCheck,
      trend: 'up'
    }
  ];

  const recentApplications = [
    {
      id: '1',
      name: 'Sarah Chen',
      position: 'Senior Software Engineer',
      rating: 4.8,
      experience: '5+ years',
      location: 'Toronto, CA',
      appliedDate: '2 hours ago',
      status: 'new',
      avatar: 'SC',
      skills: ['React', 'TypeScript', 'Node.js'],
      match: 95
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      position: 'Product Manager',
      rating: 4.6,
      experience: '7+ years',
      location: 'Vancouver, CA',
      appliedDate: '4 hours ago',
      status: 'reviewed',
      avatar: 'MR',
      skills: ['Product Strategy', 'Analytics', 'Leadership'],
      match: 88
    },
    {
      id: '3',
      name: 'Emma Thompson',
      position: 'UX Designer',
      rating: 4.9,
      experience: '4+ years',
      location: 'Montreal, CA',
      appliedDate: '1 day ago',
      status: 'interview',
      avatar: 'ET',
      skills: ['Figma', 'User Research', 'Prototyping'],
      match: 92
    }
  ];

  // Mock data for recent job postings by this recruiter (personalized by role)
  const recentJobPostings = isUserAdmin ? [
    {
      id: '1',
      title: 'Chief Technology Officer',
      department: 'Executive',
      location: 'Toronto, ON',
      postedDate: '1 day ago',
      status: 'active',
      views: 1247,
      applications: 8,
      interviews: 2,
      hires: 0
    },
    {
      id: '2', 
      title: 'VP of Engineering',
      department: 'Engineering',
      location: 'Remote',
      postedDate: '1 week ago',
      status: 'active',
      views: 892,
      applications: 12,
      interviews: 4,
      hires: 1
    },
    {
      id: '3',
      title: 'Senior Director, Product',
      department: 'Product',
      location: 'Vancouver, BC',
      postedDate: '4 days ago', 
      status: 'active',
      views: 654,
      applications: 15,
      interviews: 3,
      hires: 0
    }
  ] : [
    {
      id: '1',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Toronto, ON',
      postedDate: '2 days ago',
      status: 'active',
      views: 847,
      applications: 23,
      interviews: 5,
      hires: 1
    },
    {
      id: '2', 
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      postedDate: '1 week ago',
      status: 'active',
      views: 632,
      applications: 18,
      interviews: 3,
      hires: 0
    },
    {
      id: '3',
      title: 'UX Designer',
      department: 'Design',
      location: 'Vancouver, BC',
      postedDate: '3 days ago', 
      status: 'active',
      views: 421,
      applications: 12,
      interviews: 2,
      hires: 0
    }
  ];

  const activeJobs = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Toronto, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      applicants: 156,
      posted: '3 days ago',
      status: 'active',
      views: 2847
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      location: 'Vancouver, CA',
      type: 'Full-time',
      salary: '$110k - $140k',
      applicants: 89,
      posted: '1 week ago',
      status: 'active',
      views: 1923
    },
    {
      id: '3',
      title: 'UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90k - $120k',
      applicants: 234,
      posted: '2 weeks ago',
      status: 'active',
      views: 3156
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl">
                  <span className="text-gray-900">the</span>
                  <span className="text-[#ff6b35]">Garage</span>
                </span>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">Recruiter</Badge>
              </div>

              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => onNavigate('candidate-management')}
                  className="text-gray-600 hover:text-[#ff6b35] transition-colors flex items-center gap-1"
                >
                  <Users className="w-4 h-4" />
                  Candidates
                </button>
                <button
                  onClick={() => onNavigate('job-management')}
                  className="text-gray-600 hover:text-[#ff6b35] transition-colors flex items-center gap-1"
                >
                  <Briefcase className="w-4 h-4" />
                  Jobs
                </button>
                {isUserAdmin ? (
                  <button
                    onClick={() => onNavigate('institution-profile')}
                    className="text-gray-600 hover:text-[#ff6b35] transition-colors flex items-center gap-1"
                  >
                    <Users className="w-4 h-4" />
                    My Team
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('institution-profile')}
                    className="text-gray-600 hover:text-[#ff6b35] transition-colors flex items-center gap-1"
                  >
                    <Building2 className="w-4 h-4" />
                    Company
                  </button>
                )}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => onNavigate('job-posting')}
                variant="outline"
                className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Button>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onNavigate('recruiter-chat')}
                  className="p-2 text-gray-600 hover:text-[#ff6b35] transition-colors relative"
                  title="Messages"
                >
                  <MessageCircle className="w-5 h-5" />
                  {unreadMessages > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center p-0 min-w-[20px]">
                      {unreadMessages > 9 ? '9+' : unreadMessages}
                    </Badge>
                  )}
                </button>

                <button 
                  onClick={() => onNavigate('notifications')}
                  className="p-2 text-gray-600 hover:text-[#ff6b35] transition-colors relative"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center p-0 min-w-[20px]">
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </Badge>
                  )}
                </button>
              </div>

              <RecruiterProfileDropdown 
                onNavigate={onNavigate}
                onLogout={onLogout}
                user={user}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2 text-gray-900">
            Welcome back, TechCorp Solutions! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your hiring pipeline today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const gradients = [
              'from-[#ff6b35] to-[#ff8c42]',
              'from-blue-500 to-blue-600',
              'from-purple-500 to-purple-600',
              'from-green-500 to-green-600'
            ];
            return (
              <Card key={index} className="p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border-0 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${gradients[index]} rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-semibold mb-1 text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
                <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full inline-block">{stat.change}</div>
              </Card>
            );
          })}
        </div>

        {/* Main Dashboard Content */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="group p-6 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  onClick={() => onNavigate('candidate-management')}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-7 h-7" />
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Manage Candidates</h3>
                <p className="text-sm opacity-90 leading-relaxed">Review applications and manage your talent pipeline with AI-powered insights</p>
              </div>
            </Card>

            <Card className="group p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  onClick={() => onNavigate('job-management')}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Job Postings</h3>
                <p className="text-sm opacity-90 leading-relaxed">Create, edit and manage your job listings with smart recommendations</p>
              </div>
            </Card>

{isUserAdmin ? (
              <Card className="group p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    onClick={() => onNavigate('institution-profile')}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-7 h-7" />
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">My Team</h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    View performance analytics, track company-wide metrics, and monitor team progress
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="group p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    onClick={() => onNavigate('institution-management')}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="w-7 h-7" />
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Company</h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    View your company profile and access settings
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Recent Activity & Calendar */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Job Postings */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">Recent Job Postings</h3>
                  <p className="text-sm text-gray-600">Your most recent job postings and their analytics</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#ff6b35] rounded-full animate-pulse"></div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Live Stats
                  </Badge>
                </div>
              </div>
              
              {recentJobPostings.length > 0 ? (
                <div className="space-y-4">
                  {recentJobPostings.map((job) => (
                    <div key={job.id} className="p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-orange-100">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-600">{job.department} • {job.location}</div>
                          <div className="text-xs text-gray-500 mt-1">Posted {job.postedDate}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-medium text-[#ff6b35]">{job.views}</div>
                          <div className="text-xs text-gray-500">views</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="font-medium text-gray-900">{job.applications}</div>
                          <div className="text-xs text-gray-500">Applications</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="font-medium text-gray-900">{job.interviews}</div>
                          <div className="text-xs text-gray-500">Interviews</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="font-medium text-gray-900">{job.hires}</div>
                          <div className="text-xs text-gray-500">Hires</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {job.status === 'active' ? 'Active' : 'Draft'}
                        </Badge>
                        <Button size="sm" className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">No Job Postings Yet</h4>
                  <p className="text-sm text-gray-600 mb-4">Create your first job posting to start attracting candidates</p>
                  <Button 
                    onClick={() => onNavigate('job-posting')}
                    className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Job Posting
                  </Button>
                </div>
              )}
              
              {recentJobPostings.length > 0 && (
                <div className="mt-6 text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('job-management')}
                    className="w-full border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    View All Job Postings
                  </Button>
                </div>
              )}
            </Card>

            {/* Interview Calendar */}
            <InterviewCalendar onScheduleInterview={() => {
              // In a real app, this would open a scheduling modal
              console.log('Schedule interview clicked');
            }} />
          </div>


        </div>
      </div>
    </div>
  );
}