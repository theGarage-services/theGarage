import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Search, Database, BarChart3, Brain, Target, ChartBar, Globe, Sparkles, Code, Server, PieChart, TrendingUp, Users, Building2, Zap, Shield, Smartphone, Cpu, Layers, BookOpen, HeartHandshake, X, Check, Star, ArrowRight, Filter, Play, Pause, ArrowLeft } from 'lucide-react';

interface Queue {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  category: string;
  match: number;
  estimatedRank: number;
  totalInQueue: number;
  avgSalary: string;
  demandLevel: 'High' | 'Medium' | 'Low';
  growthRate: string;
  topCompanies: string[];
  requiredSkills: string[];
  timeToHire: string;
}

interface QueueSelectorProps {
  onClose: () => void;
  currentQueues: string[];
  onUpdateQueues: (selectedQueues: string[]) => void;
  queueStatuses?: Record<string, boolean>;
  onUpdateQueueStatuses?: (statuses: Record<string, boolean>) => void;
}

export function QueueSelector({ onClose, currentQueues, onUpdateQueues, queueStatuses = {}, onUpdateQueueStatuses }: QueueSelectorProps) {
  const [selectedQueues, setSelectedQueues] = useState<string[]>(currentQueues.filter(id => !['product-analyst', 'business-intelligence'].includes(id)));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [localQueueStatuses, setLocalQueueStatuses] = useState<Record<string, boolean>>(queueStatuses);

  // Available queues to choose from
  const availableQueues: Queue[] = [
    {
      id: 'data-engineer',
      title: 'Data Engineer',
      description: 'Advanced data pipeline and infrastructure roles',
      icon: Database,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      category: 'Engineering',
      match: 92,
      estimatedRank: 87,
      totalInQueue: 255,
      avgSalary: '$105K - $145K',
      demandLevel: 'High',
      growthRate: '+15%',
      topCompanies: ['Shopify', 'Square', 'Databricks'],
      requiredSkills: ['Python', 'SQL', 'Apache Spark', 'AWS'],
      timeToHire: '2-4 weeks'
    },
    {
      id: 'senior-analyst',
      title: 'Senior Data Analyst',
      description: 'Leadership roles in analytics and business intelligence',
      icon: BarChart3,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      category: 'Analytics',
      match: 88,
      estimatedRank: 45,
      totalInQueue: 180,
      avgSalary: '$85K - $115K',
      demandLevel: 'High',
      growthRate: '+12%',
      topCompanies: ['RBC', 'Scotiabank', 'Manulife'],
      requiredSkills: ['SQL', 'Tableau', 'Python', 'Statistics'],
      timeToHire: '3-5 weeks'
    },
    {
      id: 'machine-learning',
      title: 'ML Engineer',
      description: 'Machine learning and AI engineering positions',
      icon: Brain,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      category: 'AI/ML',
      match: 75,
      estimatedRank: 123,
      totalInQueue: 220,
      avgSalary: '$120K - $170K',
      demandLevel: 'High',
      growthRate: '+25%',
      topCompanies: ['Meta', 'Google', 'OpenAI'],
      requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
      timeToHire: '4-8 weeks'
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      description: 'Advanced analytics and statistical modeling',
      icon: Sparkles,
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
      category: 'Science',
      match: 82,
      estimatedRank: 67,
      totalInQueue: 195,
      avgSalary: '$110K - $155K',
      demandLevel: 'High',
      growthRate: '+18%',
      topCompanies: ['Netflix', 'Uber', 'Airbnb'],
      requiredSkills: ['Python', 'R', 'Machine Learning', 'Statistics'],
      timeToHire: '3-6 weeks'
    },
    {
      id: 'cloud-engineer',
      title: 'Cloud Solutions Engineer',
      description: 'Cloud architecture and DevOps roles',
      icon: Globe,
      color: 'bg-gradient-to-r from-sky-500 to-sky-600',
      category: 'Cloud',
      match: 78,
      estimatedRank: 95,
      totalInQueue: 165,
      avgSalary: '$100K - $140K',
      demandLevel: 'High',
      growthRate: '+20%',
      topCompanies: ['Amazon', 'Microsoft', 'Google Cloud'],
      requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      timeToHire: '2-5 weeks'
    },
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      description: 'Full-stack and backend development roles',
      icon: Code,
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      category: 'Engineering',
      match: 70,
      estimatedRank: 156,
      totalInQueue: 320,
      avgSalary: '$95K - $135K',
      demandLevel: 'High',
      growthRate: '+14%',
      topCompanies: ['Shopify', 'Stripe', 'GitHub'],
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL'],
      timeToHire: '3-7 weeks'
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      description: 'Infrastructure automation and deployment',
      icon: Server,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      category: 'Operations',
      match: 73,
      estimatedRank: 112,
      totalInQueue: 140,
      avgSalary: '$105K - $145K',
      demandLevel: 'High',
      growthRate: '+22%',
      topCompanies: ['HashiCorp', 'Docker', 'GitLab'],
      requiredSkills: ['CI/CD', 'Docker', 'Kubernetes', 'Jenkins'],
      timeToHire: '2-4 weeks'
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      description: 'Product strategy and roadmap development',
      icon: Target,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      category: 'Product',
      match: 65,
      estimatedRank: 98,
      totalInQueue: 155,
      avgSalary: '$110K - $160K',
      demandLevel: 'Medium',
      growthRate: '+10%',
      topCompanies: ['Spotify', 'Slack', 'Zoom'],
      requiredSkills: ['Product Strategy', 'Analytics', 'Agile', 'User Research'],
      timeToHire: '4-8 weeks'
    },
    {
      id: 'business-analyst',
      title: 'Business Analyst',
      description: 'Business process analysis and optimization',
      icon: PieChart,
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
      category: 'Analytics',
      match: 85,
      estimatedRank: 42,
      totalInQueue: 125,
      avgSalary: '$75K - $105K',
      demandLevel: 'Medium',
      growthRate: '+8%',
      topCompanies: ['Accenture', 'PwC', 'EY'],
      requiredSkills: ['Business Analysis', 'SQL', 'Excel', 'Process Mapping'],
      timeToHire: '2-4 weeks'
    },
    {
      id: 'security-analyst',
      title: 'Security Analyst',
      description: 'Cybersecurity and threat analysis',
      icon: Shield,
      color: 'bg-gradient-to-r from-gray-600 to-gray-700',
      category: 'Security',
      match: 68,
      estimatedRank: 134,
      totalInQueue: 180,
      avgSalary: '$90K - $125K',
      demandLevel: 'High',
      growthRate: '+28%',
      topCompanies: ['CrowdStrike', 'Palo Alto', 'FireEye'],
      requiredSkills: ['SIEM', 'Incident Response', 'Risk Assessment', 'Compliance'],
      timeToHire: '3-6 weeks'
    },
    {
      id: 'mobile-developer',
      title: 'Mobile Developer',
      description: 'iOS and Android application development',
      icon: Smartphone,
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      category: 'Development',
      match: 62,
      estimatedRank: 167,
      totalInQueue: 200,
      avgSalary: '$90K - $130K',
      demandLevel: 'Medium',
      growthRate: '+12%',
      topCompanies: ['Uber', 'Instagram', 'TikTok'],
      requiredSkills: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
      timeToHire: '3-5 weeks'
    },
    {
      id: 'systems-architect',
      title: 'Systems Architect',
      description: 'Enterprise system design and architecture',
      icon: Cpu,
      color: 'bg-gradient-to-r from-violet-500 to-violet-600',
      category: 'Architecture',
      match: 71,
      estimatedRank: 89,
      totalInQueue: 110,
      avgSalary: '$130K - $180K',
      demandLevel: 'Medium',
      growthRate: '+16%',
      topCompanies: ['IBM', 'Oracle', 'SAP'],
      requiredSkills: ['System Design', 'Enterprise Architecture', 'Cloud Platforms', 'Integration'],
      timeToHire: '4-10 weeks'
    },
    {
      id: 'frontend-developer',
      title: 'Frontend Developer',
      description: 'User interface and experience development',
      icon: Layers,
      color: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
      category: 'Development',
      match: 67,
      estimatedRank: 145,
      totalInQueue: 240,
      avgSalary: '$85K - $120K',
      demandLevel: 'High',
      growthRate: '+18%',
      topCompanies: ['Meta', 'Netflix', 'Airbnb'],
      requiredSkills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
      timeToHire: '2-4 weeks'
    }
  ];

  const categories = ['All', 'Engineering', 'Analytics', 'AI/ML', 'Science', 'Cloud', 'Operations', 'Product', 'Security', 'Development', 'Architecture'];

  const filteredQueues = availableQueues.filter(queue => {
    const matchesSearch = queue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         queue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         queue.requiredSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || queue.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleQueueToggle = (queueId: string) => {
    if (selectedQueues.includes(queueId)) {
      setSelectedQueues(selectedQueues.filter(id => id !== queueId));
    } else if (selectedQueues.length < 3) {
      setSelectedQueues([...selectedQueues, queueId]);
    }
  };

  const handleSave = () => {
    // Combine selected manual queues with auto-selected queues
    const allQueues = [...selectedQueues, 'product-analyst', 'business-intelligence'];
    onUpdateQueues(allQueues);
    
    // Update queue statuses if callback provided
    if (onUpdateQueueStatuses) {
      onUpdateQueueStatuses(localQueueStatuses);
    }
    
    onClose();
  };

  const handleStatusToggle = (queueId: string, isActive: boolean) => {
    setLocalQueueStatuses(prev => ({
      ...prev,
      [queueId]: isActive
    }));
  };

  const getRankColor = (rank: number, total: number) => {
    const percentage = (rank / total) * 100;
    if (percentage <= 25) return 'text-green-600';
    if (percentage <= 50) return 'text-yellow-600';
    if (percentage <= 75) return 'text-orange-600';
    return 'text-red-600';
  };

  const getMatchColor = (match: number) => {
    if (match >= 85) return 'bg-green-100 text-green-800';
    if (match >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - Full page header */}
      <div className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-medium">Manage Your Job Queues</h1>
              <p className="text-orange-100 text-lg mt-1">
                Select 3 manual queues that match your career goals and manage your activity status.
              </p>
            </div>
          </div>
          <p className="text-orange-100">
            See your estimated ranking and set whether you're open for opportunities.
          </p>
        </div>
      </div>

      {/* Content wrapper with full page layout */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search queues, skills, or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex gap-1 overflow-x-auto">
              {categories.map(category => (
                <Button
                  key={category}
                  size="sm"
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-[#ff6b35] hover:bg-[#e55a2b] px-4 py-2" : "px-4 py-2"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Count and Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={`${selectedQueues.length === 3 ? 'border-green-500 text-green-700 bg-green-50' : 'border-orange-500 text-orange-700 bg-orange-50'} px-3 py-1`}>
                {selectedQueues.length}/3 manual queues selected
              </Badge>
              {selectedQueues.length === 3 && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Ready to save
                </span>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              {filteredQueues.length} queues available
            </div>
          </div>
          
          <div className="text-sm text-blue-700">
            <strong>Queue Status:</strong> Use the toggles to set whether you're actively looking for opportunities in each queue. 
            You'll maintain your ranking but won't be considered for roles when inactive.
          </div>
        </div>

        {/* Queue Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredQueues.map((queue) => {
              const IconComponent = queue.icon;
              const isSelected = selectedQueues.includes(queue.id);
              const canSelect = selectedQueues.length < 3 || isSelected;
              const queueStatus = localQueueStatuses[queue.id] ?? true; // Default to active
              
              return (
                <Card 
                  key={queue.id}
                  className={`p-5 transition-all duration-200 border-2 ${
                    isSelected 
                      ? 'border-[#ff6b35] bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-lg' 
                      : canSelect 
                        ? 'border-gray-200 hover:border-orange-300 hover:shadow-md cursor-pointer' 
                        : 'border-gray-100 opacity-50'
                  }`}
                >
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${queue.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      {isSelected && (
                        <div className="w-6 h-6 bg-[#ff6b35] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <Badge className={getMatchColor(queue.match)}>
                        {queue.match}% match
                      </Badge>
                    </div>
                  </div>

                  {/* Queue Selection */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => canSelect && handleQueueToggle(queue.id)}
                  >
                    <div className="mb-4">
                      <h3 className={`font-medium mb-2 ${isSelected ? 'text-[#ff6b35]' : 'text-gray-900'}`}>
                        {queue.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{queue.description}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {queue.category}
                        </Badge>
                        <Badge className={`text-xs ${queue.demandLevel === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {queue.demandLevel} demand
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Status Toggle Section */}
                  {(isSelected || selectedQueues.includes(queue.id)) && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {queueStatus ? (
                            <Play className="w-4 h-4 text-green-600" />
                          ) : (
                            <Pause className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="text-sm font-medium">
                            {queueStatus ? 'Open for roles' : 'Not open for roles'}
                          </span>
                        </div>
                        <Switch
                          checked={queueStatus}
                          onCheckedChange={(checked) => handleStatusToggle(queue.id, checked)}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {queueStatus 
                          ? 'You\'ll be considered for job opportunities in this queue'
                          : 'You\'ll maintain your ranking but won\'t receive job offers'
                        }
                      </p>
                    </div>
                  )}

                  {/* Ranking Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Estimated rank:</span>
                      <span className={`text-sm font-medium ${getRankColor(queue.estimatedRank, queue.totalInQueue)}`}>
                        #{queue.estimatedRank} of {queue.totalInQueue}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                      <div 
                        className={`h-1.5 rounded-full ${
                          queue.estimatedRank / queue.totalInQueue <= 0.25 ? 'bg-green-500' :
                          queue.estimatedRank / queue.totalInQueue <= 0.5 ? 'bg-yellow-500' :
                          queue.estimatedRank / queue.totalInQueue <= 0.75 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${100 - (queue.estimatedRank / queue.totalInQueue) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{queue.avgSalary}</span>
                      <span className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-3 h-3" />
                        {queue.growthRate}
                      </span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Users className="w-3 h-3" />
                      <span>Avg. time to hire: {queue.timeToHire}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {queue.requiredSkills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {queue.requiredSkills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{queue.requiredSkills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200 gap-4">
          <div className="text-sm text-gray-600 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Auto-selected queues (Product Analyst, BI Developer) will remain active</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">These queues are recommended by AI based on your profile</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="px-6">
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={selectedQueues.length !== 3}
              className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#e55a2b] hover:to-[#d4461f] text-white px-6"
            >
              <Check className="w-4 h-4 mr-2" />
              Update My Queues & Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}