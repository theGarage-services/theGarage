import { useState } from 'react';
import { ArrowLeft, Share2, Paperclip, Smile, MessageCircle, Save, MapPin, Building, Clock, Users, Star, ExternalLink, Briefcase, Crown, Zap, Lock, Calendar, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import svgPaths from "../imports/svg-4dy3qsaen2";
import imgEllipse3227 from "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MXx8fHwxNzU5MDgyMTc3fDA&ixlib=rb-4.1.0&q=80&w=400";
import img654553Fedbede7976B97Eaf5Professional5ReminiEnhanced from "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MXx8fHwxNzU5MDgyMTc3fDA&ixlib=rb-4.1.0&q=80&w=400";
import imgEllipse3226 from "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MXx8fHwxNzU5MDgyMTc3fDA&ixlib=rb-4.1.0&q=80&w=400";
import imgEllipse3229 from "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MXx8fHwxNzU5MDgyMTc3fDA&ixlib=rb-4.1.0&q=80&w=400";

interface JobDetailsPageProps {
  onBack: () => void;
  user?: any;
  job?: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    rank?: string;
    postedTime?: string;
    logo?: string;
    description: string;
    requirements?: string[];
    benefits?: string[];
    skills?: string[];
    companySize?: string;
    companyIndustry?: string;
    workModel?: string;
    experienceLevel?: string;
    companyRating?: number;
    totalEmployees?: string;
    recruiter?: {
      id: string;
      name: string;
      title: string;
      company: string;
      avatar: string;
      yearsExperience: number;
      contactInfo?: {
        email: string;
        phone: string;
      };
    };
    applicationMethod?: 'manual' | 'quick-apply' | 'recruiter-consideration';
    isApplied?: boolean;
    isSaved?: boolean;
    hasApplied?: boolean;
    applied?: boolean;
  };
}

export function JobDetailsPage({ onBack, user, job }: JobDetailsPageProps) {
  const isPremium = user?.isPremium || false;
  const [selectedTab, setSelectedTab] = useState<'description' | 'company'>('description');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [showPremiumMessage, setShowPremiumMessage] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'recruiter',
      name: 'Jane Doe',
      avatar: null,
      content: 'Thank you for your application! I\'d love to schedule a quick call to discuss this role. Are you available this week?',
      timestamp: '2 hours ago',
      type: 'message'
    },
    {
      id: 2,
      sender: 'user',
      name: 'You',
      content: 'Looking forward to hearing from you!',
      timestamp: '1 day ago',
      type: 'message'
    }
  ]);

  // Mock job data if none provided
  const jobData = job || {
    id: '1',
    title: 'Data Engineer',
    company: 'Technology & Innovation - RBC',
    location: 'Toronto, ON',
    salary: '$100k - $150k',
    type: 'FT/Permanent',
    description: `Founded in 2010, Company ABC is a pioneering technology firm at the forefront of artificial intelligence and machine learning. Based in San Francisco with a global presence, our mission is to revolutionise business operations across various sectors through innovative solutions. We pride ourselves on a vibrant workplace culture that promotes diversity, creativity, and professional growth. Join us in shaping the future of technology.

About the data engineer role
Data engineers at [your company] develop, construct, test, and maintain architectures such as databases and large-scale processing systems. They also clean, manage, and optimise data from multiple sources.

Responsibilities
• Design and implement scalable and robust data pipelines to support analytics and data processing needs.
• Develop and maintain database architectures, including data lakes and data warehouses.
• Ensure data quality and consistency through data cleaning, transformation, and validation processes.
• Collaborate with data scientists and analysts to gather requirements and deliver data solutions that support business objectives.
• Optimise data retrieval and develop dashboards and reports for various user needs.
• Implement data security and privacy policies to comply with legal and regulatory requirements.

Qualifications and experience
• Bachelor's degree in computer science, engineering, or a related field.
• Proven experience with SQL and database management systems.
• Proficiency in programming languages such as Python, Java, or Scala.
• Experience with big data technologies such as Hadoop, Spark, or Kafka.
• Strong analytical and problem-solving skills.
• Familiarity with data modelling and ETL processes.

Skills
• Database management
• Programming and scripting
• Data architecture and modelling
• Data integration and ETL processes
• Analytical and problem-solving skills`,
    requirements: ['Bachelor\'s degree in computer science', 'SQL experience', 'Python/Java/Scala', 'Big data technologies'],
    skills: ['Data Analysis', 'Python', 'SQL', 'ETL'],
    applied: true
  };

  const contacts = [
    { name: 'Alex meian', role: 'Talent Recruiter' },
    { name: 'Alex meian', role: 'Hiring Manager' }
  ];

  const [scheduledInterviews, setScheduledInterviews] = useState([
    {
      id: 1,
      title: 'Initial Screen',
      format: 'Microsoft Teams',
      details: 'Join Meeting',
      meetingUrl: 'https://teams.microsoft.com/l/meetup-join/19%3a...',
      date: 'Fri 21, Feb 2025',
      time: '11am - 11:30am',
      status: 'confirmed',
      type: 'interview',
      scheduledBy: 'Jane Doe'
    },
    {
      id: 2,
      title: 'Technical Discussion',
      format: 'Zoom',
      details: 'Join Meeting',
      meetingUrl: 'https://zoom.us/j/123456789',
      date: 'Mon 24, Feb 2025',
      time: '2pm - 3pm',
      status: 'pending',
      type: 'chat',
      scheduledBy: 'Alex Johnson'
    }
  ]);



  const handleJoinCall = (meetingUrl: string) => {
    window.open(meetingUrl, '_blank');
  };

  const handleSaveNotes = () => {
    // Mock save functionality
    console.log('Saving notes:', notes);
  };

  const handleSendMessage = () => {
    // Allow chat if user is premium OR if job was auto-applied (recruiter reached out first)
    const canChat = isPremium || jobData.applicationMethod === 'recruiter-consideration';
    
    if (!canChat) {
      alert('Upgrade to Premium to send messages to recruiters!');
      return;
    }
    
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        name: user ? `${user.firstName} ${user.lastName}` : 'You',
        avatar: user?.avatar || null,
        content: message,
        timestamp: 'Just now',
        type: 'message'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Mock recruiter response after a delay
      setTimeout(() => {
        const recruiterResponse = {
          id: messages.length + 2,
          sender: 'recruiter',
          name: 'Jane Doe',
          avatar: null,
          content: 'Thanks for reaching out! I\'ll review your message and get back to you shortly.',
          timestamp: 'Just now',
          type: 'message'
        };
        setMessages(prev => [...prev, recruiterResponse]);
      }, 2000);
    }
  };

  // Check if user has applied to this job - use hasApplied property from Homepage jobs
  const hasAccess = job?.hasApplied || job?.isApplied || job?.applied;
  
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-[#e2ddd9] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-medium mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">You need to apply for this position to view the full job details.</p>
          <Button onClick={onBack} className="bg-[#ff6b35] hover:bg-[#e55a2b]">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Modern Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side with back button and logo */}
            <div className="flex items-center gap-6">
              <Button
                onClick={onBack}
                variant="ghost" 
                size="sm"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              
              <div className="flex items-center">
                <span className="text-2xl font-semibold text-gray-900">the</span>
                <span className="text-2xl font-semibold text-[#ff6b35]">Garage</span>
              </div>
            </div>

            {/* Right side - User profile */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-700 font-medium">Auto-apply Active</span>
              </div>
              
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={imgEllipse3226} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">Jane Doe</div>
                  <div className="text-xs text-gray-500">Job Seeker</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Job Card */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    {jobData.logo ? (
                      <ImageWithFallback 
                        src={jobData.logo} 
                        alt={jobData.company}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-200" 
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-xl flex items-center justify-center">
                        <Building className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Job Title and Company */}
                    <div className="mb-4">
                      <h1 className="text-3xl font-semibold text-gray-900 mb-2">{jobData.title}</h1>
                      <div className="flex items-center gap-4 text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{jobData.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{jobData.location}</span>
                        </div>
                        {jobData.postedTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{jobData.postedTime}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Job Details Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                        {jobData.salary}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        {jobData.type}
                      </Badge>
                      {jobData.workModel && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          {jobData.workModel}
                        </Badge>
                      )}
                      {jobData.experienceLevel && (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                          {jobData.experienceLevel}
                        </Badge>
                      )}
                      {jobData.rank && (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                          {jobData.rank}
                        </Badge>
                      )}
                    </div>

                    {/* Company Info */}
                    {(jobData.companySize || jobData.companyIndustry || jobData.companyRating) && (
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                        {jobData.companySize && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{jobData.companySize}</span>
                          </div>
                        )}
                        {jobData.companyIndustry && (
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{jobData.companyIndustry}</span>
                          </div>
                        )}
                        {jobData.companyRating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{jobData.companyRating}/5.0</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-6">
                        {jobData.hasApplied || jobData.isApplied ? 'Applied ✓' : 'Quick Apply'}
                      </Button>
                      <Button variant="outline" className="border-gray-300">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements Section */}
            {jobData.requirements && jobData.requirements.length > 0 && (
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                  <div className="space-y-2">
                    {jobData.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#ff6b35] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benefits Section */}
            {jobData.benefits && jobData.benefits.length > 0 && (
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {jobData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Job Description */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex gap-2 border-b border-gray-200">
                    <button
                      onClick={() => setSelectedTab('description')}
                      className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                        selectedTab === 'description'
                          ? 'border-[#ff6b35] text-[#ff6b35]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Job Description
                    </button>
                    <button
                      onClick={() => setSelectedTab('company')}
                      className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                        selectedTab === 'company'
                          ? 'border-[#ff6b35] text-[#ff6b35]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      About Company
                    </button>
                  </div>
                </div>
                
                <div className="prose prose-gray max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedTab === 'description' 
                      ? jobData.description 
                      : `Learn more about ${jobData.company} and what makes them a great place to work. Join a team that values innovation, growth, and making a meaningful impact in ${jobData.companyIndustry || 'the industry'}.`
                    }
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recruiter Contact */}
            {jobData.recruiter && (
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruiter Contact</h3>
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={jobData.recruiter.avatar} />
                      <AvatarFallback>{jobData.recruiter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{jobData.recruiter.name}</div>
                      <div className="text-sm text-gray-600">{jobData.recruiter.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{jobData.recruiter.yearsExperience} years experience</div>
                    </div>
                    <div className="flex gap-2">
                      {jobData.recruiter.contactInfo?.email && (
                        <Button size="sm" variant="outline" className="text-xs">
                          Email
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Application Status */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
                <div className="space-y-3">
                  {jobData.hasApplied || jobData.isApplied ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800">Applied</span>
                        {jobData.applicationMethod && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            {jobData.applicationMethod === 'quick-apply' ? 'Quick Apply' : 
                             jobData.applicationMethod === 'manual' ? 'Manual' : 
                             'Recruiter Selected'}
                          </Badge>
                        )}
                      </div>
                      {!isPremium && jobData.applicationMethod === 'recruiter-consideration' && (
                        <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-xs text-blue-700">
                            <MessageCircle className="w-3 h-3 inline mr-1" />
                            <strong>Chat Enabled:</strong> This recruiter reached out to you first - you can message them even as a basic user!
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-600">Not Applied</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Scheduled Interviews & Chats */}
            {(jobData.hasApplied || jobData.isApplied) && scheduledInterviews.map((interview) => (
              <Card key={interview.id} className={`border shadow-sm ${
                interview.status === 'confirmed' 
                  ? 'bg-green-50 border-green-200' 
                  : interview.status === 'pending'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-white border-gray-200'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{interview.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${
                          interview.type === 'interview' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {interview.type === 'interview' ? 'Interview' : 'Chat Session'}
                        </Badge>
                        <Badge className={`text-xs ${
                          interview.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : interview.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {interview.status === 'confirmed' ? 'Confirmed' : 
                           interview.status === 'pending' ? 'Pending' : 'Scheduled'}
                        </Badge>
                      </div>
                    </div>
                    {interview.status === 'confirmed' && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                    {interview.status === 'pending' && (
                      <div className="flex items-center gap-1 text-yellow-600">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Format:</span>
                      <span>{interview.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Scheduled by:</span>
                      <span className="text-right">{interview.scheduledBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Date:</span>
                      <span>{interview.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Time:</span>
                      <span>{interview.time}</span>
                    </div>
                  </div>

                  {interview.status === 'confirmed' && (
                    <div className="space-y-2">
                      <Button 
                        onClick={() => handleJoinCall(interview.meetingUrl)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Join {interview.format} Call
                      </Button>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Added to your theGarage calendar</span>
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        Click to join the meeting 5 minutes before start time
                      </p>
                    </div>
                  )}
                  
                  {interview.status === 'pending' && (
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        Waiting for recruiter confirmation. You'll receive a calendar invite once confirmed.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Recruiter Chat Section - Only for applied jobs */}
            {(jobData.hasApplied || jobData.isApplied) && (() => {
              // Determine if user can chat: Premium users can always chat, basic users can chat if auto-applied
              const canChat = isPremium || jobData.applicationMethod === 'recruiter-consideration';
              const isAutoApplied = jobData.applicationMethod === 'recruiter-consideration';
              
              return (
                <Card className={`shadow-lg relative overflow-hidden ${
                  canChat 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200' 
                    : 'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200'
                }`}>
                  <div className="absolute top-2 right-2">
                    <Badge className={`text-white ${
                      canChat 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-[#ff6b35] to-[#ff8c42]'
                    }`}>
                      {canChat ? <CheckCircle className="w-3 h-3 mr-1" /> : <Crown className="w-3 h-3 mr-1" />}
                      {canChat ? 'Active' : 'Premium'}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        canChat 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : 'bg-gradient-to-r from-[#ff6b35] to-[#ff8c42]'
                      }`}>
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Chat with Recruiter</h3>
                        <p className="text-sm text-gray-600">
                          {canChat ? 'Connected with hiring team' : 'Direct communication with hiring team'}
                        </p>
                        {!isPremium && isAutoApplied && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ Chat enabled - Recruiter reached out to you
                          </p>
                        )}
                      </div>
                    </div>

                    {!canChat && (
                      <div className="bg-white/60 rounded-lg p-4 mb-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Zap className="w-4 h-4 text-[#ff6b35]" />
                            <span>Instant messaging with recruiters</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4 text-[#ff6b35]" />
                            <span>Real-time interview scheduling</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Star className="w-4 h-4 text-[#ff6b35]" />
                            <span>Priority application status</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {!isPremium && isAutoApplied && (
                      <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span><strong>Special Access:</strong> This recruiter reached out to you first</span>
                          </div>
                          <p className="text-green-700 text-xs">
                            Basic users can chat when recruiters send consideration requests (auto-apply)
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Chat Messages */}
                    <div className={`space-y-3 max-h-60 overflow-y-auto mb-4 rounded-lg p-3 ${
                      canChat ? 'bg-white/80' : 'bg-white/60'
                    }`}>
                      {messages.map((msg) => (
                        <div key={msg.id} className={`${
                          msg.sender === 'user' ? 'ml-8' : ''
                        }`}>
                          <div className={`rounded-lg p-3 text-sm shadow-sm ${
                            msg.sender === 'user' 
                              ? 'bg-orange-50 text-orange-800' 
                              : 'bg-white text-gray-600'
                          }`}>
                            {msg.sender === 'recruiter' && (
                              <div className="flex items-center gap-2 mb-1">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={msg.avatar || jobData.recruiter?.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {msg.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-gray-500 font-medium">
                                  {msg.name} • {msg.timestamp}
                                </span>
                              </div>
                            )}
                            {msg.sender === 'user' && (
                              <span className="text-xs text-orange-600 block mb-1 font-medium">
                                {msg.name} • {msg.timestamp}
                              </span>
                            )}
                            <p>{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="relative mb-4">
                      <div className={`border-2 rounded-lg px-4 py-3 flex items-center gap-3 backdrop-blur-sm ${
                        canChat 
                          ? 'border-green-200 bg-white/80' 
                          : 'border-orange-200 bg-white/80'
                      }`}>
                        <input
                          type="text"
                          placeholder={canChat ? "Type a message..." : "Type a message to the recruiter..."}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                          disabled={!canChat}
                        />
                        {!canChat && <Lock className="w-4 h-4 text-gray-400" />}
                        <Paperclip className="w-4 h-4 text-gray-400" />
                        <Smile className="w-4 h-4 text-gray-400" />
                      </div>
                      {showPremiumMessage && !canChat && (
                        <div className="absolute -top-16 left-0 right-0 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white text-sm px-4 py-3 rounded-lg shadow-lg border border-orange-300">
                          <div className="flex items-center gap-2">
                            <Crown className="w-4 h-4" />
                            <span>Upgrade to Premium to chat directly with recruiters and schedule interviews</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {canChat ? (
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg disabled:opacity-50"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <Button 
                          onClick={() => alert('Upgrade to Premium to unlock direct chat with recruiters!')}
                          className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#e55a2b] hover:to-[#d4461f] text-white shadow-lg"
                        >
                          <Crown className="w-4 h-4 mr-2" />
                          Upgrade to Premium
                        </Button>
                        
                        {/* Pricing Info */}
                        <div className="p-3 bg-white/60 rounded-lg border border-orange-200">
                          <div className="text-center">
                            <div className="text-sm text-gray-600 mb-1">
                              Premium Plan - <span className="font-semibold text-[#ff6b35]">$19.99/month</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Cancel anytime • 7-day free trial available
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })()}

            {/* Premium Chat Teaser for Non-Applied Jobs */}
            {!(jobData.hasApplied || jobData.isApplied) && (
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect with Recruiters</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Apply for this position to unlock direct chat with the hiring team
                    </p>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center justify-center gap-2">
                        <Crown className="w-4 h-4 text-purple-500" />
                        <span>Premium feature available after application</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    >
                      Apply Now to Unlock Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notes Section */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Notes</h3>
                <Textarea
                  placeholder="Add your thoughts about this position..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[120px] bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400 resize-none"
                />
                <Button 
                  onClick={handleSaveNotes}
                  className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}