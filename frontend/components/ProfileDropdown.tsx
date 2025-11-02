import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { User, Settings, HelpCircle, Bug, LogOut, Crown, Shield, Bell, CreditCard, Download, ChevronDown, BarChart3 } from 'lucide-react';

interface ProfileDropdownProps {
  onNavigate: (view: 'homepage' | 'tracker' | 'profile' | 'notifications' | 'settings' | 'support' | 'report-issue' | 'platform-overview' | 'metrics-dashboard') => void;
  onLogout?: () => void;
  isPremium?: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export function ProfileDropdown({ 
  onNavigate, 
  onLogout,
  isPremium = false, 
  userName = "John Doe", 
  userEmail = "john.doe@example.com",
  userAvatar 
}: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);

  const handleNavigation = (view: 'homepage' | 'tracker' | 'profile' | 'notifications' | 'settings' | 'support' | 'report-issue' | 'platform-overview' | 'metrics-dashboard') => {
    setOpen(false);
    onNavigate(view);
  };

  const handleLogout = () => {
    setOpen(false);
    onLogout?.();
    setOpen(false);
    // Could redirect to login page or show logout confirmation
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 h-auto p-2 hover:bg-orange-50 rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={userAvatar} />
            <AvatarFallback className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white text-sm">
              {userName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{userName}</span>
            {isPremium && (
              <Badge className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white text-xs">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-72 p-2">
        {/* User Info Header */}
        <DropdownMenuLabel className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900 truncate">{userName}</p>
                {isPremium && (
                  <Badge className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{userEmail}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Profile & Navigation */}
        <DropdownMenuItem 
          onClick={() => handleNavigation('profile')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <User className="w-4 h-4 text-gray-600" />
          <span>My Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleNavigation('notifications')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <Bell className="w-4 h-4 text-gray-600" />
          <span>Notifications</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Settings & Account */}
        <DropdownMenuItem 
          onClick={() => handleNavigation('settings')}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
        >
          <Settings className="w-4 h-4 text-gray-600" />
          <span>Account Settings</span>
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
            <p className="text-xs text-gray-500">Explore theGarage insights</p>
          </div>
        </DropdownMenuItem>



        {!isPremium && (
          <DropdownMenuItem 
            onClick={() => handleNavigation('settings')}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
          >
            <Crown className="w-4 h-4 text-[#ff6b35]" />
            <div className="flex-1">
              <span className="text-[#ff6b35] font-medium">Upgrade to Premium</span>
              <p className="text-xs text-gray-500">Unlock advanced features</p>
            </div>
          </DropdownMenuItem>
        )}

        {isPremium && (
          <DropdownMenuItem 
            onClick={() => handleNavigation('settings')}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 rounded-lg"
          >
            <CreditCard className="w-4 h-4 text-gray-600" />
            <span>Billing & Subscription</span>
          </DropdownMenuItem>
        )}

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
            theGarage v2.1.0
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}