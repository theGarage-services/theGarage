import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, Play, Check, Star, Users, Target, BarChart3, Crown, Zap, Database, Brain, ChartBar, TrendingUp, CheckCircle, Quote, Menu, X, Building, MapPin, DollarSign, Clock, User, Building2, UserCheck, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DualPerspectiveDemo } from './DualPerspectiveDemo';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: Target,
      title: "Smart Queue System",
      description: "Job seekers get placed in AI-powered queues while recruiters access organized candidate pools.",
      highlight: "AI-Powered Matching",
      forBoth: true
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track your job search progress or monitor hiring pipeline performance with detailed insights.",
      highlight: "Data-Driven Decisions",
      forBoth: true
    },
    {
      icon: Users,
      title: "Dual Perspective Platform",
      description: "Seamlessly switch between job seeker and recruiter views on the same unified platform.",
      highlight: "Unique Approach",
      forBoth: true
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Job seekers see queue rankings while recruiters track hiring metrics and candidate engagement.",
      highlight: "Competitive Edge",
      forBoth: true
    },
    {
      icon: Database,
      title: "Advanced Organization",
      description: "Kanban boards for application tracking (job seekers) and candidate pipeline management (recruiters).",
      highlight: "Visual Organization",
      forBoth: true
    },
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description: "Get career guidance and skill suggestions, or receive candidate matching and sourcing insights.",
      highlight: "Smart Guidance",
      forBoth: true
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Data Scientist at Google",
      avatar: "SC",
      quote: "theGarage's queue system helped me understand exactly where I stood in the hiring process. The live upgrade checker showed me I needed AWS certification - got it and moved from #87 to #23 in the Data Engineer queue!",
      highlight: "64 position jump"
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Product Manager at Netflix",
      avatar: "MR", 
      quote: "Finally, a job tracker that works for both sides. As someone who's been both a candidate and a hiring manager, theGarage bridges that gap perfectly. The dual perspective is game-changing.",
      highlight: "Recruiter + Candidate"
    },
    {
      name: "Emily Zhang",
      role: "ML Engineer at OpenAI",
      avatar: "EZ",
      quote: "The AI-selected queues were spot on - they found opportunities I never would have considered. The queue leaderboards kept me motivated throughout my job search.",
      highlight: "AI Success Story"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Job Seekers", icon: Users },
    { number: "15K+", label: "Partner Companies", icon: Building },
    { number: "89%", label: "Interview Success Rate", icon: TrendingUp },
    { number: "2.3x", label: "Faster Job Placement", icon: Clock }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with job tracking",
      features: [
        "Basic job application tracking",
        "3 manual queue selections", 
        "Standard filtering and search",
        "Mobile app access",
        "Email notifications"
      ],
      buttonText: "Get Started Free",
      isPopular: false
    },
    {
      name: "Premium",
      price: "$29",
      period: "per month",
      description: "Advanced features for serious job seekers",
      features: [
        "Everything in Free",
        "5 total queues (3 manual + 2 AI-selected)",
        "Live Profile Upgrade Checker",
        "Queue Leaderboards & Analytics",
        "Career change recommendations",
        "Priority support",
        "Advanced filtering & insights"
      ],
      buttonText: "Start Premium Trial",
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "per month",
      description: "For teams and recruitment agencies",
      features: [
        "Everything in Premium",
        "Recruiter dashboard access",
        "Bulk candidate management",
        "Custom queue configurations", 
        "Advanced analytics & reporting",
        "Dedicated account manager",
        "API access"
      ],
      buttonText: "Contact Sales",
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-medium">
                <span className="text-gray-900">the</span>
                <span className="text-[#ff6b35]">Garage</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-[#ff6b35] transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-[#ff6b35] transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-[#ff6b35] transition-colors">Reviews</a>
              <a href="#contact" className="text-gray-600 hover:text-[#ff6b35] transition-colors">Contact</a>
              
              <div className="flex items-center gap-3 ml-4">
                <Button variant="ghost" onClick={onLogin} className="text-gray-600 hover:text-[#ff6b35]">
                  Sign In
                </Button>
                <Button 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#e55a2b] hover:to-[#d4461f] text-white"
                >
                  Get Started Free
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#ff6b35]"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-600 hover:text-[#ff6b35] transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-[#ff6b35] transition-colors">Pricing</a>
                <a href="#testimonials" className="text-gray-600 hover:text-[#ff6b35] transition-colors">Reviews</a>
                <a href="#contact" className="text-gray-600 hover:text-[#ff6b35] transition-colors">Contact</a>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="ghost" onClick={onLogin} className="justify-start">
                    Sign In
                  </Button>
                  <Button 
                    onClick={onGetStarted}
                    className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#e55a2b] hover:to-[#d4461f] text-white justify-start"
                  >
                    Get Started Free
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
              🚀 For Job Seekers & Recruiters
            </Badge>
            <h1 className="text-4xl md:text-6xl font-medium text-gray-900 mb-6 leading-tight">
              The dual-perspective platform that
              <span className="block text-[#ff6b35]">connects talent</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              Whether you're looking for your next opportunity or searching for top talent, 
              theGarage's AI-powered platform helps you succeed faster with smart queues and real-time insights.
            </p>
            <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span>89,234+ Job Seekers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-[#ff6b35]" />
                </div>
                <span>8,456+ Recruiters</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#e55a2b] hover:to-[#d4461f] text-white px-8 py-4 text-lg"
            >
              Start Tracking Jobs Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => setShowDemo(true)}
              className="border-2 border-gray-300 hover:border-[#ff6b35] hover:text-[#ff6b35] px-8 py-4 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <IconComponent className="w-5 h-5 text-[#ff6b35] mr-2" />
                    <div className="text-3xl font-medium text-gray-900">{stat.number}</div>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dual Perspective Demo Modal */}
      {showDemo && (
        <DualPerspectiveDemo
          onBack={() => setShowDemo(false)}
          onNavigate={() => {}} // No navigation needed from landing page
          user={null} // No user when viewing from landing page
          onLogout={() => {}} // No logout needed from landing page
        />
      )}

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
              Everything you need to 
              <span className="text-[#ff6b35]"> win your job search</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              theGarage combines intelligent automation with detailed tracking to give you the competitive edge in today's job market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {feature.isPremium && (
                      <Crown className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                    <span className="text-sm font-medium text-[#ff6b35]">{feature.highlight}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dual-Perspective Platform Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
              Powered by <span className="text-black">the</span><span className="text-[#ff6b35]">Garage</span> Dual-Perspective Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience hiring from both angles - discover opportunities as a job seeker and understand the recruiter perspective that makes hiring successful.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Job Seeker Perspective */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Job Seeker View</h3>
                  <p className="text-blue-700">Your perspective</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Join professional queues by expertise</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Get discovered by relevant recruiters</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Track applications with real-time updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Receive personalized job recommendations</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Active job seekers</span>
                  <span className="font-medium text-blue-700">89,234+</span>
                </div>
              </div>
            </Card>

            {/* Recruiter Perspective */}
            <Card className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-xl flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Recruiter View</h3>
                  <p className="text-[#ff6b35]">Understanding their experience</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[#ff6b35]" />
                  <span className="text-gray-700">Access pre-qualified candidate queues</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[#ff6b35]" />
                  <span className="text-gray-700">AI-powered candidate matching & ranking</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[#ff6b35]" />
                  <span className="text-gray-700">Direct candidate communication & scheduling</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[#ff6b35]" />
                  <span className="text-gray-700">Comprehensive hiring analytics & insights</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Active recruiters</span>
                  <span className="font-medium text-[#ff6b35]">8,456+</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Platform Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-medium text-gray-900 mb-2">28.4%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
              <div className="text-xs text-green-600 mt-1">Above industry avg</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-medium text-gray-900 mb-2">16 days</div>
              <div className="text-sm text-gray-600">Avg Time to Hire</div>
              <div className="text-xs text-green-600 mt-1">25% faster</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-medium text-gray-900 mb-2">4.8/5.0</div>
              <div className="text-sm text-gray-600">Platform Rating</div>
              <div className="text-xs text-green-600 mt-1">Highly rated</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-medium text-gray-900 mb-2">95%</div>
              <div className="text-sm text-gray-600">User Retention</div>
              <div className="text-xs text-green-600 mt-1">Platform loyalty</div>
            </div>
          </div>
          
          {/* Call to Action - Platform Insights */}
          <Card className="p-8 bg-gradient-to-r from-gray-50 to-orange-50 border-orange-200 text-center">
            <h3 className="text-2xl font-medium text-gray-900 mb-4">Explore Platform Insights</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Discover comprehensive analytics, success stories, and real-time metrics that showcase theGarage's impact on modern hiring.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
              <Button 
                onClick={() => window.open('#', '_blank')}
                className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Platform Overview
              </Button>
              <Button 
                onClick={() => window.open('#', '_blank')}
                variant="outline" 
                className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white"
              >
                <Award className="w-4 h-4 mr-2" />
                Success Stories
              </Button>
              <Button 
                onClick={() => window.open('#', '_blank')}
                variant="outline" 
                className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Live Metrics
              </Button>
            </div>
            
            <p className="text-gray-600 mb-6">Choose your path and get started in minutes</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onGetStarted}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3"
              >
                Start as Job Seeker
              </Button>
              <Button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#e55a2b] hover:to-[#d4461f] text-white px-8 py-3"
              >
                Start as Recruiter
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
              Loved by job seekers <span className="text-[#ff6b35]">everywhere</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-600 ml-2">4.9/5 from 2,847 reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-full flex items-center justify-center text-white font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                
                <Quote className="w-8 h-8 text-[#ff6b35] mb-4" />
                <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.quote}</p>
                
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">{testimonial.highlight}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
              Simple, transparent <span className="text-[#ff6b35]">pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade when you're ready for advanced features. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`p-8 relative ${plan.isPopular ? 'border-2 border-[#ff6b35] shadow-xl' : ''}`}>
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#ff6b35] text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-4xl font-medium text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={onGetStarted}
                  className={`w-full ${plan.isPopular 
                    ? 'bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#e55a2b] hover:to-[#d4461f] text-white' 
                    : 'border-2 border-gray-300 hover:border-[#ff6b35] hover:text-[#ff6b35]'
                  }`}
                  variant={plan.isPopular ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">
            Ready to revolutionize your job search?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful job seekers who are using theGarage to land their dream roles faster than ever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-[#ff6b35] hover:bg-gray-50 px-8 py-4 text-lg font-medium"
            >
              Start Your Free Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-[#ff6b35] px-8 py-4 text-lg"
            >
              Talk to Sales
            </Button>
          </div>

          <p className="text-white/80 text-sm mt-6">
            Free forever plan available • No credit card required • Setup in 2 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-medium">
                  <span className="text-white">the</span>
                  <span className="text-[#ff6b35]">Garage</span>
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The intelligent job tracking platform that helps you land your dream role faster with AI-powered queues and real-time insights.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="text-gray-400 border-gray-700 hover:text-white hover:border-white">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="text-gray-400 border-gray-700 hover:text-white hover:border-white">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="text-gray-400 border-gray-700 hover:text-white hover:border-white">
                  GitHub
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 theGarage. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}