import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Target, Crown, Award, Calendar, BarChart3, Database, Brain, ChartBar, Globe, Code, Sparkles, Bot, Star, Trophy, Medal, Zap, Activity, Clock, MapPin, Building, Eye, Share2, Bookmark, CheckCircle, User, Phone, Mail, Shuffle, Lightbulb } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';
import { CoffeeChatRequest } from './CoffeeChatRequest';
import { ProfileComparison } from './ProfileComparison';
import { QueueIntelligence } from './QueueIntelligence';
import { SmartQueueRecommendations } from './SmartQueueRecommendations';

interface QueueDetailPageProps {
  queue: any;
  onBack: () => void;
  onNavigate: (view: string) => void;
  user?: any;
}

export function QueueDetailPage({ queue, onBack, onNavigate, user }: QueueDetailPageProps) {
  const isPremium = user?.isPremium || false;
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [showCoffeeChatRequest, setShowCoffeeChatRequest] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [showProfileComparison, setShowProfileComparison] = useState(false);
  const [showQueueIntelligence, setShowQueueIntelligence] = useState(false);
  const [showSmartRecommendations, setShowSmartRecommendations] = useState(false);
  const [comparisonUser, setComparisonUser] = useState<any>(null);

  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Sarah Chen', score: 95, change: 2, location: 'Toronto, ON', avatar: '👩‍💻', trending: 'up' },
    { rank: 2, name: 'Alex Johnson', score: 93, change: -1, location: 'Vancouver, BC', avatar: '👨‍💼', trending: 'down' },
    { rank: 3, name: 'Maria Garcia', score: 91, change: 0, location: 'Montreal, QC', avatar: '👩‍🔬', trending: 'stable' },
    { rank: 4, name: 'David Kim', score: 89, change: 3, location: 'Calgary, AB', avatar: '👨‍💻', trending: 'up' },
    { rank: 5, name: 'Jessica Wong', score: 87, change: 1, location: 'Ottawa, ON', avatar: '👩‍💼', trending: 'up' },
    // User's position
    { rank: queue.current || 87, name: 'Mike Perry (You)', score: 85, change: queue.change || 8, location: 'Toronto, ON', avatar: '👨‍💻', trending: queue.trend, isUser: true }
  ];

  // Coffee chat request handlers
  const handleCoffeeChatRequest = (person: any) => {
    if (isPremium) {
      setSelectedPerson(person);
      setShowCoffeeChatRequest(true);
    } else {
      alert('Upgrade to Premium to request coffee chats with other professionals!');
    }
  };

  const handleSendCoffeeChatRequest = (requestData: any) => {
    console.log('Coffee chat request sent:', requestData);
    // In a real app, this would send the request to the backend
    
    // Show success message
    const personType = requestData.recipientType === 'recruiter' ? 'recruiter' : 'professional';
    alert(`Coffee chat request sent to ${requestData.recipientName}! They'll receive your request and can respond through their theGarage notifications.`);
    
    setShowCoffeeChatRequest(false);
    setSelectedPerson(null);
  };

  const handleViewProfile = (person: any) => {
    if (isPremium) {
      console.log('View profile:', person);
      // In a real app, this would navigate to the person's profile
    } else {
      alert('Upgrade to Premium to view detailed profiles!');
    }
  };

  const handleCompareProfile = (person: any) => {
    if (isPremium) {
      setComparisonUser(person);
      setShowProfileComparison(true);
    } else {
      alert('Upgrade to Premium to access Profile Comparison features!');
    }
  };

  const handleOpenQueueIntelligence = () => {
    if (isPremium) {
      setShowQueueIntelligence(true);
    } else {
      // Show upgrade prompt for basic users
      alert('Upgrade to Premium to access AI Queue Intelligence features!');
    }
  };

  // Mock analytics data
  const analyticsData = {
    applicationsThisWeek: 12,
    responseRate: 68,
    avgTimeToResponse: '3.2 days',
    topSkillsRequested: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Tableau'],
    salaryRange: {
      min: 85000,
      max: 145000,
      average: 112000
    },
    companiesHiring: [
      { name: 'Google', positions: 3, logo: '🔵' },
      { name: 'Microsoft', positions: 5, logo: '🟦' },
      { name: 'Amazon', positions: 2, logo: '🟠' },
      { name: 'Meta', positions: 1, logo: '🔵' },
      { name: 'Apple', positions: 2, logo: '⚪' }
    ]
  };

  const IconComponent = queue.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-lg shadow-gray-900/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="rounded-full w-10 h-10 p-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-xl font-medium">
                  <span className="text-gray-900">the</span>
                  <span className="text-[#ff6b35]">Garage</span>
                </span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">Queue Details</span>
              </div>
            </div>
            
            {/* Right Side */}
            <div className="flex items-center gap-4">
              <ProfileDropdown 
                onNavigate={onNavigate}
                isPremium={isPremium}
                userName={user ? `${user.firstName} ${user.lastName}` : "User"}
                userEmail={user?.email || "user@example.com"}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Queue Header */}
        <div className="mb-8">
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-orange-100/50 shadow-2xl shadow-orange-500/10">
            <div className="flex items-start gap-6">
              <div className={`w-20 h-20 ${queue.color} rounded-3xl flex items-center justify-center shadow-2xl`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-medium text-gray-900">{queue.title}</h1>
                      {queue.isAuto && (
                        <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                          <Bot className="w-3 h-3" />
                          AI Selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg text-gray-600 mb-4">{queue.description}</p>
                    
                    {queue.isAuto && queue.reason && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 max-w-2xl">
                        <p className="text-sm text-blue-700">{queue.reason}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleOpenQueueIntelligence}
                      className={isPremium 
                        ? "bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-blue-100"
                        : "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 text-gray-500 hover:from-orange-50 hover:to-orange-100 hover:border-orange-300 hover:text-orange-700"
                      }
                    >
                      {isPremium ? (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          AI Intelligence
                        </>
                      ) : (
                        <>
                          <Crown className="w-4 h-4 mr-2" />
                          AI Intelligence (Premium)
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Watch Queue
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
                
                {/* Key Stats */}
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
                    <div className="text-2xl font-medium text-gray-900 mb-1">#{queue.current}</div>
                    <div className="text-sm text-gray-500">Your Rank</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                    <div className="text-2xl font-medium text-gray-900 mb-1">{queue.total}</div>
                    <div className="text-sm text-gray-500">Total Candidates</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                    <div className="text-2xl font-medium text-gray-900 mb-1">{queue.match}%</div>
                    <div className="text-sm text-gray-500">Match Score</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {queue.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : queue.trend === 'down' ? (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      ) : (
                        <div className="w-5 h-5 text-yellow-600">—</div>
                      )}
                      <span className={`text-2xl font-medium ${
                        queue.trend === 'up' ? 'text-green-600' : 
                        queue.trend === 'down' ? 'text-red-600' : 
                        'text-yellow-600'
                      }`}>
                        {queue.change > 0 ? '+' : ''}{queue.change}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">vs Last Month</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="leaderboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Smart Recommendations
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-medium text-gray-900">Queue Leadership</h2>
                <p className="text-gray-600">Top performers and hiring leaders in {queue.title.toLowerCase()}</p>
              </div>
              <div className="flex gap-2">
                {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
                  <Button
                    key={period}
                    variant={selectedTimeframe === period ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeframe(period)}
                    className={selectedTimeframe === period ? 'bg-[#ff6b35] hover:bg-[#e55a2b]' : ''}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Premium Feature Badge - Only show for basic users */}
            {!isPremium && (
              <Card className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-200">
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-yellow-600" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Premium Leadership Feature</h3>
                    <p className="text-sm text-yellow-700">Access exclusive leaderboards and networking opportunities</p>
                  </div>
                  <Button size="sm" className="ml-auto bg-yellow-600 hover:bg-yellow-700 text-white">
                    Upgrade to Premium
                  </Button>
                </div>
              </Card>
            )}

            {/* Leadership Tabs */}
            <Tabs defaultValue="job-seekers" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="job-seekers" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Job Seeker Leadership
                </TabsTrigger>
                <TabsTrigger value="recruiters" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Recruiter Leadership
                </TabsTrigger>
              </TabsList>

              {/* Job Seeker Leadership */}
              <TabsContent value="job-seekers" className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Top Job Seekers</h3>
                  <p className="text-gray-600">Highest-ranked professionals in this queue</p>
                </div>

                <div className="grid gap-4">
                  {leaderboardData.map((candidate, index) => (
                    <Card key={candidate.rank} className={`p-6 transition-all hover:shadow-lg ${
                      candidate.isUser ? 'border-2 border-[#ff6b35] bg-gradient-to-r from-orange-50 to-orange-100/30' : 'border border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                            candidate.rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' : 'bg-gray-100'
                          }`}>
                            {candidate.rank <= 3 ? (
                              candidate.rank === 1 ? <Crown className="w-6 h-6" /> :
                              candidate.rank === 2 ? <Medal className="w-6 h-6" /> :
                              <Award className="w-6 h-6" />
                            ) : (
                              candidate.avatar
                            )}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-medium ${candidate.isUser ? 'text-[#ff6b35]' : 'text-gray-900'}`}>
                                {candidate.name}
                              </h3>
                              {candidate.isUser && (
                                <Badge className="bg-[#ff6b35] text-white text-xs">YOU</Badge>
                              )}
                              <Crown className="w-4 h-4 text-yellow-500" />
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {candidate.location}
                              </span>
                              <span>•</span>
                              <span>Rank #{candidate.rank}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-medium text-gray-900">{candidate.score}</div>
                            <div className="text-sm text-gray-500">Score</div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {candidate.trending === 'up' ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : candidate.trending === 'down' ? (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            ) : (
                              <div className="w-4 h-4 text-yellow-600">—</div>
                            )}
                            <span className={`text-sm font-medium ${
                              candidate.trending === 'up' ? 'text-green-600' : 
                              candidate.trending === 'down' ? 'text-red-600' : 
                              'text-yellow-600'
                            }`}>
                              {candidate.change > 0 ? '+' : ''}{candidate.change}
                            </span>
                          </div>

                          {!candidate.isUser && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  if (isPremium) {
                                    handleViewProfile({
                                      id: candidate.rank.toString(),
                                      name: candidate.name,
                                      location: candidate.location,
                                      avatar: candidate.avatar,
                                      type: 'job-seeker',
                                      rank: candidate.rank,
                                      score: candidate.score
                                    });
                                  } else {
                                    alert('Upgrade to Premium to view candidate profiles!');
                                  }
                                }}
                                className={!isPremium ? "opacity-60 cursor-not-allowed" : ""}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                {isPremium ? 'Profile' : 'Profile (Premium)'}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleCompareProfile({
                                  id: candidate.rank.toString(),
                                  name: candidate.name,
                                  location: candidate.location,
                                  avatar: candidate.avatar,
                                  type: 'job-seeker',
                                  rank: candidate.rank,
                                  score: candidate.score
                                })}
                                className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-purple-100"
                              >
                                <Shuffle className="w-4 h-4 mr-1" />
                                Compare
                              </Button>
                              <Button 
                                size="sm" 
                                className={isPremium 
                                  ? "bg-[#ff6b35] hover:bg-[#e55a2b] text-white" 
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }
                                onClick={() => {
                                  if (isPremium) {
                                    handleCoffeeChatRequest({
                                      id: candidate.rank.toString(),
                                      name: candidate.name,
                                      location: candidate.location,
                                      avatar: candidate.avatar,
                                      type: 'job-seeker',
                                      rank: candidate.rank,
                                      score: candidate.score
                                    });
                                  } else {
                                    alert('Upgrade to Premium to request coffee chats!');
                                  }
                                }}
                              >
                                {isPremium ? '☕ Coffee Chat' : '👑 Coffee Chat (Premium)'}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Recruiter Leadership */}
              <TabsContent value="recruiters" className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Top Hiring Recruiters</h3>
                  <p className="text-gray-600">Most active recruiters hiring in this queue</p>
                </div>

                <div className="grid gap-4">
                  {[
                    { rank: 1, name: 'Sarah Mitchell', company: 'Google', hires: 47, location: 'Mountain View, CA', avatar: '👩‍💼', trend: 'up', change: 3 },
                    { rank: 2, name: 'David Chen', company: 'Microsoft', hires: 42, location: 'Seattle, WA', avatar: '👨‍💼', trend: 'stable', change: 0 },
                    { rank: 3, name: 'Emily Rodriguez', company: 'Meta', hires: 38, location: 'Menlo Park, CA', avatar: '👩‍💼', trend: 'up', change: 2 },
                    { rank: 4, name: 'Alex Johnson', company: 'Amazon', hires: 35, location: 'Seattle, WA', avatar: '👨‍💼', trend: 'down', change: -1 },
                    { rank: 5, name: 'Jessica Park', company: 'Apple', hires: 31, location: 'Cupertino, CA', avatar: '👩‍💼', trend: 'up', change: 4 }
                  ].map((recruiter) => (
                    <Card key={recruiter.rank} className="p-6 transition-all hover:shadow-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                            recruiter.rank <= 3 ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'bg-gray-100'
                          }`}>
                            {recruiter.rank <= 3 ? (
                              recruiter.rank === 1 ? <Crown className="w-6 h-6" /> :
                              recruiter.rank === 2 ? <Medal className="w-6 h-6" /> :
                              <Award className="w-6 h-6" />
                            ) : (
                              recruiter.avatar
                            )}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900">{recruiter.name}</h3>
                              <Badge className="bg-blue-100 text-blue-800 text-xs">Recruiter</Badge>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Building className="w-3 h-3" />
                                {recruiter.company}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {recruiter.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-medium text-gray-900">{recruiter.hires}</div>
                            <div className="text-sm text-gray-500">Hires</div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {recruiter.trend === 'up' ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : recruiter.trend === 'down' ? (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            ) : (
                              <div className="w-4 h-4 text-yellow-600">—</div>
                            )}
                            <span className={`text-sm font-medium ${
                              recruiter.trend === 'up' ? 'text-green-600' : 
                              recruiter.trend === 'down' ? 'text-red-600' : 
                              'text-yellow-600'
                            }`}>
                              {recruiter.change > 0 ? '+' : ''}{recruiter.change}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewProfile({
                                id: recruiter.rank.toString(),
                                name: recruiter.name,
                                title: 'Senior Recruiter',
                                company: recruiter.company,
                                location: recruiter.location,
                                avatar: recruiter.avatar,
                                type: 'recruiter',
                                hires: recruiter.hires
                              })}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Profile
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() => handleCoffeeChatRequest({
                                id: recruiter.rank.toString(),
                                name: recruiter.name,
                                title: 'Senior Recruiter',
                                company: recruiter.company,
                                location: recruiter.location,
                                avatar: recruiter.avatar,
                                type: 'recruiter',
                                hires: recruiter.hires
                              })}
                            >
                              ☕ Coffee Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Queue Analytics</h2>
              <p className="text-gray-600">Market insights and hiring trends for {queue.title.toLowerCase()}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">This Week</Badge>
                </div>
                <div className="text-2xl font-medium text-gray-900 mb-1">{analyticsData.applicationsThisWeek}</div>
                <div className="text-sm text-gray-500">New Applications</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">Response Rate</Badge>
                </div>
                <div className="text-2xl font-medium text-gray-900 mb-1">{analyticsData.responseRate}%</div>
                <div className="text-sm text-gray-500">Employer Response</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Average</Badge>
                </div>
                <div className="text-2xl font-medium text-gray-900 mb-1">{analyticsData.avgTimeToResponse}</div>
                <div className="text-sm text-gray-500">Response Time</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Average</Badge>
                </div>
                <div className="text-2xl font-medium text-gray-900 mb-1">${analyticsData.salaryRange.average.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Salary Range</div>
              </Card>
            </div>

            {/* Skills and Companies */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Top Skills Requested</h3>
                <div className="space-y-3">
                  {analyticsData.topSkillsRequested.map((skill, index) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-gray-700">{skill}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={90 - (index * 10)} className="w-20" />
                        <span className="text-sm text-gray-500">{90 - (index * 10)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Companies Actively Hiring</h3>
                <div className="space-y-3">
                  {analyticsData.companiesHiring.map((company) => (
                    <div key={company.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{company.logo}</span>
                        <span className="text-gray-700">{company.name}</span>
                      </div>
                      <Badge variant="outline">{company.positions} positions</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">AI-Powered Insights</h2>
              <p className="text-gray-600">Personalized recommendations to improve your queue ranking</p>
            </div>

            <div className="grid gap-6">
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Skill Gap Analysis</h3>
                    <p className="text-gray-700 mb-3">
                      Adding <strong>Machine Learning</strong> and <strong>Deep Learning</strong> skills could boost your ranking by an estimated <strong>12-15 positions</strong>.
                    </p>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                      View Recommended Courses
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Profile Optimization</h3>
                    <p className="text-gray-700 mb-3">
                      Your profile completeness is <strong>87%</strong>. Adding project portfolio and certifications could improve your match score.
                    </p>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                      Complete Profile
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Market Trend Alert</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Cloud Computing</strong> skills are trending up 23% in your queue. Consider gaining AWS or Azure certifications.
                    </p>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      Explore Certifications
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Smart Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Smart Queue Recommendations</h2>
              <p className="text-gray-600 mb-8">AI-powered suggestions for your next career move</p>
              
              <Button
                onClick={() => setShowSmartRecommendations(true)}
                className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#e55a2b] hover:to-[#e67a38] text-white text-lg px-8 py-4 rounded-xl shadow-lg"
              >
                <Brain className="w-6 h-6 mr-3" />
                Get AI Recommendations
                <Crown className="w-5 h-5 ml-3 text-yellow-300" />
              </Button>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-100/30 border-2 border-green-200">
                  <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Perfect Matches</h3>
                  <p className="text-sm text-gray-600">Queues that align perfectly with your current skills</p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/30 border-2 border-blue-200">
                  <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
                  <p className="text-sm text-gray-600">Roles that offer career advancement potential</p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/30 border-2 border-purple-200">
                  <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Trending Fields</h3>
                  <p className="text-sm text-gray-600">Rapidly growing markets with high demand</p>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Recent Activity</h2>
              <p className="text-gray-600">Your queue activity and ranking changes</p>
            </div>

            <div className="space-y-4">
              {[
                { type: 'rank-up', message: 'Moved up 3 positions to #87', time: '2 hours ago', icon: TrendingUp, color: 'text-green-600' },
                { type: 'application', message: 'Applied to Google - Senior Data Analyst', time: '1 day ago', icon: Building, color: 'text-blue-600' },
                { type: 'skill-add', message: 'Added Machine Learning skill', time: '3 days ago', icon: Zap, color: 'text-purple-600' },
                { type: 'profile-update', message: 'Updated work experience', time: '5 days ago', icon: User, color: 'text-orange-600' },
                { type: 'rank-change', message: 'Ranking updated based on market changes', time: '1 week ago', icon: BarChart3, color: 'text-gray-600' }
              ].map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Coffee Chat Request Modal */}
      {showCoffeeChatRequest && selectedPerson && (
        <CoffeeChatRequest
          person={selectedPerson}
          onSendRequest={handleSendCoffeeChatRequest}
          onClose={() => {
            setShowCoffeeChatRequest(false);
            setSelectedPerson(null);
          }}
        />
      )}

      {/* Profile Comparison Modal */}
      {showProfileComparison && comparisonUser && (
        <ProfileComparison
          currentUser={{
            firstName: 'Mike',
            lastName: 'Perry',
            avatar: null
          }}
          compareUser={comparisonUser}
          queue={queue}
          onClose={() => {
            setShowProfileComparison(false);
            setComparisonUser(null);
          }}
        />
      )}

      {/* Queue Intelligence Modal */}
      {showQueueIntelligence && (
        <QueueIntelligence
          queue={queue}
          userPosition={queue.current || 87}
          onClose={() => setShowQueueIntelligence(false)}
        />
      )}

      {/* Smart Queue Recommendations Modal */}
      {showSmartRecommendations && (
        <SmartQueueRecommendations
          currentQueues={['data-engineer', 'senior-analyst', 'machine-learning']}
          userProfile={{
            skills: ['Python', 'SQL', 'Statistics'],
            experience: 3.5,
            education: 'MS Computer Science'
          }}
          onClose={() => setShowSmartRecommendations(false)}
          onJoinQueue={(queueId) => {
            console.log('Joining queue:', queueId);
            // In a real app, this would add the user to the queue
            setShowSmartRecommendations(false);
          }}
        />
      )}
    </div>
  );
}