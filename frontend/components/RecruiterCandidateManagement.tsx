import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  MessageSquare, 
  Calendar, 
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  Eye,
  UserCheck,
  UserX,
  Clock,
  ArrowUpRight,
  Download,
  Tag,
  Building2,
  Target
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';

interface RecruiterCandidateManagementProps {
  onBack: () => void;
  user: any;
  onNavigateToQueueSourcing?: () => void;
  onNavigate?: (view: string) => void;
  setGlobalSelectedCandidate?: (candidate: any) => void;
}

export function RecruiterCandidateManagement({ onBack, user, onNavigateToQueueSourcing, onNavigate, setGlobalSelectedCandidate }: RecruiterCandidateManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPosition, setFilterPosition] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showCandidateDetail, setShowCandidateDetail] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Mock candidates data
  const candidates = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '+1 (416) 555-0123',
      position: 'Senior Software Engineer',
      location: 'Toronto, ON',
      experience: '5+ years',
      education: 'Computer Science, University of Toronto',
      status: 'new',
      appliedDate: '2024-01-25',
      lastActivity: '2 hours ago',
      avatar: 'SC',
      rating: 4.8,
      match: 95,
      salary: '$140,000',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Python'],
      summary: 'Experienced full-stack developer with a strong background in modern web technologies and cloud architecture.',
      notes: [],
      interviews: [],
      stage: 'application'
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      email: 'michael.rodriguez@email.com',
      phone: '+1 (604) 555-0456',
      position: 'Product Manager',
      location: 'Vancouver, BC',
      experience: '7+ years',
      education: 'MBA, University of British Columbia',
      status: 'interview',
      appliedDate: '2024-01-20',
      lastActivity: '1 day ago',
      avatar: 'MR',
      rating: 4.6,
      match: 88,
      salary: '$125,000',
      skills: ['Product Strategy', 'Analytics', 'Leadership', 'Agile', 'SQL'],
      summary: 'Strategic product manager with proven track record of launching successful products in B2B SaaS.',
      notes: [
        { date: '2024-01-23', note: 'Strong technical background, good cultural fit' },
        { date: '2024-01-22', note: 'Impressive portfolio of product launches' }
      ],
      interviews: [
        { date: '2024-01-26', type: 'Phone Screen', status: 'scheduled' }
      ],
      stage: 'phone-screen'
    },
    {
      id: '3',
      name: 'Emma Thompson',
      email: 'emma.thompson@email.com',
      phone: '+1 (514) 555-0789',
      position: 'UX Designer',
      location: 'Montreal, QC',
      experience: '4+ years',
      education: 'Design, OCAD University',
      status: 'reviewed',
      appliedDate: '2024-01-18',
      lastActivity: '3 days ago',
      avatar: 'ET',
      rating: 4.9,
      match: 92,
      salary: '$95,000',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'HTML/CSS'],
      summary: 'Creative UX designer passionate about creating intuitive and accessible user experiences.',
      notes: [
        { date: '2024-01-21', note: 'Excellent portfolio, strong design thinking process' }
      ],
      interviews: [],
      stage: 'portfolio-review'
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (403) 555-0321',
      position: 'Senior Software Engineer',
      location: 'Calgary, AB',
      experience: '6+ years',
      education: 'Software Engineering, University of Calgary',
      status: 'hired',
      appliedDate: '2024-01-10',
      lastActivity: '1 week ago',
      avatar: 'DK',
      rating: 4.7,
      match: 89,
      salary: '$135,000',
      skills: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kubernetes'],
      summary: 'Backend specialist with expertise in scalable distributed systems and cloud-native architecture.',
      notes: [
        { date: '2024-01-15', note: 'Excellent technical interview performance' },
        { date: '2024-01-12', note: 'Strong system design skills' }
      ],
      interviews: [
        { date: '2024-01-14', type: 'Technical Interview', status: 'completed' },
        { date: '2024-01-16', type: 'Final Interview', status: 'completed' }
      ],
      stage: 'hired'
    }
  ];

  const positions = ['Senior Software Engineer', 'Product Manager', 'UX Designer'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'application': return 'bg-blue-100 text-blue-800';
      case 'phone-screen': return 'bg-yellow-100 text-yellow-800';
      case 'portfolio-review': return 'bg-purple-100 text-purple-800';
      case 'technical-interview': return 'bg-orange-100 text-orange-800';
      case 'final-interview': return 'bg-green-100 text-green-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || candidate.status === filterStatus;
    const matchesPosition = filterPosition === 'all' || candidate.position === filterPosition;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'new' && candidate.status === 'new') ||
                      (activeTab === 'in-progress' && ['reviewed', 'interview'].includes(candidate.status)) ||
                      (activeTab === 'hired' && candidate.status === 'hired');
    
    return matchesSearch && matchesStatus && matchesPosition && matchesTab;
  });

  const handleCandidateClick = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowCandidateDetail(true);
  };

  const addNote = (candidateId: string, note: string) => {
    // In a real app, this would update the backend
    console.log('Adding note to candidate', candidateId, note);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-4 text-gray-600 hover:text-[#ff6b35]"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-3xl text-gray-900 mb-2">Candidate Management</h1>
            <p className="text-gray-600">Track and manage your candidate pipeline</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#e55a2b] hover:to-[#d4461f] text-white"
              onClick={onNavigateToQueueSourcing}
            >
              <Target className="w-4 h-4 mr-2" />
              Source Candidates
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl mb-1 text-gray-900">
                  {candidates.filter(c => c.status === 'new').length}
                </div>
                <div className="text-sm text-gray-600">New Applications</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl mb-1 text-gray-900">
                  {candidates.filter(c => ['reviewed', 'interview'].includes(c.status)).length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl mb-1 text-gray-900">
                  {candidates.filter(c => c.status === 'interview').length}
                </div>
                <div className="text-sm text-gray-600">Interviews Scheduled</div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl mb-1 text-gray-900">
                  {candidates.filter(c => c.status === 'hired').length}
                </div>
                <div className="text-sm text-gray-600">Hired This Month</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterPosition} onValueChange={setFilterPosition}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  {positions.map(position => (
                    <SelectItem key={position} value={position}>{position}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
            <TabsTrigger value="all">All ({candidates.length})</TabsTrigger>
            <TabsTrigger value="new">New ({candidates.filter(c => c.status === 'new').length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({candidates.filter(c => ['reviewed', 'interview'].includes(c.status)).length})</TabsTrigger>
            <TabsTrigger value="hired">Hired ({candidates.filter(c => c.status === 'hired').length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <Card key={candidate.id} className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => handleCandidateClick(candidate)}>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-[#ff6b35] text-white">
                          {candidate.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-gray-900">{candidate.name}</h3>
                          <Badge className={getStatusColor(candidate.status)}>
                            {candidate.status}
                          </Badge>
                          <Badge className={getStageColor(candidate.stage)}>
                            {candidate.stage.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Briefcase className="w-4 h-4" />
                              <span className="text-sm">{candidate.position}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{candidate.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <GraduationCap className="w-4 h-4" />
                              <span className="text-sm">{candidate.education}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4" />
                              <span className="text-sm">{candidate.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4" />
                              <span className="text-sm">{candidate.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">Applied {new Date(candidate.appliedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3 text-sm">{candidate.summary}</p>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{candidate.rating}</span>
                          </div>
                          <div className="text-sm text-green-600 font-medium">
                            {candidate.match}% match
                          </div>
                          <div className="text-sm text-gray-600">
                            {candidate.experience} experience
                          </div>
                          <div className="text-sm text-gray-600">
                            Expected: {candidate.salary}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.slice(0, 4).map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{candidate.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); }}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); }}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setGlobalSelectedCandidate?.(candidate);
                          onNavigate?.('candidate-profile');
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {filteredCandidates.length === 0 && (
                <Card className="p-12 text-center">
                  <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg text-gray-900 mb-2">No candidates found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery || filterStatus !== 'all' || filterPosition !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'Candidates will appear here as they apply to your job postings'
                    }
                  </p>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Candidate Detail Modal */}
        <Dialog open={showCandidateDetail} onOpenChange={setShowCandidateDetail}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedCandidate && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#ff6b35] text-white">
                        {selectedCandidate.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {selectedCandidate.name}
                    <Badge className={getStatusColor(selectedCandidate.status)}>
                      {selectedCandidate.status}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>
                    View and manage candidate profile details, experience, and application status.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-6">
                  <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="notes">Notes ({selectedCandidate.notes.length})</TabsTrigger>
                      <TabsTrigger value="interviews">Interviews ({selectedCandidate.interviews.length})</TabsTrigger>
                      <TabsTrigger value="resume">Resume</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Contact Information</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span>{selectedCandidate.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>{selectedCandidate.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{selectedCandidate.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Professional Info</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-gray-400" />
                              <span>{selectedCandidate.position}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{selectedCandidate.experience}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-gray-400" />
                              <span>{selectedCandidate.education}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Summary</h4>
                        <p className="text-gray-600">{selectedCandidate.summary}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.skills.map((skill: string, idx: number) => (
                            <Badge key={idx} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-2xl text-green-600 mb-1">{selectedCandidate.match}%</div>
                          <div className="text-sm text-gray-600">Match Score</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-lg">{selectedCandidate.rating}</span>
                          </div>
                          <div className="text-sm text-gray-600">Rating</div>
                        </div>
                        <div>
                          <div className="text-lg text-gray-900 mb-1">{selectedCandidate.salary}</div>
                          <div className="text-sm text-gray-600">Expected Salary</div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="notes">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="new-note">Add New Note</Label>
                          <Textarea
                            id="new-note"
                            placeholder="Add a note about this candidate..."
                            className="mt-1"
                          />
                          <Button size="sm" className="mt-2">Add Note</Button>
                        </div>
                        
                        <div className="space-y-3">
                          {selectedCandidate.notes.map((note: any, idx: number) => (
                            <div key={idx} className="p-3 border rounded-lg">
                              <div className="text-sm text-gray-500 mb-1">
                                {new Date(note.date).toLocaleDateString()}
                              </div>
                              <p className="text-gray-700">{note.note}</p>
                            </div>
                          ))}
                          
                          {selectedCandidate.notes.length === 0 && (
                            <p className="text-gray-500 text-center py-8">No notes added yet</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="interviews">
                      <div className="space-y-4">
                        <Button size="sm" className="mb-4">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Interview
                        </Button>
                        
                        <div className="space-y-3">
                          {selectedCandidate.interviews.map((interview: any, idx: number) => (
                            <div key={idx} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium">{interview.type}</h5>
                                <Badge className={interview.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                                  {interview.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                {new Date(interview.date).toLocaleDateString()} at {new Date(interview.date).toLocaleTimeString()}
                              </div>
                            </div>
                          ))}
                          
                          {selectedCandidate.interviews.length === 0 && (
                            <p className="text-gray-500 text-center py-8">No interviews scheduled</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="resume">
                      <div className="text-center py-12">
                        <Download className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg mb-2">Resume</h3>
                        <p className="text-gray-600 mb-4">View the candidate's resume and portfolio</p>
                        <Button>
                          <Download className="w-4 h-4 mr-2" />
                          Download Resume
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}