import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  Users,
  Calendar,
  Award,
  Target,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';

interface CompanyProfileProps {
  institution: any;
  user: any;
  onBack: () => void;
}

export function CompanyProfile({ institution, user, onBack }: CompanyProfileProps) {
  // Mock company data - in real app this would come from API
  const companyInfo = {
    name: institution?.name || 'TechCorp Solutions',
    description: 'Leading technology company focused on innovation and building cutting-edge solutions for businesses worldwide. We specialize in cloud computing, artificial intelligence, and enterprise software development.',
    website: 'https://techcorp.com',
    industry: 'Technology',
    size: '201-500 employees',
    founded: '2015',
    headquarters: 'San Francisco, CA',
    type: 'Private Company',
    mission: 'To build technology that empowers businesses and transforms industries through innovation and excellence.',
    values: ['Innovation', 'Integrity', 'Excellence', 'Collaboration', 'Customer Focus'],
    achievements: [
      'Best Tech Employer 2023',
      'Inc. 5000 Fastest Growing',
      'Top Workplace Culture Award',
      'Innovation Excellence Award'
    ],
    departments: [
      { name: 'Engineering', count: 45 },
      { name: 'Sales', count: 25 },
      { name: 'Marketing', count: 15 },
      { name: 'Operations', count: 18 },
      { name: 'Human Resources', count: 8 }
    ],
    locations: [
      'San Francisco, CA (HQ)',
      'New York, NY',
      'Austin, TX',
      'Seattle, WA'
    ],
    benefits: [
      'Health, Dental & Vision Insurance',
      'Flexible Work Arrangements',
      '401(k) with Company Match',
      'Professional Development Budget',
      'Unlimited PTO',
      'Stock Options',
      'Wellness Programs',
      'Free Meals & Snacks'
    ]
  };

  const stats = [
    {
      label: 'Total Employees',
      value: '156',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Open Positions',
      value: '23',
      icon: Target,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Departments',
      value: '5',
      icon: Building2,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      label: 'Locations',
      value: '4',
      icon: MapPin,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

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
                <div className="w-10 h-10 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-medium text-gray-900">Company Profile</h1>
                  <p className="text-sm text-gray-500">{companyInfo.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Company Overview */}
        <div className="mb-8">
          <Card className="p-8 bg-gradient-to-r from-white to-orange-50 border-0 shadow-lg">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-xl flex items-center justify-center text-white text-2xl font-medium shadow-lg">
                {companyInfo.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-semibold text-gray-900">{companyInfo.name}</h2>
                  <Badge className="bg-[#ff6b35] text-white">{companyInfo.type}</Badge>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{companyInfo.description}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Founded {companyInfo.founded}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{companyInfo.size}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{companyInfo.headquarters}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] hover:underline flex items-center gap-1">
                      Website <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mission & Values */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#ff6b35]" />
                Mission Statement
              </h3>
              <p className="text-gray-600 leading-relaxed">{companyInfo.mission}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ff6b35]" />
                Company Values
              </h3>
              <div className="flex flex-wrap gap-2">
                {companyInfo.values.map((value, index) => (
                  <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                    {value}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ff6b35]" />
                Recent Achievements
              </h3>
              <div className="space-y-2">
                {companyInfo.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                    <span className="text-gray-600">{achievement}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Departments & Locations */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#ff6b35]" />
                Departments
              </h3>
              <div className="space-y-3">
                {companyInfo.departments.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{dept.name}</span>
                    <Badge variant="secondary">{dept.count} employees</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#ff6b35]" />
                Office Locations
              </h3>
              <div className="space-y-2">
                {companyInfo.locations.map((location, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                    <span className="text-gray-600">{location}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Employee Benefits</h3>
              <div className="grid grid-cols-1 gap-2">
                {companyInfo.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}