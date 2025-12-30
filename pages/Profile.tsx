
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile, MembershipType } from '../types';
import { 
  Crown, 
  Clock, 
  Calendar, 
  Shield, 
  RefreshCw, 
  Mail, 
  User as UserIcon,
  ChevronRight,
  Zap,
  ArrowUpRight
} from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);

  useEffect(() => {
    if (!user.expiryDate || user.membership === MembershipType.FREE) {
      setTimeLeft(null);
      return;
    }

    const updateTimer = () => {
      const targetDate = new Date(user.expiryDate!).getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft(null);
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ d, h, m, s });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [user.expiryDate, user.membership]);

  const isPremium = user.membership !== MembershipType.FREE;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Card */}
        <div className="lg:col-span-1">
          <div className="glass rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
            <div className="h-24 bg-gradient-to-br from-indigo-600 to-purple-700 relative">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>
            <div className="px-6 pb-8">
              <div className="flex justify-center -mt-12 mb-4">
                <div className="relative">
                  <img 
                    src={user.photoURL || 'https://via.placeholder.com/150'} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-3xl border-4 border-slate-950 shadow-2xl bg-slate-800 object-cover" 
                  />
                  {isPremium && (
                    <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-xl p-1.5 shadow-lg ring-4 ring-slate-950">
                      <Crown className="w-4 h-4 text-slate-900 fill-slate-900" />
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center space-y-1 mb-8">
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <div className="flex items-center justify-center space-x-1.5 text-slate-500 text-sm">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className={`p-4 rounded-2xl flex items-center justify-between ${isPremium ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-white/5 border border-white/5'}`}>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Tier</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${isPremium ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    {user.membership}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Status</span>
                  <div className="flex items-center space-x-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${isPremium ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
                    <span className={`text-sm font-bold ${isPremium ? 'text-green-500' : 'text-slate-500'}`}>
                      {isPremium ? 'Active' : 'Basic Account'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Timer */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Membership Timer Section */}
          <div className="glass rounded-[32px] p-8 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Clock className="w-24 h-24 text-indigo-400" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Time Remaining</h3>
                  <p className="text-slate-500 text-sm">Your access will revert to Free once this hits zero.</p>
                </div>
                {isPremium && (
                  <div className="p-2 bg-indigo-500/20 rounded-xl">
                    <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin-slow" />
                  </div>
                )}
              </div>

              {timeLeft ? (
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Days', val: timeLeft.d },
                    { label: 'Hours', val: timeLeft.h },
                    { label: 'Mins', val: timeLeft.m },
                    { label: 'Secs', val: timeLeft.s },
                  ].map((unit, i) => (
                    <div key={i} className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                      <div className="text-2xl md:text-3xl font-mono font-bold text-indigo-400">
                        {unit.val.toString().padStart(2, '0')}
                      </div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">{unit.label}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center rounded-3xl bg-slate-900/50 border border-dashed border-white/10">
                  <Zap className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                  <h4 className="text-slate-400 font-bold mb-2">No Active Subscription</h4>
                  <p className="text-slate-600 text-sm mb-6">Upgrade now to unlock all realistic voices and live changing.</p>
                  <Link 
                    to="/premium" 
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                  >
                    <span>View Plans</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Account Settings / Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-[28px] border border-white/5">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="text-white font-bold">Security</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Your session is secured with Google OAuth. Membership is synced across all your devices using our real-time cloud database.
              </p>
              <div className="flex items-center justify-between py-3 border-t border-white/5">
                <span className="text-xs text-slate-400">Database Status</span>
                <span className="text-[10px] font-bold text-green-500 uppercase">Synchronized</span>
              </div>
            </div>

            <div className="glass p-6 rounded-[28px] border border-white/5">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="text-white font-bold">Billing</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Subscription payments are processed via Stripe. Manual updates by Subhan Ahmad ensure your account is always correct.
              </p>
              <button 
                onClick={() => window.location.href = 'mailto:jobsofficial786@gmail.com'}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-300 transition-all flex items-center justify-center space-x-2"
              >
                <span>Request Invoice</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
