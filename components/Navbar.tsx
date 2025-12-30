
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserProfile, MembershipType } from '../types';
import { 
  Mic2, 
  Crown, 
  Download as DownloadIcon, 
  LogOut, 
  Menu,
  X,
  Home as HomeIcon,
  Zap,
  UserPlus
} from 'lucide-react';

interface NavbarProps {
  user: UserProfile | null;
  login: () => void;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, login, logout }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: <HomeIcon className="w-4 h-4" /> },
    { path: '/convert', label: 'Converter', icon: <Zap className="w-4 h-4" /> },
    { path: '/premium', label: 'Premium', icon: <Crown className="w-4 h-4" />, highlight: true },
    { path: '/download', label: 'Apps', icon: <DownloadIcon className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" onClick={closeMenu} className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-500/20">
              <Mic2 className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Free<span className="text-indigo-500">Voice</span></span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-sm font-medium transition-colors hover:text-indigo-400 flex items-center space-x-1.5 ${isActive(link.path) ? (link.highlight ? 'text-yellow-400' : 'text-indigo-400') : 'text-slate-400'}`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-2 p-1 pl-2 pr-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all">
                  <img src={user.photoURL} alt={user.name} className="w-7 h-7 rounded-full" />
                  <span className="text-xs font-semibold">{user.name.split(' ')[0]}</span>
                  {user.membership !== MembershipType.FREE && (
                    <Crown className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  )}
                </Link>
                <button 
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button onClick={login} className="text-slate-400 hover:text-white text-sm font-semibold transition-colors">Sign In</button>
                <button onClick={login} className="flex items-center space-x-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-50 text-white text-sm font-semibold rounded-full shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up Free</span>
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleMenu} className="p-2 text-slate-400 hover:text-white transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-950 border-b border-white/10 animate-slide-down">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-4 rounded-2xl text-base font-medium transition-colors ${isActive(link.path) ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
              >
                <span className={isActive(link.path) ? (link.highlight ? 'text-yellow-400' : 'text-indigo-400') : 'text-slate-500'}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
