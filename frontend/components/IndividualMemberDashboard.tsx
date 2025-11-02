import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  ArrowLeft,
  User,
  Briefcase,
  Calendar,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Star,
  MessageCircle,
  Phone,
  Video,
  Mail,
  Award,
  Activity,
  BarChart3,
  PieChart,
  Users,
  Building2,
  MapPin,
  Globe,
  Linkedin,
  Send,
  Eye,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Download,
  Filter,
  RefreshCw,
  Crown,
  Shield,
  Zap,
  Heart,
  Coffee,
  Handshake
} from 'lucide-react';

interface IndividualMemberDashboardProps {
  member: any;
  onBack: () => void;
}

export function IndividualMemberDashboard({ member, onBack }: IndividualMemberDashboardProps) {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock comprehensive member data - in real app this would come from API
  const memberData = {
    profile: {
      id: member?.id || '1',
      name: member?.name || 'Sarah Johnson',
      title: member?.title || 'Senior Recruiter',
      department: member?.department || 'Engineering',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      joinedDate: '2024-01-15',
      employeeId: 'EMP-2024-001',
      manager: 'John Smith',
      avatar: member?.avatar || 'SJ',
      status: 'active',
      role: 'recruiter'
    },
    performance: {
      totalHires: 24,
      totalInterviews: 67,
      totalApplications: 234,
      successRate: 85,
      averageTimeToHire: 16,
      responseTime: '2.3h',
      candidateSatisfaction: 4.7,
      hiringManagerSatisfaction: 4.8,
      monthlyHires: [3, 4, 2, 5, 3, 7],
      monthlyInterviews: [8, 12, 9, 15, 11, 12]
    },
    currentMetrics: {
      activeJobPostings: 5,
      candidatesInPipeline: 23,
      interviewsScheduled: 8,
      pendingOffers: 3,
      thisMonthHires: 4,
      thisMonthInterviews: 12,
      responseRate: 67,
      profileViews: 145
    },
    skills: [
      { name: 'Technical Recruiting', level: 95 },
      { name: 'Interview Coordination', level: 90 },
      { name: 'Candidate Sourcing', level: 88 },
      { name: 'Relationship Building', level: 92 },
      { name: 'Data Analysis', level: 75 },
      { name: 'Negotiation', level: 85 }
    ],
    recentHires: [
      {
        id: '1',
        candidateName: 'Alex Chen',
        position: 'Senior Frontend Developer',
        hireDate: '2024-01-20',
        timeToHire: 14,
        salary: '$145,000',
        satisfaction: 5
      },
      {
        id: '2',
        candidateName: 'Maria Rodriguez',
        position: 'Backend Engineer',
        hireDate: '2024-01-18',
        timeToHire: 12,
        salary: '$140,000',
        satisfaction: 4
      },
      {
        id: '3',
        candidateName: 'David Kim',
        position: 'Full Stack Developer',
        hireDate: '2024-01-15',
        timeToHire: 18,
        salary: '$135,000',
        satisfaction: 5
      }
    ],
    upcomingInterviews: [
      {
        id: '1',
        candidateName: 'Jennifer Wang',
        position: 'Senior React Developer',
        datetime: '2024-01-26T14:00:00',
        type: 'technical',
        duration: 60,
        status: 'confirmed'
      },
      {
        id: '2',
        candidateName: 'Robert Taylor',
        position: 'DevOps Engineer',
        datetime: '2024-01-26T16:30:00',
        type: 'behavioral',
        duration: 45,
        status: 'pending'
      },
      {
        id: '3',
        candidateName: 'Lisa Zhang',
        position: 'Product Manager',
        datetime: '2024-01-27T10:00:00',
        type: 'final',
        duration: 90,
        status: 'confirmed'
      }
    ],
    jobPostings: [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        status: 'active',
        applications: 45,
        views: 234,
        postedDate: '2024-01-20',
        interviews: 12,
        hires: 1
      },
      {
        id: '2',
        title: 'Backend Engineer',
        department: 'Engineering',
        status: 'active',
        applications: 32,
        views: 187,
        postedDate: '2024-01-18',
        interviews: 8,
        hires: 1
      },
      {
        id: '3',
        title: 'DevOps Engineer',
        department: 'Engineering',
        status: 'draft',
        applications: 0,
        views: 0,
        postedDate: '2024-01-25',
        interviews: 0,
        hires: 0
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {memberData.profile.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-medium text-gray-900">{memberData.profile.name}</h1>
                  <p className="text-sm text-gray-500">{memberData.profile.title} • {memberData.profile.department}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Performance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Hires</p>
                <p className="text-3xl font-medium text-gray-900">{memberData.performance.totalHires}</p>
                <p className="text-sm text-green-600">+{memberData.currentMetrics.thisMonthHires} this month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-3xl font-medium text-gray-900">{memberData.performance.successRate}%</p>
                <p className="text-sm text-blue-600">Above average</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Time to Hire</p>
                <p className="text-3xl font-medium text-gray-900">{memberData.performance.averageTimeToHire}</p>
                <p className="text-sm text-gray-500">days</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satisfaction</p>
                <p className="text-3xl font-medium text-gray-900">{memberData.performance.candidateSatisfaction}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(memberData.performance.candidateSatisfaction) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Current Pipeline */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Current Pipeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Active Job Postings</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">{memberData.currentMetrics.activeJobPostings}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-gray-900">Candidates in Pipeline</span>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">{memberData.currentMetrics.candidatesInPipeline}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">Interviews Scheduled</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{memberData.currentMetrics.interviewsScheduled}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Handshake className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900">Pending Offers</span>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">{memberData.currentMetrics.pendingOffers}</Badge>
                  </div>
                </div>
              </Card>

              {/* Recent Hires */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Successful Hires</h3>
                <div className="space-y-3">
                  {memberData.recentHires.map((hire) => (
                    <div key={hire.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{hire.candidateName}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < hire.satisfaction ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{hire.position}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>Hired {formatDate(hire.hireDate)}</span>
                        <span>{hire.timeToHire} days to hire</span>
                        <span>{hire.salary}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Upcoming Interviews */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Interviews</h3>
              <div className="grid gap-4">
                {memberData.upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Video className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{interview.candidateName}</h4>
                        <p className="text-sm text-gray-600">{interview.position}</p>
                        <p className="text-xs text-gray-500">{formatDateTime(interview.datetime)} • {interview.duration} min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(interview.status)}>
                        {interview.status}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {interview.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Skills Assessment */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Skills Assessment</h3>
                <div className="space-y-4">
                  {memberData.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Performance Trends */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Trends</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Monthly Hires Trend</span>
                      <div className="flex items-center gap-1">
                        <ArrowUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">+15%</span>
                      </div>
                    </div>
                    <div className="h-16 bg-gray-50 rounded-lg flex items-end justify-between px-2 py-2">
                      {memberData.performance.monthlyHires.map((hires, index) => (
                        <div 
                          key={index}
                          className="bg-green-500 rounded-sm w-8"
                          style={{ height: `${(hires / Math.max(...memberData.performance.monthlyHires)) * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Monthly Interviews Trend</span>
                      <div className="flex items-center gap-1">
                        <ArrowUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-600">+8%</span>
                      </div>
                    </div>
                    <div className="h-16 bg-gray-50 rounded-lg flex items-end justify-between px-2 py-2">
                      {memberData.performance.monthlyInterviews.map((interviews, index) => (
                        <div 
                          key={index}
                          className="bg-blue-500 rounded-sm w-8"
                          style={{ height: `${(interviews / Math.max(...memberData.performance.monthlyInterviews)) * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Key Performance Indicators */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-2xl font-medium text-gray-900">{memberData.performance.totalHires}</p>
                  <p className="text-sm text-gray-600">Total Successful Hires</p>
                  <p className="text-xs text-green-600 mt-1">Industry leader</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-2xl font-medium text-gray-900">{memberData.performance.averageTimeToHire}</p>
                  <p className="text-sm text-gray-600">Avg. Days to Hire</p>
                  <p className="text-xs text-blue-600 mt-1">25% faster than average</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-2xl font-medium text-gray-900">{memberData.performance.candidateSatisfaction}</p>
                  <p className="text-sm text-gray-600">Candidate Satisfaction</p>
                  <p className="text-xs text-purple-600 mt-1">Exceptional rating</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Job Postings Management</h3>
              <div className="space-y-4">
                {memberData.jobPostings.map((job) => (
                  <div key={job.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.department}</p>
                        <p className="text-xs text-gray-500">Posted {formatDate(job.postedDate)}</p>
                      </div>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-blue-600">{job.applications}</p>
                        <p className="text-gray-600">Applications</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-green-600">{job.interviews}</p>
                        <p className="text-gray-600">Interviews</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-purple-600">{job.hires}</p>
                        <p className="text-gray-600">Hires</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-orange-600">{job.views}</p>
                        <p className="text-gray-600">Views</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Interview Schedule & History</h3>
              <Tabs defaultValue="upcoming" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming" className="space-y-4">
                  {memberData.upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{interview.candidateName}</h4>
                          <p className="text-sm text-gray-600">{interview.position}</p>
                          <p className="text-xs text-gray-500">{formatDateTime(interview.datetime)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(interview.status)}>
                            {interview.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Join
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="completed">
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Completed interviews will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <p className="text-3xl font-medium text-blue-600">{memberData.performance.totalInterviews}</p>
                      <p className="text-sm text-gray-600">Total Interviews Conducted</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <p className="text-3xl font-medium text-green-600">{memberData.performance.successRate}%</p>
                      <p className="text-sm text-gray-600">Interview to Hire Rate</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Profile Information */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{memberData.profile.name}</p>
                      <p className="text-sm text-gray-600">Full Name</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{memberData.profile.email}</p>
                      <p className="text-sm text-gray-600">Email Address</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{memberData.profile.phone}</p>
                      <p className="text-sm text-gray-600">Phone Number</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{memberData.profile.location}</p>
                      <p className="text-sm text-gray-600">Location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{memberData.profile.department}</p>
                      <p className="text-sm text-gray-600">Department</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{formatDate(memberData.profile.joinedDate)}</p>
                      <p className="text-sm text-gray-600">Join Date</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Role & Permissions */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Role & Permissions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Recruiter</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Permissions</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Create and manage job postings
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Access candidate database
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Schedule interviews
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Send messages to candidates
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-600" />
                        Manage team members
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}