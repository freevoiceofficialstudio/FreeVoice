
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Mic, 
  Settings, 
  ShieldCheck, 
  ArrowRight,
  Monitor,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] md:h-[600px] bg-indigo-600/10 blur-[80px] md:blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs md:text-sm font-semibold mb-8 animate-fade-in">
            <Zap className="w-3.5 h-3.5 md:w-4 h-4" />
            <span>Now with Gemini 3 Pro support</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight px-2">
            The Future of <br />
            <span className="gradient-text">AI Voice Conversion</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed px-4">
            Record, convert, and download ultra-realistic voices. Use our live system-wide voice changer for calls, games, and streaming.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-6 md:px-0">
            <Link 
              to="/convert" 
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Start Converting</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/download" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all flex items-center justify-center space-x-2"
            >
              <Monitor className="w-5 h-5" />
              <span>Download App</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-8 rounded-3xl glass hover:border-indigo-500/50 transition-colors">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Mic className="text-indigo-500 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Record & Upload</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Seamlessly record your voice directly in-browser or upload existing MP3/WAV files for instant transformation.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl glass hover:border-indigo-500/50 transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Settings className="text-purple-500 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Ultra-Realistic</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Powered by cutting-edge neural models to deliver voices that sound indistinguishable from real humans.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl glass hover:border-indigo-500/50 transition-colors sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-blue-500 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Offline & Secure</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Downloaded voices work offline. Your data is yours—we don't store your voice recordings on our servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview / CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-indigo-600 to-purple-700 p-8 md:p-12 relative overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 blur-3xl rounded-full -mr-16 md:-mr-20 -mt-16 md:-mt-20"></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">System-Wide Live Changing</h2>
                <ul className="space-y-3 mb-8 text-left inline-block md:block">
                  {[
                    "Low-latency real-time conversion",
                    "Works in Discord, Zoom & Teams",
                    "Optimized for gaming performance",
                    "Background mic interception"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3 text-white/90">
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center md:justify-start">
                  <Link 
                    to="/premium" 
                    className="w-full sm:w-auto text-center px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-xl hover:bg-slate-50 transition-all"
                  >
                    Upgrade to Premium
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-center justify-center space-y-4">
                <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/20 w-full max-w-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white text-sm font-bold">LIVE Status</span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-white text-[10px] uppercase font-bold tracking-widest">Active</span>
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full w-full mb-2">
                    <div className="h-full bg-white rounded-full w-[85%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-white/60 font-medium">
                    <span>CPU: 4%</span>
                    <span>Lat: 12ms</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Monitor className="text-white/40 w-8 h-8" />
                  <Smartphone className="text-white/40 w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
