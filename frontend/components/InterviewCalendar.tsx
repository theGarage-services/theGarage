import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Calendar,
  Clock,
  Video,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  MoreHorizontal,
  Phone,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface InterviewCalendarProps {
  onScheduleInterview?: () => void;
  onBack?: () => void;
}

export function InterviewCalendar({ onScheduleInterview, onBack }: InterviewCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock interview data
  const interviews = [
    {
      id: '1',
      candidateName: 'Sarah Chen',
      candidateAvatar: 'SC',
      position: 'Senior Software Engineer',
      type: 'video',
      date: new Date(2024, 0, 22, 10, 0), // Jan 22, 2024, 10:00 AM
      duration: 60,
      status: 'confirmed',
      interviewers: ['John Smith', 'Jane Doe'],
      stage: 'Technical Interview',
      notes: 'Focus on React/TypeScript expertise',
      meetingPlatform: 'zoom',
      meetingLink: 'https://zoom.us/j/123456789'
    },
    {
      id: '2',
      candidateName: 'Marcus Rodriguez',
      candidateAvatar: 'MR',
      position: 'Product Manager',
      type: 'phone',
      date: new Date(2024, 0, 22, 14, 30), // Jan 22, 2024, 2:30 PM
      duration: 45,
      status: 'pending',
      interviewers: ['Sarah Johnson'],
      stage: 'Initial Screening',
      notes: 'Product strategy discussion'
    },
    {
      id: '3',
      candidateName: 'Emily Watson',
      candidateAvatar: 'EW',
      position: 'UX Designer',
      type: 'in-person',
      date: new Date(2024, 0, 23, 11, 0), // Jan 23, 2024, 11:00 AM
      duration: 90,
      status: 'confirmed',
      interviewers: ['Mike Chen', 'Lisa Park'],
      stage: 'Portfolio Review',
      notes: 'Portfolio presentation + design challenge',
      location: 'TechCorp Office, Conference Room A, 123 Main St, Toronto ON'
    },
    {
      id: '4',
      candidateName: 'David Kim',
      candidateAvatar: 'DK',
      position: 'Backend Developer',
      type: 'video',
      date: new Date(2024, 0, 24, 9, 30), // Jan 24, 2024, 9:30 AM
      duration: 60,
      status: 'confirmed',
      interviewers: ['Alex Thompson'],
      stage: 'System Design',
      notes: 'Distributed systems architecture',
      meetingPlatform: 'teams',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/19%3abc123'
    },
    {
      id: '5',
      candidateName: 'Jennifer Liu',
      candidateAvatar: 'JL',
      position: 'Data Scientist',
      type: 'video',
      date: new Date(2024, 0, 24, 15, 0), // Jan 24, 2024, 3:00 PM
      duration: 75,
      status: 'rescheduled',
      interviewers: ['Robert Davis'],
      stage: 'Technical Assessment',
      notes: 'ML algorithms and statistical analysis',
      meetingPlatform: 'meet',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rescheduled': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getInterviewsForDate = (date: Date) => {
    return interviews.filter(interview => 
      interview.date.toDateString() === date.toDateString()
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100 p-6">
      <Card className="p-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <div>
              <h3 className="text-lg text-gray-900 mb-1">Interview Calendar</h3>
              <p className="text-sm text-gray-600">
                {interviews.length} interviews scheduled this week
              </p>
            </div>
          </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('week')}
              className="h-8 px-3"
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'day' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('day')}
              className="h-8 px-3"
            >
              Day
            </Button>
          </div>
          
          <Button
            onClick={onScheduleInterview}
            className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={previousWeek}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextWeek}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <h4 className="text-lg font-medium text-gray-900">
            {currentDate.toLocaleDateString('en-US', { 
              month: 'long',
              year: 'numeric'
            })}
          </h4>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Today
          </Button>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'week' ? (
        <div className="grid grid-cols-7 gap-4">
          {getWeekDays().map((day, index) => {
            const dayInterviews = getInterviewsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div key={index} className="min-h-[300px]">
                <div className={`p-3 rounded-lg mb-3 text-center ${
                  isToday 
                    ? 'bg-[#ff6b35] text-white' 
                    : 'bg-gray-50 text-gray-900'
                }`}>
                  <div className="text-sm font-medium">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-lg font-medium">
                    {day.getDate()}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {dayInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-[#ff6b35] text-white text-xs">
                            {interview.candidateAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-medium text-gray-900 truncate">
                            {interview.candidateName}
                          </div>
                          <div className="text-xs text-gray-600 truncate">
                            {interview.position}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {getTypeIcon(interview.type)}
                          <span className="text-xs text-gray-600">
                            {formatTime(interview.date)}
                          </span>
                        </div>
                        <Badge className={`${getStatusColor(interview.status)} text-xs`}>
                          {interview.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Day View
        <div className="space-y-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </h4>
          </div>
          
          {getInterviewsForDate(selectedDate).map((interview) => (
            <Card key={interview.id} className="p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-[#ff6b35] text-white">
                      {interview.candidateAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">{interview.candidateName}</div>
                    <div className="text-sm text-gray-600">{interview.position}</div>
                    <div className="text-xs text-gray-500">{interview.stage}</div>
                  </div>
                </div>
                <Badge className={getStatusColor(interview.status)}>
                  {interview.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{formatTime(interview.date)} ({interview.duration}m)</span>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeIcon(interview.type)}
                  <span className="capitalize">{interview.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{interview.interviewers.join(', ')}</span>
                </div>
                {(interview.location || interview.meetingLink || interview.meetingPlatform) && (
                  <div className="flex items-center gap-2">
                    {interview.type === 'in-person' ? (
                      <>
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="truncate" title={interview.location}>
                          {interview.location}
                        </span>
                      </>
                    ) : interview.type === 'video' && (
                      <>
                        <Video className="w-4 h-4 text-gray-400" />
                        <span className="capitalize">{interview.meetingPlatform || 'Video call'}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Meeting Details */}
              {interview.type === 'video' && interview.meetingLink && (
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <p className="text-xs text-blue-600 mb-1">Meeting Link</p>
                  <p className="text-sm text-blue-800 font-mono break-all">{interview.meetingLink}</p>
                </div>
              )}
              
              {interview.type === 'in-person' && interview.location && (
                <div className="bg-green-50 p-3 rounded-lg mb-3">
                  <p className="text-xs text-green-600 mb-1">Location</p>
                  <p className="text-sm text-green-800">{interview.location}</p>
                </div>
              )}
              
              {interview.notes && (
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <p className="text-xs text-blue-600 mb-1">Notes</p>
                  <p className="text-sm text-blue-800">{interview.notes}</p>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <AlertCircle className="w-3 h-3" />
                  <span>Reminder sent 1 hour before</span>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline">
                    Reschedule
                  </Button>
                  <Button size="sm" variant="outline">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {getInterviewsForDate(selectedDate).length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No interviews scheduled for this day</p>
              <Button 
                className="mt-3 bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
                onClick={onScheduleInterview}
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-medium text-green-700">
              {interviews.filter(i => i.status === 'confirmed').length}
            </div>
            <div className="text-xs text-green-600">Confirmed</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-lg font-medium text-yellow-700">
              {interviews.filter(i => i.status === 'pending').length}
            </div>
            <div className="text-xs text-yellow-600">Pending</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-lg font-medium text-orange-700">
              {interviews.filter(i => i.status === 'rescheduled').length}
            </div>
            <div className="text-xs text-orange-600">Rescheduled</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-medium text-blue-700">
              {interviews.filter(i => i.type === 'video').length}
            </div>
            <div className="text-xs text-blue-600">Video Calls</div>
          </div>
        </div>
      </div>
      </Card>
    </div>
  );
}