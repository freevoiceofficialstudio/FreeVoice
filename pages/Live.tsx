
import React, { useState, useEffect, useRef } from 'react';
// Added missing Link import from react-router-dom to fix the reference error on line 207
import { Link } from 'react-router-dom';
import { UserProfile, MembershipType, Voice } from '../types';
import { 
  Mic, 
  Settings, 
  Zap, 
  Crown, 
  AlertCircle, 
  Power, 
  Activity, 
  Layers,
  Volume2,
  Lock,
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';

interface LiveProps {
  user: UserProfile | null;
}

const Live: React.FC<LiveProps> = ({ user }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>('Professional Male');
  const [latency, setLatency] = useState<number>(12);
  const [voulme, setVolume] = useState<number>(80);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const isPremium = user && (user.membership === MembershipType.PREMIUM || user.membership === MembershipType.ULTRA);

  // Visualization Logic
  useEffect(() => {
    if (isActive && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;
      let x = 0;

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        
        for (let i = 0; i < canvas.width; i++) {
          const amplitude = isActive ? Math.random() * 20 : 2;
          ctx.lineTo(i, canvas.height / 2 + Math.sin(i * 0.05 + x) * amplitude);
        }
        
        ctx.strokeStyle = isActive ? '#6366f1' : '#334155';
        ctx.lineWidth = 2;
        ctx.stroke();
        x += 0.2;
        animationRef.current = requestAnimationFrame(draw);
      };
      draw();
    }
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isActive]);

  const toggleLive = () => {
    if (!isPremium) return;
    setIsActive(!isActive);
    // Real desktop logic would trigger the Virtual Audio Driver here
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Control Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="w-12 h-12 text-indigo-400" />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-8 flex items-center space-x-2">
              <Power className="w-5 h-5 text-indigo-500" />
              <span>Live Engine</span>
            </h2>

            <div className="flex flex-col items-center justify-center space-y-8 py-6">
              <button 
                onClick={toggleLive}
                disabled={!isPremium}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-2xl ${isActive ? 'bg-indigo-600 shadow-indigo-500/40 ring-8 ring-indigo-500/20' : 'bg-white/5 border border-white/10 group-hover:bg-white/10'}`}
              >
                <Mic className={`w-12 h-12 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                {isActive && (
                  <span className="absolute inset-0 rounded-full border-4 border-white animate-ping opacity-20"></span>
                )}
              </button>
              
              <div className="text-center">
                <p className={`text-sm font-bold uppercase tracking-widest mb-1 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}>
                  {isActive ? 'Live & Converting' : 'System Idle'}
                </p>
                <p className="text-xs text-slate-600">Mic: System Default</p>
              </div>

              {!isPremium && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-yellow-500 mb-1">Premium Locked</p>
                    <p className="text-[10px] text-yellow-500/70 leading-relaxed">Live background conversion requires a Premium or Ultra membership.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Latency</span>
                <span className="text-green-500 font-mono font-bold">{latency}ms</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-500/50 w-[15%]"></div>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-[28px] border border-white/5">
            <h3 className="text-sm font-bold text-white mb-6 flex items-center space-x-2">
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Audio Routing</span>
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10">
                <div className="flex items-center space-x-3">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs text-slate-300">Input Device</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-600" />
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10">
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-slate-300">Virtual Output</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Visualizer & Status */}
          <div className="glass p-8 rounded-[32px] border border-white/5 h-64 flex flex-col items-center justify-center relative group">
            <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <canvas ref={canvasRef} width={600} height={100} className="w-full h-24 mb-6" />
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Input Level</p>
                <div className="flex space-x-1 h-3 items-end">
                   {[1,2,3,4,5,6,7,8].map(i => (
                     <div key={i} className={`w-1 rounded-full transition-all ${isActive ? 'bg-indigo-500' : 'bg-slate-700'}`} style={{height: isActive ? `${Math.random()*100}%` : '20%'}}></div>
                   ))}
                </div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">AI Processing</p>
                <p className="text-sm font-bold text-white">{isActive ? '98.4%' : '0%'}</p>
              </div>
            </div>
          </div>

          {/* Voice Quick Selection */}
          <div className="glass p-8 rounded-[32px] border border-white/5">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-bold text-white">Live Voice Selection</h2>
               <div className="px-3 py-1 bg-indigo-500/10 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/20">
                 Native Audio Engine
               </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {['Professional Male', 'Friendly Female', 'Cyber Rogue', 'Titan Prime'].map((voice) => (
                 <div 
                   key={voice}
                   onClick={() => setSelectedVoice(voice)}
                   className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${selectedVoice === voice ? 'bg-indigo-600/20 border-indigo-500' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                 >
                   <div className="flex items-center space-x-4">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedVoice === voice ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                       <Zap className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="text-sm font-bold text-white">{voice}</h4>
                       <p className="text-[10px] text-slate-500">Live Optimized</p>
                     </div>
                   </div>
                   {selectedVoice === voice && <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>}
                 </div>
               ))}
             </div>

             <div className="mt-8 p-4 bg-slate-900/50 rounded-2xl border border-dashed border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-4 h-4 text-slate-500" />
                  <p className="text-[10px] text-slate-400">Desktop app must be running to use this feature in other apps like Discord or Games.</p>
                </div>
                <Link to="/download" className="text-[10px] font-bold text-indigo-400 hover:underline">Setup Guide</Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
