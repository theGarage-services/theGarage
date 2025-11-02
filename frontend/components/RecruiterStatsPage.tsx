import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft,
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
  Plus,
  BarChart3,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Mail,
  Phone,
  FileText,
  Activity,
  PieChart
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { RecruiterProfileDropdown } from './RecruiterProfileDropdown';

interface RecruiterStatsPageProps {
  recruiter: any;
  onBack: () => void;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  user: any;
}

export function RecruiterStatsPage({ recruiter, onBack, onNavigate, onLogout, user }: RecruiterStatsPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock detailed stats for the recruiter
  const detailedStats = {
    overview: [
      {
        title: 'Total Job Postings',
        value: recruiter.stats.jobPostings,
        change: '+2 this month',
        icon: Briefcase,
        trend: 'up',
        color: 'from-blue-500 to-blue-600'
      },
      {
        title: 'Total Candidates',
        value: recruiter.stats.totalCandidates,
        change: '+15 this week',
        icon: Users,
        trend: 'up',
        color: 'from-purple-500 to-purple-600'
      },
      {
        title: 'Interviews Conducted',
        value: recruiter.stats.interviews,
        change: '+5 this week',
        icon: Calendar,
        trend: 'up',
        color: 'from-green-500 to-green-600'
      },
      {
        title: 'Successful Hires',
        value: recruiter.stats.hires,
        change: '+1 this month',
        icon: UserCheck,
        trend: 'up',
        color: 'from-orange-500 to-orange-600'
      }
    ],
    performance: {
      successRate: recruiter.stats.successRate,
      avgTimeToHire: recruiter.stats.avgTimeToHire,
      responseRate: 89,
      candidateSatisfaction: 4.6
    },
    recentJobs: [
      {
        id: '1',
        title: 'Senior Software Engineer',
        department: recruiter.department,
        postedDate: '3 days ago',
        status: 'active',
        applications: 12,
        interviews: 3,
        hires: 0
      },
      {
        id: '2',
        title: 'Product Manager',
        department: recruiter.department,
        postedDate: '1 week ago', 
        status: 'active',
        applications: 8,
        interviews: 2,
        hires: 1
      },
      {
        id: '3',
        title: 'UX Designer',
        department: recruiter.department,
        postedDate: '2 weeks ago',
        status: 'filled',
        applications: 15,
        interviews: 4,
        hires: 1
      }
    ],
    monthlyTrends: [
      { month: 'Jan', jobs: 2, hires: 1, interviews: 5 },
      { month: 'Feb', jobs: 3, hires: 2, interviews: 7 },
      { month: 'Mar', jobs: 2, hires: 1, interviews: 6 },
      { month: 'Apr', jobs: 4, hires: 2, interviews: 9 },
      { month: 'May', jobs: 3, hires: 1, interviews: 8 },
      { month: 'Jun', jobs: 2, hires: 2, interviews: 4 }
    ]
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
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">Admin</Badge>
              </div>

              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={onBack}
                  className="text-[#ff6b35] font-medium flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Team
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <RecruiterProfileDropdown 
                onNavigate={onNavigate}
                onLogout={onLogout}
                user={user}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recruiter Profile Header */}
        <div className="mb-8">
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-orange-100/50 shadow-2xl shadow-orange-500/10">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-[#ff6b35] text-white text-2xl">
                  {recruiter.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-medium text-gray-900 mb-2">
                      {recruiter.firstName} {recruiter.lastName}
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">
                      Recruiter - <span className="text-[#ff6b35] font-medium">{recruiter.department}</span>
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {recruiter.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {new Date(recruiter.joinDate).toLocaleDateString()}
                      </span>
                      <Badge 
                        variant={recruiter.status === 'active' ? 'default' : 'secondary'}
                        className={recruiter.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {recruiter.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm" className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Access
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-6 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl p-4">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900">{recruiter.stats.successRate}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900">{recruiter.stats.avgTimeToHire}</div>
                    <div className="text-sm text-gray-600">Avg Days to Hire</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900">4.6</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900">89%</div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Period Selector */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-medium text-gray-900">Performance Analytics</h2>
          <div className="flex gap-2">
            {(['7d', '30d', '90d', '1y'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className={selectedPeriod === period ? 'bg-[#ff6b35] hover:bg-[#e55a2b]' : ''}
              >
                {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : period === '90d' ? '90 Days' : '1 Year'}
              </Button>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {detailedStats.overview.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-semibold mb-1 text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
                <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full inline-block">
                  {stat.change}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Performance Metrics & Recent Jobs */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Metrics */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Performance Metrics</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Success Rate</span>
                  <span className="text-sm text-gray-900">{detailedStats.performance.successRate}%</span>
                </div>
                <Progress value={detailedStats.performance.successRate} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Response Rate</span>
                  <span className="text-sm text-gray-900">{detailedStats.performance.responseRate}%</span>
                </div>
                <Progress value={detailedStats.performance.responseRate} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Time to Hire</span>
                  <span className="text-sm text-gray-900">{detailedStats.performance.avgTimeToHire} days avg</span>
                </div>
                <div className="text-xs text-gray-500">Industry average: 25 days</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Candidate Satisfaction</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-900">{detailedStats.performance.candidateSatisfaction}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Based on post-interview feedback</div>
              </div>
            </div>
          </Card>

          {/* Recent Job Postings */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Recent Job Postings</h3>
              <Button size="sm" variant="outline" className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {detailedStats.recentJobs.map((job) => (
                <div key={job.id} className="p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">Posted {job.postedDate}</p>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={job.status === 'active' ? 'bg-green-100 text-green-700' : 
                                job.status === 'filled' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}
                    >
                      {job.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 bg-white rounded">
                      <div className="font-medium text-gray-900">{job.applications}</div>
                      <div className="text-xs text-gray-500">Applications</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div className="font-medium text-gray-900">{job.interviews}</div>
                      <div className="text-xs text-gray-500">Interviews</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div className="font-medium text-gray-900">{job.hires}</div>
                      <div className="text-xs text-gray-500">Hires</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Compact Monthly Trends */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Monthly Performance Trends</h3>
          
          <div className="h-32 flex items-end justify-between gap-2">
            {detailedStats.monthlyTrends.map((month, index) => (
              <div key={month.month} className="flex-1 flex flex-col items-center">
                <div className="w-full flex gap-1 mb-2">
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t flex-1"
                    style={{ height: `${(month.jobs / 4) * 40}px` }}
                    title={`${month.jobs} jobs`}
                  ></div>
                  <div 
                    className="bg-gradient-to-t from-green-500 to-green-400 rounded-t flex-1"
                    style={{ height: `${(month.hires / 4) * 35}px` }}
                    title={`${month.hires} hires`}
                  ></div>
                  <div 
                    className="bg-gradient-to-t from-orange-500 to-orange-400 rounded-t flex-1"
                    style={{ height: `${(month.interviews / 10) * 50}px` }}
                    title={`${month.interviews} interviews`}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 font-medium">{month.month}</div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600">Jobs</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600">Hires</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-gray-600">Interviews</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}