import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { supabase } from '../../lib/supabaseClient';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data?.user;
        if (user && mounted) {
          setUserProfile({
            name: user.user_metadata?.full_name || user.email,
            profileCompletion: user.user_metadata?.profileCompletion || 85,
            recentMatches: user.user_metadata?.recentMatches || 3,
            role: user.user_metadata?.role || 'student'
          });
        } else if (mounted) {
          setUserProfile(null);
        }
      } catch (err) {
        console.error('Auth init error', err);
      }
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        setUserProfile({
          name: u.user_metadata?.full_name || u.email,
          profileCompletion: u.user_metadata?.profileCompletion || 85,
          recentMatches: u.user_metadata?.recentMatches || 3,
          role: u.user_metadata?.role || 'student'
        });
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      mounted = false;
      try { listener?.subscription?.unsubscribe?.(); } catch (e) {}
    };
  }, []);

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
  const headerClasses = isHome
    ? 'fixed top-0 left-0 right-0 z-100 bg-transparent border-transparent'
    : 'fixed top-0 left-0 right-0 z-100 bg-card border-b border-border';

  const homeTabs = [
    { label: 'Students', path: '/matchmaking-dashboard' },
    { label: 'Employers', path: '/company-internship-posting' },
    { label: 'Career centers', path: '/student-registration' },
    { label: 'Company', path: '/home-landing' },
    { label: 'Handshake AI', path: '/home-landing' }
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
                <span className="text-lime-400 text-xl md:text-2xl font-semibold">Handshake</span>
              ) : (
                <>
                  <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                    <Icon name="Briefcase" size={24} color="white" />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl font-semibold text-foreground">PM Internship</h1>
                    <p className="text-xs text-muted-foreground -mt-1">Matcher</p>
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
                  key={tab.path}
                  to={tab.path}
                  className="px-3 py-1.5 rounded-full text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition"
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          {isHome ? (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/auth/signup">
                <Button variant="outline">Sign up</Button>
              </Link>
              <Link to="/auth/login">
                <Button className="bg-lime-400 text-black hover:bg-lime-300">Log in</Button>
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

          {/* User Context Indicator - Desktop */}
          {!isHome && (
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3 px-4 py-2 bg-muted rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                  <span className="text-sm font-medium text-primary-foreground">
                    {userProfile?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">{userProfile?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Profile {userProfile?.profileCompletion}% • {userProfile?.recentMatches} new matches
                  </p>
                </div>
              </div>
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
                      key={tab.path}
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
                {/* User Context - Mobile */}
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                    <span className="text-sm font-medium text-primary-foreground">
                      {userProfile?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{userProfile?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Profile {userProfile?.profileCompletion}% complete
                    </p>
                    <p className="text-xs text-accent font-medium">
                      {userProfile?.recentMatches} new matches available
                    </p>
                  </div>
                </div>

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
