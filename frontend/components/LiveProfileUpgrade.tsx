import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, Search, TrendingUp, Crown, Zap, Plus, Play, ChevronDown, Award, Target, Users, Database, BarChart3, Brain, ChartBar, ArrowRight, Bot } from 'lucide-react';

interface LiveProfileUpgradeProps {
  onClose: () => void;
  currentQueue?: {
    title: string;
    current: number;
    total: number;
  };
  userQueues?: string[];
}

export function LiveProfileUpgrade({ onClose, currentQueue, userQueues = ['data-engineer', 'senior-analyst', 'machine-learning'] }: LiveProfileUpgradeProps) {
  const [selectedQueue, setSelectedQueue] = useState<any>(currentQueue || null);
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [step, setStep] = useState<'queue-selection' | 'upgrades'>(currentQueue ? 'upgrades' : 'queue-selection');

  // Available queues for selection
  const availableQueues = [
    { 
      id: 'data-engineer',
      title: 'Data Engineer Queue', 
      description: 'Advanced data pipeline and infrastructure roles',
      current: 87, 
      total: 255, 
      trend: 'up',
      icon: Database,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      match: 92,
      change: 8,
      isAuto: false
    },
    { 
      id: 'senior-analyst',
      title: 'Senior Data Analyst', 
      description: 'Leadership roles in analytics and business intelligence',
      current: 45, 
      total: 180, 
      trend: 'up',
      icon: BarChart3,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      match: 88,
      change: 12,
      isAuto: false
    },
    { 
      id: 'machine-learning',
      title: 'ML Engineer Queue', 
      description: 'Machine learning and AI engineering positions',
      current: 23, 
      total: 120, 
      trend: 'stable',
      icon: Brain,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      match: 75,
      change: 0,
      isAuto: false
    },
    { 
      id: 'product-analyst',
      title: 'Product Analyst Queue', 
      description: 'Product-focused analytics and growth roles',
      current: 62, 
      total: 140, 
      trend: 'up',
      icon: Target,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      match: 85,
      change: 15,
      isAuto: true,
      reason: 'Based on your business analytics skills and experience with stakeholder collaboration'
    },
    { 
      id: 'business-intelligence',
      title: 'BI Developer Queue', 
      description: 'Business intelligence and reporting solutions',
      current: 34, 
      total: 95, 
      trend: 'up',
      icon: ChartBar,
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
      match: 90,
      change: 6,
      isAuto: true,
      reason: 'Perfect match for your Tableau expertise and financial services background'
    }
  ];

  // Queue-specific upgrade options
  const getUpgradeOptionsForQueue = (queueId: string) => {
    const baseOptions = [
      {
        id: 'linkedin-optimization',
        title: 'LinkedIn Profile Optimization',
        category: 'Profile',
        impact: '+5 positions',
        cost: 'Free',
        timeToComplete: '2 days',
        description: 'Professional LinkedIn profile with keywords',
        relevantQueues: ['all']
      },
      {
        id: 'github-contributions',
        title: 'Active GitHub Contributions',
        category: 'Profile',
        impact: '+6 positions',
        cost: 'Free',
        timeToComplete: '1 month',
        description: 'Regular open source contributions',
        relevantQueues: ['all']
      }
    ];

    const queueSpecificOptions = {
      'data-engineer': [
        {
          id: 'aws-cert',
          title: 'AWS Data Engineer Certification',
          category: 'Certification',
          impact: '+18 positions',
          cost: '$300',
          timeToComplete: '3 weeks',
          description: 'AWS Certified Data Engineer - Associate certification'
        },
        {
          id: 'spark-expertise',
          title: 'Apache Spark Expertise',
          category: 'Skill',
          impact: '+12 positions',
          cost: 'Free',
          timeToComplete: '2 weeks',
          description: 'Advanced Apache Spark for big data processing'
        },
        {
          id: 'data-pipeline-project',
          title: 'End-to-End Data Pipeline Project',
          category: 'Project',
          impact: '+15 positions',
          cost: 'Free',
          timeToComplete: '4 weeks',
          description: 'Real-time data pipeline with streaming and batch processing'
        },
        {
          id: 'kubernetes-cert',
          title: 'Kubernetes Administrator Certification',
          category: 'Certification',
          impact: '+10 positions',
          cost: '$375',
          timeToComplete: '3 weeks',
          description: 'CKA certification for container orchestration'
        }
      ],
      'senior-analyst': [
        {
          id: 'tableau-cert',
          title: 'Tableau Desktop Specialist Certification',
          category: 'Certification',
          impact: '+14 positions',
          cost: '$100',
          timeToComplete: '2 weeks',
          description: 'Official Tableau Desktop Specialist certification'
        },
        {
          id: 'advanced-sql',
          title: 'Advanced SQL & Database Design',
          category: 'Skill',
          impact: '+10 positions',
          cost: 'Free',
          timeToComplete: '2 weeks',
          description: 'Complex queries, optimization, and database design'
        },
        {
          id: 'business-case-project',
          title: 'Executive Dashboard Project',
          category: 'Project',
          impact: '+12 positions',
          cost: 'Free',
          timeToComplete: '3 weeks',
          description: 'Executive-level dashboard with KPI tracking and insights'
        },
        {
          id: 'leadership-training',
          title: 'Data Team Leadership Course',
          category: 'Skill',
          impact: '+8 positions',
          cost: '$500',
          timeToComplete: '4 weeks',
          description: 'Leadership skills for managing analytics teams'
        }
      ],
      'machine-learning': [
        {
          id: 'ml-cert',
          title: 'AWS Machine Learning Specialty',
          category: 'Certification',
          impact: '+20 positions',
          cost: '$300',
          timeToComplete: '4 weeks',
          description: 'AWS Certified Machine Learning - Specialty'
        },
        {
          id: 'deep-learning',
          title: 'Deep Learning Specialization',
          category: 'Skill',
          impact: '+16 positions',
          cost: '$49/month',
          timeToComplete: '3 months',
          description: 'Advanced neural networks and deep learning'
        },
        {
          id: 'ml-production-project',
          title: 'Production ML System Project',
          category: 'Project',
          impact: '+18 positions',
          cost: 'Free',
          timeToComplete: '6 weeks',
          description: 'End-to-end ML system with MLOps and monitoring'
        },
        {
          id: 'research-paper',
          title: 'Published ML Research Paper',
          category: 'Project',
          impact: '+25 positions',
          cost: 'Free',
          timeToComplete: '3 months',
          description: 'Peer-reviewed research publication in ML'
        }
      ],
      'product-analyst': [
        {
          id: 'product-cert',
          title: 'Google Analytics Certification',
          category: 'Certification',
          impact: '+12 positions',
          cost: 'Free',
          timeToComplete: '2 weeks',
          description: 'Google Analytics Individual Qualification'
        },
        {
          id: 'ab-testing',
          title: 'A/B Testing & Experimentation',
          category: 'Skill',
          impact: '+14 positions',
          cost: '$200',
          timeToComplete: '3 weeks',
          description: 'Statistical methods for product experimentation'
        },
        {
          id: 'product-metrics-project',
          title: 'Product Metrics Dashboard',
          category: 'Project',
          impact: '+10 positions',
          cost: 'Free',
          timeToComplete: '3 weeks',
          description: 'Comprehensive product analytics dashboard'
        },
        {
          id: 'cohort-analysis',
          title: 'Advanced Cohort Analysis',
          category: 'Skill',
          impact: '+8 positions',
          cost: 'Free',
          timeToComplete: '1 week',
          description: 'User retention and cohort analysis techniques'
        }
      ],
      'business-intelligence': [
        {
          id: 'power-bi-cert',
          title: 'Microsoft Power BI Data Analyst',
          category: 'Certification',
          impact: '+16 positions',
          cost: '$165',
          timeToComplete: '3 weeks',
          description: 'Microsoft Certified: Power BI Data Analyst Associate'
        },
        {
          id: 'data-modeling',
          title: 'Advanced Data Modeling',
          category: 'Skill',
          impact: '+12 positions',
          cost: 'Free',
          timeToComplete: '2 weeks',
          description: 'Dimensional modeling and data warehouse design'
        },
        {
          id: 'etl-project',
          title: 'Enterprise ETL Solution',
          category: 'Project',
          impact: '+14 positions',
          cost: 'Free',
          timeToComplete: '4 weeks',
          description: 'Complex ETL pipeline for enterprise data warehouse'
        },
        {
          id: 'financial-reporting',
          title: 'Financial Reporting Automation',
          category: 'Project',
          impact: '+10 positions',
          cost: 'Free',
          timeToComplete: '3 weeks',
          description: 'Automated financial reporting system'
        }
      ]
    };

    const queueOptions = queueSpecificOptions[queueId] || [];
    return [...baseOptions, ...queueOptions];
  };

  const upgradeOptions = selectedQueue ? getUpgradeOptionsForQueue(selectedQueue.id) : [];

  const categories = ['all', 'Certification', 'Skill', 'Project', 'Profile', 'Education'];

  const filteredUpgrades = upgradeOptions.filter(upgrade => {
    const matchesSearch = upgrade.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         upgrade.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || upgrade.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleUpgrade = (upgradeId: string) => {
    setSelectedUpgrades(prev => 
      prev.includes(upgradeId) 
        ? prev.filter(id => id !== upgradeId)
        : [...prev, upgradeId]
    );
  };

  const calculateImpact = () => {
    if (!selectedQueue) return null;
    
    const totalPositionGain = selectedUpgrades.reduce((total, upgradeId) => {
      const upgrade = upgradeOptions.find(u => u.id === upgradeId);
      if (upgrade) {
        const positions = parseInt(upgrade.impact.replace(/\D/g, ''));
        return total + positions;
      }
      return total;
    }, 0);

    const newPosition = Math.max(1, selectedQueue.current - totalPositionGain);
    const newPercentage = Math.round((newPosition / selectedQueue.total) * 100);
    const currentPercentage = Math.round((selectedQueue.current / selectedQueue.total) * 100);

    return {
      currentPosition: selectedQueue.current,
      newPosition,
      positionImprovement: totalPositionGain,
      currentPercentage: `Top ${currentPercentage}%`,
      newPercentage: `Top ${newPercentage}%`,
      estimatedTimeToInterview: Math.max(3, 14 - Math.floor(totalPositionGain / 3))
    };
  };

  const runSimulation = async () => {
    setIsRunning(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const impact = calculateImpact();
    setResults(impact);
    setIsRunning(false);
  };

  const handleQueueSelect = (queue: any) => {
    setSelectedQueue(queue);
    setStep('upgrades');
    setSelectedUpgrades([]); // Reset selected upgrades
    setResults(null); // Reset results
  };

  const handleBackToQueueSelection = () => {
    setStep('queue-selection');
    setSelectedQueue(null);
    setSelectedUpgrades([]);
    setResults(null);
  };

  const impact = calculateImpact();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-[#e2ddd9] w-full max-w-7xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[rgba(15,9,12,0.56)] backdrop-blur-[80px] px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-medium text-white">
                <span className="text-white">the</span>
                <span className="text-[#ff6b35]">Garage</span>
              </h1>
            </div>
            <div className="h-8 w-px bg-white/20 mx-4"></div>
            <div>
              <h2 className="text-xl text-white font-medium">
                {step === 'queue-selection' ? 'Select Queue for Profile Upgrade' : 'Live Profile Upgrade Checker'}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">Premium Feature</span>
                {selectedQueue && (
                  <>
                    <span className="text-white/60">•</span>
                    <span className="text-sm text-white/80">{selectedQueue.title}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {step === 'upgrades' && (
              <Button 
                variant="outline" 
                onClick={handleBackToQueueSelection}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                ← Back to Queue Selection
              </Button>
            )}
            <Button variant="outline" onClick={onClose} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {step === 'queue-selection' ? (
            /* Queue Selection Step */
            <div className="p-8 overflow-y-auto h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-medium text-gray-900 mb-3">Choose a Queue to Optimize</h3>
                <p className="text-gray-600 mb-6">Select which queue you'd like to see personalized upgrade recommendations for.</p>
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {availableQueues.filter(queue => userQueues.includes(queue.id)).map((queue) => {
                  const IconComponent = queue.icon;
                  return (
                    <Card 
                      key={queue.id}
                      className="group p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 ring-1 ring-transparent hover:ring-orange-200/50 bg-white/80 backdrop-blur-sm hover:border-orange-200 border-gray-100"
                      onClick={() => handleQueueSelect(queue)}
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className={`w-14 h-14 ${queue.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex items-center gap-2">
                            {queue.isAuto && (
                              <Bot className="w-4 h-4 text-blue-500" title="Auto-selected by AI" />
                            )}
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#ff6b35] transition-colors" />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 group-hover:text-[#ff6b35] transition-colors">{queue.title}</h3>
                            {queue.isAuto && (
                              <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                                AI Selected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mb-3 leading-relaxed">{queue.description}</p>
                          
                          {queue.isAuto && queue.reason && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
                              <p className="text-xs text-blue-700">{queue.reason}</p>
                            </div>
                          )}
                          
                          <div className="mb-3">
                            <div className="flex items-baseline gap-1 mb-2">
                              <span className="text-2xl font-medium text-gray-900">#{queue.current}</span>
                              <span className="text-sm text-gray-500">of {queue.total}</span>
                              <div className="ml-auto flex items-center gap-2">
                                <Badge className={`text-xs ${
                                  queue.match >= 90 ? 'bg-green-100 text-green-800' :
                                  queue.match >= 80 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-orange-100 text-orange-800'
                                }`}>
                                  {queue.match}% match
                                </Badge>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42]"
                                style={{ width: `${(queue.current / queue.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-medium text-green-600">
                              {queue.change > 0 ? '+' : ''}{queue.change}% ↗ vs last month
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Upgrade Options Step */
            <div className="flex">
              {/* Left Panel - Upgrade Options */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-medium text-gray-900 mb-3">
                    Upgrade Options for {selectedQueue?.title}
                  </h3>
                  <p className="text-gray-600 mb-4">Select profile enhancements to see their impact on your queue position</p>
                  
                  {/* Search and Filter */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Search for enhancements..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white border-gray-200"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48 bg-white">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Upgrade Options */}
                <div className="space-y-4">
                  {filteredUpgrades.map((upgrade) => (
                    <Card 
                      key={upgrade.id}
                      className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                        selectedUpgrades.includes(upgrade.id) 
                          ? 'border-[#ff6b35] bg-orange-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => toggleUpgrade(upgrade.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                              selectedUpgrades.includes(upgrade.id)
                                ? 'bg-[#ff6b35] border-[#ff6b35]'
                                : 'border-gray-300'
                            }`}>
                              {selectedUpgrades.includes(upgrade.id) && (
                                <div className="w-3 h-3 bg-white rounded-sm" />
                              )}
                            </div>
                            <h4 className="font-medium text-gray-900">{upgrade.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {upgrade.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{upgrade.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 font-medium">{upgrade.impact}</span>
                            </div>
                            <span className="text-gray-500">Cost: {upgrade.cost}</span>
                            <span className="text-gray-500">Time: {upgrade.timeToComplete}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Right Panel - Impact Preview */}
              <div className="w-96 bg-white/50 backdrop-blur-sm border-l border-gray-200 p-6">
                <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Impact Preview</h3>
                  
                  {selectedUpgrades.length > 0 && impact ? (
                    <div className="space-y-4">
                      {/* Current vs New Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-medium text-gray-900 mb-1">{impact.currentPosition}</div>
                          <div className="text-xs text-gray-500 mb-1">Current Position</div>
                          <div className="text-sm text-gray-600">{impact.currentPercentage}</div>
                        </div>
                        
                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-2xl font-medium text-green-700 mb-1">{impact.newPosition}</div>
                          <div className="text-xs text-gray-500 mb-1">New Position</div>
                          <div className="text-sm text-green-600">{impact.newPercentage}</div>
                        </div>
                      </div>

                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-lg font-medium text-blue-700 mb-1">
                          +{impact.positionImprovement} positions
                        </div>
                        <div className="text-sm text-blue-600">Expected improvement</div>
                      </div>

                      <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-lg font-medium text-purple-700 mb-1">
                          {impact.estimatedTimeToInterview} days
                        </div>
                        <div className="text-sm text-purple-600">Est. time to interview</div>
                      </div>

                      <Button 
                        onClick={runSimulation}
                        disabled={isRunning}
                        className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#e55a2b] hover:to-[#d4461f] text-white"
                      >
                        {isRunning ? (
                          <>
                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                            Running Simulation...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Run Simulation
                          </>
                        )}
                      </Button>

                      {results && (
                        <div className="mt-4 p-4 bg-green-100 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-800 mb-2">Simulation Complete!</h4>
                          <p className="text-sm text-green-700">
                            Your position would improve by {results.positionImprovement} places, 
                            moving you to position {results.newPosition} ({results.newPercentage}).
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">Select profile enhancements to see their impact</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}