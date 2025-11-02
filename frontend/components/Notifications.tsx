import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Bell, UserCheck, TrendingUp, Calendar, Briefcase, Star, CheckCircle, Clock, X, Eye, ThumbsUp, MessageSquare, Users, BarChart3, Target, Award, ChevronDown, Filter, Search, AlertCircle, ArrowRight } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';
import { ImageWithFallback } from './figma/ImageWithFallback';
import imgGoogleFavicon2025Svg1 from "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MXx8fHwxNzU5MDgyMTc3fDA&ixlib=rb-4.1.0&q=80&w=400";

interface NotificationItem {
  id: string;
  type: 'recruiter-request' | 'status-change' | 'ranking-improvement' | 'application-update' | 'queue-activity';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  metadata?: {
    recruiterName?: string;
    recruiterTitle?: string;
    companyName?: string;
    companyLogo?: string;
    jobTitle?: string;
    queueName?: string;
    oldRank?: number;
    newRank?: number;
    oldStatus?: string;
    newStatus?: string;
  };
}

interface NotificationsProps {
  onNavigate: (view: 'homepage' | 'tracker' | 'profile' | 'notifications' | 'settings' | 'support' | 'report-issue') => void;
}

// Mock notification data
const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'recruiter-request',
    title: 'Interest from Google Recruiter',
    message: 'Jane Doe from Google is interested in considering you for their Software Engineer position.',
    timestamp: '2 hours ago',
    isRead: false,
    priority: 'high',
    metadata: {
      recruiterName: 'Jane Doe',
      recruiterTitle: 'Senior Technical Recruiter',
      companyName: 'Google',
      companyLogo: imgGoogleFavicon2025Svg1,
      jobTitle: 'Software Engineer'
    }
  },
  {
    id: '2',
    type: 'ranking-improvement',
    title: 'Queue Ranking Improved',
    message: 'Your ranking in the Frontend Development queue improved from #15 to #8.',
    timestamp: '1 day ago',
    isRead: false,
    priority: 'medium',
    metadata: {
      queueName: 'Frontend Development',
      oldRank: 15,
      newRank: 8
    }
  },
  {
    id: '3',
    type: 'application-update',
    title: 'Application Status Update',
    message: 'Your application for Frontend Developer at Meta has been moved to Interview stage.',
    timestamp: '2 days ago',
    isRead: true,
    priority: 'high',
    metadata: {
      companyName: 'Meta',
      jobTitle: 'Frontend Developer',
      oldStatus: 'Under Review',
      newStatus: 'Interview'
    }
  },
  {
    id: '4',
    type: 'queue-activity',
    title: 'New Match in AI/ML Queue',
    message: 'A new high-match opportunity has been added to your AI/ML Engineering queue.',
    timestamp: '3 days ago',
    isRead: true,
    priority: 'medium',
    metadata: {
      queueName: 'AI/ML Engineering'
    }
  },
  {
    id: '5',
    type: 'recruiter-request',
    title: 'Recruiter Outreach',
    message: 'Michael Rodriguez from Meta wants to connect regarding multiple open positions.',
    timestamp: '1 week ago',
    isRead: true,
    priority: 'medium',
    metadata: {
      recruiterName: 'Michael Rodriguez',
      recruiterTitle: 'Engineering Talent Partner',
      companyName: 'Meta',
      companyLogo: 'https://images.unsplash.com/photo-1667586091163-e759ac830a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhJTIwZmFjZWJvb2slMjBsb2dvfGVufDF8fHx8MTc1OTA4MjE2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  }
];

const generalNotifications = mockNotifications.filter(n => 
  ['status-change', 'ranking-improvement', 'application-update', 'queue-activity'].includes(n.type)
);

const recruiterNotifications = mockNotifications.filter(n => 
  n.type === 'recruiter-request'
);

export function Notifications({ onNavigate }: NotificationsProps) {
  const [selectedTab, setSelectedTab] = useState('recruiter-requests');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;
  const unreadRecruiterCount = recruiterNotifications.filter(n => !n.isRead).length;
  const unreadGeneralCount = generalNotifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'recruiter-request':
        return <UserCheck className="w-5 h-5 text-blue-600" />;
      case 'ranking-improvement':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'application-update':
        return <Briefcase className="w-5 h-5 text-orange-600" />;
      case 'queue-activity':
        return <Target className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-orange-500 bg-orange-50';
      case 'low':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-300 bg-gray-50';
    }
  };

  const handleMarkAsRead = (id: string) => {
    // In a real app, this would update the notification status
    console.log('Mark as read:', id);
  };

  const handleMarkAllAsRead = () => {
    // In a real app, this would mark all notifications as read
    console.log('Mark all as read');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-lg shadow-gray-900/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - make it clickable */}
            <button 
              onClick={() => onNavigate('homepage')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <span className="text-xl font-medium">
                <span className="text-gray-900">the</span>
                <span className="text-[#ff6b35]">Garage</span>
              </span>
            </button>

            {/* Center Navigation */}
            <div className="flex items-center gap-8 mx-12">
              <button 
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span>My Profile</span>
              </button>
              
              <button 
                onClick={() => onNavigate('notifications')}
                className="flex items-center gap-2 text-[#ff6b35] font-medium relative"
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </button>
              
              <button 
                onClick={() => onNavigate('tracker')}
                className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors"
              >
                <Briefcase className="w-5 h-5" />
                <span>Job Tracker</span>
              </button>
            </div>

            {/* Right Side - Action Button */}
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleMarkAllAsRead}
                variant="outline" 
                className="border-[#ff6b35] text-[#ff6b35] hover:bg-orange-50"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              
              <ProfileDropdown 
                onNavigate={onNavigate}
                isPremium={false}
                userName="Alex Johnson"
                userEmail="alex.johnson@example.com"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-xl flex items-center justify-center shadow-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Stay updated with your job search activity</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Recruiter Requests</h3>
                  <p className="text-2xl font-bold text-blue-600">{recruiterNotifications.length}</p>
                  <p className="text-sm text-blue-700">{unreadRecruiterCount} unread</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">General Updates</h3>
                  <p className="text-2xl font-bold text-green-600">{generalNotifications.length}</p>
                  <p className="text-sm text-green-700">{unreadGeneralCount} unread</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ff6b35] rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">High Priority</h3>
                  <p className="text-2xl font-bold text-[#ff6b35]">
                    {mockNotifications.filter(n => n.priority === 'high').length}
                  </p>
                  <p className="text-sm text-orange-700">Require attention</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Notifications Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-fit grid-cols-2 bg-white shadow-sm">
              <TabsTrigger 
                value="recruiter-requests" 
                className="flex items-center gap-2 data-[state=active]:bg-[#ff6b35] data-[state=active]:text-white"
              >
                <UserCheck className="w-4 h-4" />
                <span>Recruiter Requests</span>
                {unreadRecruiterCount > 0 && (
                  <Badge className="bg-blue-500 text-white text-xs px-1.5 py-0.5 min-w-[16px] h-[16px] rounded-full">
                    {unreadRecruiterCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="general" 
                className="flex items-center gap-2 data-[state=active]:bg-[#ff6b35] data-[state=active]:text-white"
              >
                <Bell className="w-4 h-4" />
                <span>General</span>
                {unreadGeneralCount > 0 && (
                  <Badge className="bg-blue-500 text-white text-xs px-1.5 py-0.5 min-w-[16px] h-[16px] rounded-full">
                    {unreadGeneralCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Filter Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              {showFilterDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-2">
                    <button
                      onClick={() => { setSelectedFilter('all'); setShowFilterDropdown(false); }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedFilter === 'all' ? 'bg-orange-50 text-[#ff6b35]' : 'hover:bg-gray-50'
                      }`}
                    >
                      All Notifications
                    </button>
                    <button
                      onClick={() => { setSelectedFilter('unread'); setShowFilterDropdown(false); }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedFilter === 'unread' ? 'bg-orange-50 text-[#ff6b35]' : 'hover:bg-gray-50'
                      }`}
                    >
                      Unread Only
                    </button>
                    <button
                      onClick={() => { setSelectedFilter('high'); setShowFilterDropdown(false); }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedFilter === 'high' ? 'bg-orange-50 text-[#ff6b35]' : 'hover:bg-gray-50'
                      }`}
                    >
                      High Priority
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recruiter Requests Tab */}
          <TabsContent value="recruiter-requests" className="space-y-4">
            {recruiterNotifications.map((notification) => (
              <Card 
                key={notification.id}
                className={`p-6 border-l-4 transition-all duration-200 hover:shadow-lg ${
                  notification.isRead ? 'bg-white' : getPriorityColor(notification.priority)
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl flex items-center justify-center border border-blue-200">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{notification.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{notification.message}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                        )}
                        <span className="text-xs text-gray-500 whitespace-nowrap">{notification.timestamp}</span>
                      </div>
                    </div>
                    
                    {notification.metadata && (
                      <div className="flex items-center gap-4 mt-4 p-4 bg-gray-50 rounded-xl">
                        {notification.metadata.companyLogo && (
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white">
                            <ImageWithFallback
                              src={notification.metadata.companyLogo}
                              alt={`${notification.metadata.companyName} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {notification.metadata.recruiterName} • {notification.metadata.recruiterTitle}
                          </p>
                          <p className="text-sm text-gray-600">{notification.metadata.companyName}</p>
                          {notification.metadata.jobTitle && (
                            <p className="text-sm text-[#ff6b35] font-medium">{notification.metadata.jobTitle}</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mt-4">
                      <Button 
                        size="sm" 
                        className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-green-500 text-green-600 hover:bg-green-50"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Accept Interest
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Read
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* General Notifications Tab */}
          <TabsContent value="general" className="space-y-4">
            {generalNotifications.map((notification) => (
              <Card 
                key={notification.id}
                className={`p-6 border-l-4 transition-all duration-200 hover:shadow-lg ${
                  notification.isRead ? 'bg-white' : getPriorityColor(notification.priority)
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{notification.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{notification.message}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                        )}
                        <span className="text-xs text-gray-500 whitespace-nowrap">{notification.timestamp}</span>
                      </div>
                    </div>
                    
                    {notification.metadata && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                        {notification.type === 'ranking-improvement' && (
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-gray-600">Queue:</span>
                              <span className="font-medium text-gray-900">{notification.metadata.queueName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-red-600">#{notification.metadata.oldRank}</span>
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                              <span className="text-green-600 font-medium">#{notification.metadata.newRank}</span>
                            </div>
                          </div>
                        )}
                        
                        {notification.type === 'application-update' && (
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-gray-600">Position:</span>
                              <span className="font-medium text-gray-900">
                                {notification.metadata.jobTitle} at {notification.metadata.companyName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-gray-600">{notification.metadata.oldStatus}</span>
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                              <span className="text-[#ff6b35] font-medium">{notification.metadata.newStatus}</span>
                            </div>
                          </div>
                        )}
                        
                        {notification.type === 'queue-activity' && (
                          <div className="flex items-center gap-2 text-sm">
                            <Target className="w-4 h-4 text-purple-600" />
                            <span className="text-gray-600">Queue:</span>
                            <span className="font-medium text-gray-900">{notification.metadata.queueName}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mt-4">
                      <Button 
                        size="sm" 
                        className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Read
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {((selectedTab === 'recruiter-requests' && recruiterNotifications.length === 0) ||
          (selectedTab === 'general' && generalNotifications.length === 0)) && (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-600 mb-6">
              {selectedTab === 'recruiter-requests' 
                ? "You'll receive notifications here when recruiters show interest in your profile."
                : "You'll receive updates about your job applications and queue activity here."
              }
            </p>
            <Button 
              onClick={() => onNavigate('homepage')}
              className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
            >
              Browse Jobs
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}