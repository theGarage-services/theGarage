import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { EditProfile } from './EditProfile';
import { QueueDetail } from './QueueDetail';
import { QueueSelector } from './QueueSelector';
import { MyQueues } from './MyQueues';
import { 
  ArrowRight, Search, Bell, ChevronDown, MapPin, Briefcase, DollarSign, Building, Clock, Share2, Heart, Zap, 
  CheckCircle, Users, Star, ExternalLink, X, Crown, User, BarChart3, Filter, Check, TrendingUp, TrendingDown, 
  Calendar, Edit3, Download, Eye, Settings, Award, Code, Database, Server, Globe, Target, Linkedin, Github, 
  Mail, Phone, GraduationCap, Lightbulb, MessageSquare, FileText, Bookmark, Activity, Brain, Rocket, ChartBar, 
  Bot, Sparkles 
} from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';
import { ImageWithFallback } from './figma/ImageWithFallback';
import svgPaths from "../imports/svg-m0rt4c52oy";
import imgEllipse3226 from "figma:asset/f5fac11c01a60e372bdbe156841128ba6926f1d0.png";
import img654553Fedbede7976B97Eaf5Professional5ReminiEnhanced from "figma:asset/5d47026abe4e77aa0174b98e6e5497be2b9b5962.png";

interface ProfileProps {
  onNavigate: (view: 'homepage' | 'tracker' | 'profile' | 'notifications' | 'settings' | 'support' | 'report-issue') => void;
  onNavigateToQueueSelector?: (props: any) => void;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  logo: string;
}

interface Achievement {
  id: string;
  title: string;
  icon: any;
  color: string;
}

export function Profile({ onNavigate, onNavigateToQueueSelector }: ProfileProps) {
  const [selectedQueue, setSelectedQueue] = useState<string | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [showQueueDetail, setShowQueueDetail] = useState(false);
  const [selectedQueueForDetail, setSelectedQueueForDetail] = useState<any>(null);

  const [userQueues, setUserQueues] = useState<string[]>([
    'data-engineer', 
    'senior-analyst', 
    'machine-learning',
    'product-analyst', 
    'business-intelligence'
  ]);
  const [queueStatuses, setQueueStatuses] = useState<Record<string, boolean>>({
    'data-engineer': true,
    'senior-analyst': true,
    'machine-learning': false, // This one is inactive
    'product-analyst': true,
    'business-intelligence': true
  });
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'BMO Financial Group',
      position: 'Senior Data Analyst',
      duration: '2022 - Present',
      description: 'Led data-driven initiatives to optimize risk assessment models',
      logo: '🏦'
    },
    {
      id: '2',
      company: 'Deloitte',
      position: 'Data Analyst',
      duration: '2020 - 2022',
      description: 'Developed analytics solutions for financial services clients',
      logo: '💼'
    }
  ]);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: 'Top Performer Q3 2024', icon: Award, color: 'text-yellow-600' },
    { id: '2', title: 'Data Science Certification', icon: GraduationCap, color: 'text-blue-600' },
    { id: '3', title: '5+ Years Experience', icon: Clock, color: 'text-green-600' },
    { id: '4', title: 'Team Leadership', icon: Users, color: 'text-purple-600' }
  ]);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    duration: '',
    description: '',
    logo: '🏢'
  });
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    icon: Award,
    color: 'text-blue-600'
  });

  const interviewStats = [
    { label: 'Considerations', count: 16, color: 'bg-orange-100 text-orange-800' },
    { label: 'Interviews', count: 2, color: 'bg-[#ff6b35] text-white' },
    { label: 'Job Offers', count: 0, color: 'bg-orange-100 text-orange-800' },
    { label: 'Rejections', count: 2, color: 'bg-orange-100 text-orange-800' }
  ];

  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      const experience: Experience = {
        ...newExperience,
        id: Date.now().toString()
      };
      setExperiences([...experiences, experience]);
      setNewExperience({ company: '', position: '', duration: '', description: '', logo: '🏢' });
      setShowAddExperience(false);
    }
  };

  const addAchievement = () => {
    if (newAchievement.title) {
      const achievement: Achievement = {
        ...newAchievement,
        id: Date.now().toString()
      };
      setAchievements([...achievements, achievement]);
      setNewAchievement({ title: '', icon: Award, color: 'text-blue-600' });
      setShowAddAchievement(false);
    }
  };

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const deleteAchievement = (id: string) => {
    setAchievements(achievements.filter(ach => ach.id !== id));
  };

  const handleUpdateQueues = (selectedQueues: string[]) => {
    setUserQueues(selectedQueues);
  };

  const handleUpdateQueueStatuses = (statuses: Record<string, boolean>) => {
    setQueueStatuses(statuses);
  };

  // Note: Queue data is now managed by MyQueues component

  // Queue recommendations for career change
  const queueRecommendations = [
    {
      id: 'cloud-engineer',
      title: 'Cloud Solutions Engineer',
      description: 'Cloud architecture and DevOps roles',
      match: 78,
      reason: 'Your technical skills align well with cloud technologies',
      timeToReady: '3-6 months',
      requiredSkills: ['AWS', 'Docker', 'Kubernetes'],
      icon: Globe,
      color: 'bg-gradient-to-r from-sky-500 to-sky-600'
    },
    {
      id: 'data-science',
      title: 'Data Scientist Queue',
      description: 'Advanced analytics and machine learning research',
      match: 82,
      reason: 'Strong foundation in statistics and Python programming',
      timeToReady: '4-8 months',
      requiredSkills: ['Machine Learning', 'Statistics', 'Deep Learning'],
      icon: Sparkles,
      color: 'bg-gradient-to-r from-pink-500 to-pink-600'
    },
    {
      id: 'software-engineer',
      title: 'Software Engineer Queue',
      description: 'Full-stack and backend development roles',
      match: 70,
      reason: 'Your programming experience provides a solid foundation',
      timeToReady: '6-12 months',
      requiredSkills: ['React', 'Node.js', 'System Design'],
      icon: Code,
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600'
    }
  ];

  const handleResumeUpdate = (resumeData: any) => {
    // Update experiences from resume data
    if (resumeData.experience && resumeData.experience.length > 0) {
      const updatedExperiences = resumeData.experience.map((exp: any, index: number) => ({
        id: exp.id || `exp-${index}`,
        company: exp.company,
        position: exp.position,
        duration: exp.current ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`,
        description: exp.description,
        logo: exp.logo
      }));
      setExperiences(updatedExperiences);
    }
    console.log('Resume updated:', resumeData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-lg shadow-gray-900/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
                className="flex items-center gap-2 text-[#ff6b35] font-medium transition-colors"
              >
                <User className="w-5 h-5" />
                <span>My Profile</span>
              </button>
              
              <button 
                onClick={() => onNavigate('notifications')}
                className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>
              
              <button 
                onClick={() => onNavigate('tracker')}
                className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Job Tracker</span>
              </button>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <ProfileDropdown 
                onNavigate={onNavigate}
                isPremium={true}
                userName="Jane Doe"
                userEmail="jane.doe@example.com"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-orange-100/50 shadow-2xl shadow-orange-500/10 ring-1 ring-orange-100/20">
            <div className="flex items-start gap-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-40 h-40 rounded-3xl overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 shadow-2xl shadow-orange-500/30 ring-4 ring-white/50 ring-offset-4 ring-offset-orange-50">
                  <ImageWithFallback
                    src={img654553Fedbede7976B97Eaf5Professional5ReminiEnhanced}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full shadow-lg ring-4 ring-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-medium text-gray-900 mb-3">Mike Perry</h1>
                    <p className="text-xl text-gray-600 mb-2">
                      Senior Data Analyst @ <span className="text-[#ff6b35] font-medium">BMO Financial Group</span>
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Toronto, ON
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined March 2024
                      </span>
                      <span className="flex items-center gap-1 text-green-600">
                        <Activity className="w-4 h-4" />
                        Active now
                      </span>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">mike.perry@email.com</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors">
                        <Linkedin className="w-4 h-4" />
                        <span className="text-sm">LinkedIn</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors">
                        <Github className="w-4 h-4" />
                        <span className="text-sm">GitHub</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white shadow-sm"
                      onClick={() => setShowEditProfile(true)}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#e55a2b] hover:to-[#d4461f] text-white shadow-lg">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Profile
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl p-4 border border-orange-200">
                  <p className="text-gray-700 leading-relaxed italic">
                    &quot;Passionate about data-driven risk strategies and fostering collaboration across teams. Currently seeking opportunities to leverage my expertise in analytics and financial modeling to drive business growth.&quot;
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* My Queues Section */}
        <MyQueues
          onEditQueues={() => onNavigateToQueueSelector?.({
            currentQueues: userQueues,
            onUpdateQueues: handleUpdateQueues,
            queueStatuses: queueStatuses,
            onUpdateQueueStatuses: handleUpdateQueueStatuses
          })}
          onQueueClick={(queue) => {
            setSelectedQueueForDetail(queue);
            setShowQueueDetail(true);
          }}
          className="mb-8"
        />

        {/* Queue Recommendations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">Recommended Career Paths</h3>
              <p className="text-gray-600">AI-powered suggestions for career growth and transitions</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI Recommendations
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {queueRecommendations.map((rec) => {
              const IconComponent = rec.icon;
              return (
                <Card key={rec.id} className="p-4 bg-white/60 backdrop-blur-sm border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 ${rec.color} rounded-lg flex items-center justify-center shadow-sm`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                      <Badge className={`text-xs mb-2 ${
                        rec.match >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {rec.match}% match
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-700 mb-2">{rec.reason}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Ready in: {rec.timeToReady}</span>
                      <span>{rec.requiredSkills.length} skills needed</span>
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="w-full text-[#ff6b35] border-[#ff6b35] hover:bg-[#ff6b35] hover:text-white">
                    Explore Path
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Experience & Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Experience */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-green-100/50 shadow-xl shadow-green-500/10 ring-1 ring-green-100/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">Experience</h3>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white shadow-sm"
                onClick={() => setShowAddExperience(true)}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="group p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{exp.logo}</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{exp.position}</h4>
                        <p className="text-green-700 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                        <p className="text-sm text-gray-700">{exp.description}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteExperience(exp.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-purple-100/50 shadow-xl shadow-purple-500/10 ring-1 ring-purple-100/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">Achievements</h3>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white shadow-sm"
                onClick={() => setShowAddAchievement(true)}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Add Achievement
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={achievement.id} className="group p-3 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl border border-purple-200 hover:shadow-md transition-shadow relative">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className={`w-4 h-4 ${achievement.color}`} />
                      <span className="text-sm font-medium text-gray-900">{achievement.title}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteAchievement(achievement.id)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 w-6 h-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Interview Stats */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-orange-100/50 shadow-xl shadow-orange-500/10 ring-1 ring-orange-100/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Application Statistics</h3>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {interviewStats.map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
                <div className="text-3xl font-medium text-gray-900 mb-2">{stat.count}</div>
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${stat.color}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <EditProfile
            onClose={() => setShowEditProfile(false)}
            onSave={(profileData) => {
              console.log('Profile updated:', profileData);
              // Update profile data here
              setShowEditProfile(false);
            }}
            initialData={{
              firstName: "Mike",
              lastName: "Perry",
              email: "mike.perry@email.com",
              phone: "+1 (416) 555-0123",
              location: "Toronto, ON",
              bio: "Passionate about data-driven risk strategies and fostering collaboration across teams. Currently seeking opportunities to leverage my expertise in analytics and financial modeling to drive business growth.",
              currentTitle: "Senior Data Analyst",
              currentCompany: "BMO Financial Group",
              linkedin: "linkedin.com/in/mikeperry",
              github: "github.com/mikeperry",
              experience: experiences
            }}
          />
        )}

        {/* Queue Detail Modal */}
        {showQueueDetail && selectedQueueForDetail && (
          <QueueDetail
            queue={selectedQueueForDetail}
            onClose={() => {
              setShowQueueDetail(false);
              setSelectedQueueForDetail(null);
            }}
            userPosition={selectedQueueForDetail.current}
            isUserInQueue={true}
          />
        )}

      </div>
    </div>
  );
}