import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { AccessRestriction } from './AccessRestriction';
import { 
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  Users,
  FileText,
  Shield,
  Mail,
  Phone,
  Calendar,
  Save,
  Upload,
  Settings,
  Briefcase,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface InstitutionManagementProps {
  institution: any;
  user: any;
  onBack: () => void;
}

export function InstitutionManagement({ institution, user, onBack }: InstitutionManagementProps) {
  // Check if user is admin
  const isUserAdmin = user?.role === 'admin' || user?.isInstitutionCreator || user?.isInstitutionAdmin;

  const [activeTab, setActiveTab] = useState('company');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form states
  const [companyInfo, setCompanyInfo] = useState({
    name: institution?.name || 'TechCorp Solutions',
    description: institution?.description || 'Leading technology company focused on innovation',
    website: 'https://techcorp.com',
    industry: 'Technology',
    size: '201-500 employees',
    founded: '2015',
    headquarters: 'San Francisco, CA',
    type: 'Private Company'
  });

  const [contactInfo, setContactInfo] = useState({
    mainEmail: 'contact@techcorp.com',
    supportEmail: 'support@techcorp.com',
    hrEmail: 'hr@techcorp.com',
    mainPhone: '+1 (555) 123-4567',
    supportPhone: '+1 (555) 123-4568',
    address: '123 Tech Street, San Francisco, CA 94105',
    linkedIn: 'https://linkedin.com/company/techcorp',
    twitter: 'https://twitter.com/techcorp'
  });

  const [legalInfo, setLegalInfo] = useState({
    registrationNumber: 'CORP-2015-001234',
    taxId: '12-3456789',
    incorporationDate: '2015-03-15',
    registeredAddress: '123 Tech Street, San Francisco, CA 94105',
    legalName: 'TechCorp Solutions Inc.',
    jurisdiction: 'Delaware',
    businessLicense: 'BL-2015-SF-001234'
  });

  const [brandingSettings, setBrandingSettings] = useState({
    primaryColor: '#ff6b35',
    secondaryColor: '#e55a2b',
    logoUrl: '',
    bannerUrl: '',
    tagline: 'Innovation at Scale',
    mission: 'To build technology that empowers businesses and transforms industries.',
    values: 'Innovation, Integrity, Excellence, Collaboration'
  });

  const handleSave = async (section: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccessMessage(`${section} settings updated successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
                  <h1 className="text-xl font-medium text-gray-900">Company Settings</h1>
                  <p className="text-sm text-gray-500">{institution?.name || 'TechCorp Solutions'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {successMessage}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="company">Company Info</TabsTrigger>
            <TabsTrigger value="contact">Contact & Social</TabsTrigger>
            <TabsTrigger value="legal">Legal & Compliance</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <AccessRestriction 
              user={user} 
              requiredRole="admin"
              fallback={
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>
                        Access restricted. Only institution administrators can manage company information and settings.
                        Please contact your institution administrator for access to these features.
                      </span>
                    </div>
                  </AlertDescription>
                </Alert>
              }
            >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Basic Company Information</h3>
                  <p className="text-sm text-gray-600">Manage your company's basic details and public information</p>
                </div>
                <Button 
                  onClick={() => handleSave('Company')}
                  disabled={isLoading}
                  className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={companyInfo.industry} onValueChange={(value) => setCompanyInfo({...companyInfo, industry: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select value={companyInfo.size} onValueChange={(value) => setCompanyInfo({...companyInfo, size: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10 employees">1-10 employees</SelectItem>
                        <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                        <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                        <SelectItem value="201-500 employees">201-500 employees</SelectItem>
                        <SelectItem value="501-1000 employees">501-1000 employees</SelectItem>
                        <SelectItem value="1000+ employees">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="founded">Founded Year</Label>
                    <Input
                      id="founded"
                      value={companyInfo.founded}
                      onChange={(e) => setCompanyInfo({...companyInfo, founded: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="headquarters">Headquarters</Label>
                    <Input
                      id="headquarters"
                      value={companyInfo.headquarters}
                      onChange={(e) => setCompanyInfo({...companyInfo, headquarters: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyType">Company Type</Label>
                    <Select value={companyInfo.type} onValueChange={(value) => setCompanyInfo({...companyInfo, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Private Company">Private Company</SelectItem>
                        <SelectItem value="Public Company">Public Company</SelectItem>
                        <SelectItem value="Startup">Startup</SelectItem>
                        <SelectItem value="Non-profit">Non-profit</SelectItem>
                        <SelectItem value="Government">Government</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea
                      id="description"
                      value={companyInfo.description}
                      onChange={(e) => setCompanyInfo({...companyInfo, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </Card>
            </AccessRestriction>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Contact Information & Social Media</h3>
                  <p className="text-sm text-gray-600">Manage how candidates and partners can reach your company</p>
                </div>
                <Button 
                  onClick={() => handleSave('Contact')}
                  disabled={isLoading}
                  className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Addresses
                  </h4>
                  
                  <div>
                    <Label htmlFor="mainEmail">Main Contact Email</Label>
                    <Input
                      id="mainEmail"
                      type="email"
                      value={contactInfo.mainEmail}
                      onChange={(e) => setContactInfo({...contactInfo, mainEmail: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="hrEmail">HR/Recruitment Email</Label>
                    <Input
                      id="hrEmail"
                      type="email"
                      value={contactInfo.hrEmail}
                      onChange={(e) => setContactInfo({...contactInfo, hrEmail: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={contactInfo.supportEmail}
                      onChange={(e) => setContactInfo({...contactInfo, supportEmail: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Numbers
                  </h4>
                  
                  <div>
                    <Label htmlFor="mainPhone">Main Phone</Label>
                    <Input
                      id="mainPhone"
                      type="tel"
                      value={contactInfo.mainPhone}
                      onChange={(e) => setContactInfo({...contactInfo, mainPhone: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input
                      id="supportPhone"
                      type="tel"
                      value={contactInfo.supportPhone}
                      onChange={(e) => setContactInfo({...contactInfo, supportPhone: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Physical Address</Label>
                    <Textarea
                      id="address"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4" />
                  Social Media & Web Presence
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn Company Page</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/company/yourcompany"
                      value={contactInfo.linkedIn}
                      onChange={(e) => setContactInfo({...contactInfo, linkedIn: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="twitter">Twitter/X Handle</Label>
                    <Input
                      id="twitter"
                      type="url"
                      placeholder="https://twitter.com/yourcompany"
                      value={contactInfo.twitter}
                      onChange={(e) => setContactInfo({...contactInfo, twitter: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Legal & Compliance Information</h3>
                  <p className="text-sm text-gray-600">Manage legal entity details and compliance information</p>
                </div>
                <Button 
                  onClick={() => handleSave('Legal')}
                  disabled={isLoading}
                  className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="legalName">Legal Entity Name</Label>
                    <Input
                      id="legalName"
                      value={legalInfo.legalName}
                      onChange={(e) => setLegalInfo({...legalInfo, legalName: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="registrationNumber">Business Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      value={legalInfo.registrationNumber}
                      onChange={(e) => setLegalInfo({...legalInfo, registrationNumber: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="taxId">Tax ID / EIN</Label>
                    <Input
                      id="taxId"
                      value={legalInfo.taxId}
                      onChange={(e) => setLegalInfo({...legalInfo, taxId: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessLicense">Business License Number</Label>
                    <Input
                      id="businessLicense"
                      value={legalInfo.businessLicense}
                      onChange={(e) => setLegalInfo({...legalInfo, businessLicense: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="jurisdiction">Jurisdiction of Incorporation</Label>
                    <Input
                      id="jurisdiction"
                      value={legalInfo.jurisdiction}
                      onChange={(e) => setLegalInfo({...legalInfo, jurisdiction: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="incorporationDate">Date of Incorporation</Label>
                    <Input
                      id="incorporationDate"
                      type="date"
                      value={legalInfo.incorporationDate}
                      onChange={(e) => setLegalInfo({...legalInfo, incorporationDate: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="registeredAddress">Registered Address</Label>
                    <Textarea
                      id="registeredAddress"
                      value={legalInfo.registeredAddress}
                      onChange={(e) => setLegalInfo({...legalInfo, registeredAddress: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Alert className="border-blue-200 bg-blue-50">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-700">
                    <strong>Privacy Notice:</strong> Legal information is securely stored and only visible to authorized administrators. 
                    This data is used for compliance purposes and is never shared publicly.
                  </AlertDescription>
                </Alert>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Brand Identity & Assets</h3>
                  <p className="text-sm text-gray-600">Customize your company's visual identity and branding</p>
                </div>
                <Button 
                  onClick={() => handleSave('Branding')}
                  disabled={isLoading}
                  className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="tagline">Company Tagline</Label>
                    <Input
                      id="tagline"
                      value={brandingSettings.tagline}
                      onChange={(e) => setBrandingSettings({...brandingSettings, tagline: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={brandingSettings.primaryColor}
                          onChange={(e) => setBrandingSettings({...brandingSettings, primaryColor: e.target.value})}
                          className="w-16"
                        />
                        <Input
                          value={brandingSettings.primaryColor}
                          onChange={(e) => setBrandingSettings({...brandingSettings, primaryColor: e.target.value})}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={brandingSettings.secondaryColor}
                          onChange={(e) => setBrandingSettings({...brandingSettings, secondaryColor: e.target.value})}
                          className="w-16"
                        />
                        <Input
                          value={brandingSettings.secondaryColor}
                          onChange={(e) => setBrandingSettings({...brandingSettings, secondaryColor: e.target.value})}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="mission">Mission Statement</Label>
                    <Textarea
                      id="mission"
                      value={brandingSettings.mission}
                      onChange={(e) => setBrandingSettings({...brandingSettings, mission: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="values">Company Values</Label>
                    <Textarea
                      id="values"
                      placeholder="Separate values with commas"
                      value={brandingSettings.values}
                      onChange={(e) => setBrandingSettings({...brandingSettings, values: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Logo & Visual Assets</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-4 border-dashed border-2 border-gray-300 hover:border-[#ff6b35] transition-colors cursor-pointer">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Upload Company Logo</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                      </div>
                    </Card>

                    <Card className="p-4 border-dashed border-2 border-gray-300 hover:border-[#ff6b35] transition-colors cursor-pointer">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Upload Banner Image</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}