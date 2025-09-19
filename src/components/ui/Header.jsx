import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef();
  const location = useLocation();

  useEffect(() => {
    // TODO: Replace with JWT-based user fetch
    // For demo, try to get user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    setUserProfile(user);
  }, []);

  // Fetch notifications for logged-in user
  useEffect(() => {
    if (!userProfile) return;
    const token = localStorage.getItem('token');
    fetch('/api/notifications', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setNotifications(data.reverse?.() || []))
      .catch(() => setNotifications([]));
  }, [userProfile]);

  // Close notification dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [notifOpen]);

  const navigationItems = [
    {
      label: 'Home',
      path: '/home-landing',
      icon: 'Home',
      tooltip: 'Platform overview and getting started'
    },
    {
      label: 'Find Internships',
      path: '/matchmaking-dashboard',
      icon: 'Search',
      tooltip: 'Discover AI-matched internship opportunities'
    },
    {
      label: 'Post Internship',
      path: '/company-internship-posting',
      icon: 'Plus',
      tooltip: 'Create new internship opportunities'
    },
    {
      label: 'My Profile',
      path: '/student-profile-management',
      icon: 'User',
      tooltip: 'Manage your profile and preferences',
      badge: userProfile?.profileCompletion < 100 ? `${userProfile?.profileCompletion}%` : null
    }
  ];

  const secondaryItems = [
    {
      label: 'Internship Details',
      path: '/internship-details-view',
      icon: 'FileText'
    },
    {
      label: 'Student Registration',
      path: '/student-registration',
      icon: 'UserPlus'
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const isHome = location?.pathname === '/home-landing';
  const isStudentDashboard = location?.pathname === '/student-dashboard';
  const headerClasses = isHome
    ? 'fixed top-0 left-0 right-0 z-100 bg-transparent border-transparent font-noi'
    : isStudentDashboard
      ? 'fixed top-0 left-0 right-0 z-100 bg-black border-b border-black text-white font-noi'
      : 'fixed top-0 left-0 right-0 z-100 bg-card border-b border-border font-noi';

  // Apply a black theme to the profile area when on student dashboard
  const profileContainerClass = isStudentDashboard
    ? 'flex items-center space-x-3 px-4 py-2 bg-black text-white rounded-lg'
    : 'flex items-center space-x-3 px-4 py-2 bg-muted rounded-lg';
  const avatarClass = isStudentDashboard
    ? 'flex items-center justify-center w-8 h-8 bg-black rounded-full border border-white'
    : 'flex items-center justify-center w-8 h-8 bg-primary rounded-full';
  const avatarTextClass = isStudentDashboard ? 'text-sm font-medium text-white' : 'text-sm font-medium text-primary-foreground';
  const nameTextClass = isStudentDashboard ? 'font-medium text-white' : 'font-medium text-foreground';
  const metaTextClass = isStudentDashboard ? 'text-xs text-white/80' : 'text-xs text-muted-foreground';

  const homeTabs = [
    { label: 'Students', path: '/matchmaking-dashboard' },
    { label: 'Employers', path: '/company-internship-posting' },
    { label: 'Career centers', path: '/student-registration' },
    { label: 'Company', path: '/home-landing' },
    { label: 'InterNova AI', path: '/home-landing' }
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={headerClasses}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/home-landing"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-150"
              onClick={closeMobileMenu}
            >
              {isHome ? (
                <span className="text-lime-400 text-xl md:text-2xl font-semibold">InterNova</span>
              ) : (
                <>
                      <div className={isStudentDashboard ? 'flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg' : 'flex items-center justify-center w-10 h-10 bg-primary rounded-lg'}>
                        <Icon name="Briefcase" size={24} color={isStudentDashboard ? 'white' : 'white'} />
                      </div>
                      <div className="hidden sm:block">
                        <h1 className={isStudentDashboard ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-foreground'}>PM Internship</h1>
                        <p className={isStudentDashboard ? 'text-xs text-white/80 -mt-1' : 'text-xs text-muted-foreground -mt-1'}>Matcher</p>
                      </div>
                </>
              )}
            </Link>
          </div>

          {/* Home Tabs - Desktop */}
          {isHome && (
            <nav className="hidden md:flex items-center gap-1 md:gap-2">
              {homeTabs.map((tab) => (
                <Link
                  key={`${tab.label}-${tab.path}`}
                  to={tab.path}
                  className={isStudentDashboard ? 'px-3 py-1.5 rounded-full text-sm text-white/90 hover:text-white hover:bg-white/5 transition' : 'px-3 py-1.5 rounded-full text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition'}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          {isHome ? (
            <div className="flex items-center space-x-3">
              <Link to="/auth/signup">
                <Button variant="outline" className="border-black text-black bg-white/90">Sign up</Button>
              </Link>
              <Link to="/auth/login">
                <Button className="bg-black text-white">Log in</Button>
              </Link>
            </div>
          ) : (
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <div key={item?.path} className="relative group">
                  <Link
                    to={item?.path}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-md text-sm md:text-base font-medium transition-all duration-150
                      ${isActiveRoute(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-105'
                      }
                    `}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                    {item?.badge && (
                      <span className="ml-1 px-2 py-0.5 text-xs bg-accent text-accent-foreground rounded-full">
                        {item?.badge}
                      </span>
                    )}
                  </Link>

                  {/* Tooltip */}
                  {item?.tooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs bg-popover text-popover-foreground rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-200">
                      {item?.tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* User Context / Auth Actions - Desktop */}
          {!isHome && (
            <div className="hidden md:flex items-center space-x-4">
              {userProfile ? (
                <>
                  {/* Notification Bell */}
                  <div className="relative" ref={notifRef}>
                    <button
                      className="relative p-2 rounded-full hover:bg-muted focus:outline-none"
                      onClick={() => setNotifOpen(v => !v)}
                      aria-label="Notifications"
                    >
                      <Icon name="Bell" size={22} />
                      {notifications.some(n => !n.read) && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      )}
                    </button>
                    {notifOpen && (
                      <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white border border-border rounded-lg shadow-lg z-50 overflow-hidden animate-fade-in">
                        <div className="p-3 border-b border-border font-semibold text-base bg-muted">Notifications</div>
                        <div className="max-h-80 overflow-y-auto divide-y divide-border">
                          {notifications.length === 0 && (
                            <div className="p-4 text-center text-muted-foreground text-sm">No notifications yet.</div>
                          )}
                          {notifications.map(n => (
                            <div
                              key={n.id}
                              className={`px-4 py-3 text-sm cursor-pointer transition bg-white hover:bg-muted ${n.read ? '' : 'font-semibold'}`}
                              onClick={async () => {
                                if (!n.read) {
                                  const token = localStorage.getItem('token');
                                  await fetch(`/api/notifications/${n.id}/read`, {
                                    method: 'PUT',
                                    headers: { Authorization: `Bearer ${token}` }
                                  });
                                  setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x));
                                }
                              }}
                            >
                              <div className="flex items-start gap-2">
                                <Icon name={n.type === 'application-status' ? 'CheckCircle' : 'Info'} size={18} className="mt-0.5" />
                                <div>
                                  <div>{n.message}</div>
                                  <div className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* User Profile */}
                  <div className={profileContainerClass}>
                    <div className={avatarClass}>
                      <span className={avatarTextClass}>
                        {userProfile?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className={nameTextClass}>{userProfile?.name}</p>
                      <p className={metaTextClass}>
                        Profile {userProfile?.profileCompletion}% • {userProfile?.recentMatches} new matches
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/auth/signup">
                    <Button variant="outline" className="border-black text-black bg-white/90">Sign up</Button>
                  </Link>
                  <Link to="/auth/login">
                    <Button className="bg-black text-white">Log in</Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMobileMenuToggle}
              className="relative"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={isMobileMenuOpen ? 22 : 22} />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            {isHome ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Link to="/auth/signup" onClick={closeMobileMenu}>
                    <Button variant="outline" className="w-full">Sign up</Button>
                  </Link>
                  <Link to="/auth/login" onClick={closeMobileMenu}>
                    <Button className="w-full bg-lime-400 text-black hover:bg-lime-300">Log in</Button>
                  </Link>
                </div>
                <div className="pt-2 border-t border-border">
                  {homeTabs.map((tab) => (
                    <Link
                      key={`${tab.label}-${tab.path}`}
                      to={tab.path}
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 rounded-md text-sm text-foreground/80 hover:text-foreground hover:bg-muted"
                    >
                      {tab.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* If not logged in, show auth actions */}
                {!userProfile && (
                  <div className="space-y-3 px-3">
                    <Link to="/auth/signup" onClick={closeMobileMenu}>
                      <Button variant="outline" className="w-full">Sign up</Button>
                    </Link>
                    <Link to="/auth/login" onClick={closeMobileMenu}>
                      <Button className="w-full bg-lime-400 text-black hover:bg-lime-300">Log in</Button>
                    </Link>
                  </div>
                )}

                {/* User Context - Mobile (if logged in) */}
                {userProfile && (
                  <div className={isStudentDashboard ? 'flex items-center space-x-3 p-3 bg-black text-white rounded-lg mb-4' : 'flex items-center space-x-3 p-3 bg-muted rounded-lg mb-4'}>
                      <div className={isStudentDashboard ? 'flex items-center justify-center w-10 h-10 bg-black rounded-full border border-white' : 'flex items-center justify-center w-10 h-10 bg-primary rounded-full'}>
                        <span className={isStudentDashboard ? 'text-sm font-medium text-white' : 'text-sm font-medium text-primary-foreground'}>
                          {userProfile?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <div>
                        <p className={isStudentDashboard ? 'font-medium text-white' : 'font-medium text-foreground'}>{userProfile?.name}</p>
                        <p className={isStudentDashboard ? 'text-xs text-white/80' : 'text-xs text-muted-foreground'}>
                          Profile {userProfile?.profileCompletion}% complete
                        </p>
                        <p className="text-xs text-accent font-medium">
                          {userProfile?.recentMatches} new matches available
                        </p>
                      </div>
                    </div>
                )}

                {/* Primary Navigation - Mobile */}
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`
                      flex items-center space-x-3 p-3 rounded-lg transition-all duration-150
                      ${isActiveRoute(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.label}</span>
                    {item?.badge && (
                      <span className="ml-auto px-2 py-0.5 text-xs bg-accent text-accent-foreground rounded-full">
                        {item?.badge}
                      </span>
                    )}
                  </Link>
                ))}

                {/* Secondary Navigation - Mobile */}
                <div className="pt-4 mt-4 border-t border-border">
                  <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Quick Access
                  </p>
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={closeMobileMenu}
                      className={`
                        flex items-center space-x-3 p-3 rounded-lg transition-all duration-150
                        ${isActiveRoute(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }
                      `}
                    >
                      <Icon name={item?.icon} size={18} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
