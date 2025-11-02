import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  User, 
  Settings, 
  HelpCircle, 
  Bug, 
  LogOut, 
  Crown, 
  Shield, 
  Download, 
  ChevronDown,
  Briefcase,
  Users,
  Building2,
  Plus,
  BarChart3,
  UserCheck,
  Zap
} from 'lucide-react';

interface RecruiterProfileDropdownProps {
  onNavigate: (view: string) => void;
  onLogout?: () => void;
  user: any;
}

export function RecruiterProfileDropdown({ 
  onNavigate, 
  onLogout,
  user
}: RecruiterProfileDropdownProps) {
  const [open, setOpen] = useState(false);

  // Determine if user is admin - check for admin properties rather than role
  const isUserAdmin = user?.isInstitutionAdmin || user?.isInstitutionCreator;
  
  // Get user info with defaults
  const userName = user ? `${user.firstName || 'John'} ${user.lastName || 'Smith'}` : 'John Smith';
  const userEmail = user?.email || 'john.smith@company.com';
  const userCompany = user?.company || 'Tech Solutions Inc.';
  const userInitials = userName.split(' ').map(n => n[0]).join('');

  const handleNavigation = (view: string) => {
    setOpen(false);
    onNavigate(view);
  };

  const handleLogout = () => {
    setOpen(false);
    onLogout?.();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 h-auto p-2 hover:bg-orange-50 rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white text-sm">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{userName}</span>
            {isUserAdmin && (
              <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs">
                <Crown className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 p-2">
        {/* User Info Header */}
        <DropdownMenuLabel className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900 truncate">{userName}</p>
                {isUserAdmin && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Admin
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{userEmail}</p>
              <p className="text-xs text-gray-500 truncate">{userCompany}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Quick Actions */}
        <DropdownMenuItem 
          onClick={() => handleNavigation('job-posting')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-lg flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-medium">Post New Job</span>
            <p className="text-xs text-gray-500">Create a new job posting</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Profile & Navigation */}
        <DropdownMenuItem 
          onClick={() => handleNavigation('recruiter-profile')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <User className="w-4 h-4 text-gray-600" />
          <span>My Profile</span>
        </DropdownMenuItem>



        {/* Recruiter Tools */}
        <DropdownMenuItem 
          onClick={() => handleNavigation('job-management')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <Briefcase className="w-4 h-4 text-gray-600" />
          <span>My Job Postings</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleNavigation('candidate-management')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <UserCheck className="w-4 h-4 text-gray-600" />
          <span>Candidate Management</span>
        </DropdownMenuItem>

        {isUserAdmin && (
          <DropdownMenuItem 
            onClick={() => handleNavigation('institution-admin')}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
          >
            <Settings className="w-4 h-4 text-gray-600" />
            <span>Team Management</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem 
          onClick={() => handleNavigation('queue-sourcing')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <Zap className="w-4 h-4 text-gray-600" />
          <span>Queue Sourcing</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Institution & Settings */}
        <DropdownMenuItem 
          onClick={() => handleNavigation('institution-management')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <Building2 className="w-4 h-4 text-gray-600" />
          <span>Company Settings</span>
        </DropdownMenuItem>



        <DropdownMenuSeparator />

        {/* Platform Insights */}
        <DropdownMenuItem 
          onClick={() => handleNavigation('platform-overview')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <BarChart3 className="w-4 h-4 text-[#ff6b35]" />
          <div className="flex-1">
            <span className="text-[#ff6b35] font-medium">Platform Overview</span>
            <p className="text-xs text-gray-500">Comprehensive platform insights</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleNavigation('metrics-dashboard')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <BarChart3 className="w-4 h-4 text-gray-600" />
          <span>Metrics Dashboard</span>
        </DropdownMenuItem>



        <DropdownMenuItem 
          onClick={() => handleNavigation('settings')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <Settings className="w-4 h-4 text-gray-600" />
          <span>Account Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Help & Support */}
        <DropdownMenuItem 
          onClick={() => handleNavigation('support')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <HelpCircle className="w-4 h-4 text-gray-600" />
          <span>Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleNavigation('report-issue')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <Bug className="w-4 h-4 text-gray-600" />
          <span>Report an Issue</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Data Export */}
        <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg">
          <Download className="w-4 h-4 text-gray-600" />
          <span>Export My Data</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-red-50 rounded-lg text-red-600"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>

        {/* Footer */}
        <div className="px-3 py-2 mt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            theGarage Recruiter v2.1.0
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}