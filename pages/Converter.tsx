
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, MembershipType, Voice } from '../types';
import { 
  Mic, 
  Upload, 
  Play, 
  Square, 
  Download, 
  Zap, 
  Lock,
  Search,
  CheckCircle2,
  Trash2,
  Settings2,
  Crown,
  Star,
  Loader2,
  Volume2
} from 'lucide-react';

interface ConverterProps {
  user: UserProfile | null;
}

const Converter: React.FC<ConverterProps> = ({ user }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const mockVoices: Voice[] = [
    { id: '1', name: 'Professional Male', tier: MembershipType.FREE, description: 'Deep, clear and authoritative', category: 'Human', previewUrl: '', isDownloaded: true },
    { id: '2', name: 'Friendly Female', tier: MembershipType.FREE, description: 'Soft, helpful and warm', category: 'Human', previewUrl: '', isDownloaded: true },
    { id: '3', name: 'Gamer Legend', tier: MembershipType.PREMIUM, description: 'Energetic gaming personality', category: 'Human', previewUrl: '', isDownloaded: false },
    { id: '4', name: 'Cyber Rogue', tier: MembershipType.PREMIUM, description: 'Digital glitch effects', category: 'Robotic', previewUrl: '', isDownloaded: false },
    { id: '5', name: 'Forest Elf', tier: MembershipType.ULTRA, description: 'Magical and airy tone', category: 'Fantasy', previewUrl: '', isDownloaded: false },
    { id: '6', name: 'Titan Prime', tier: MembershipType.ULTRA, description: 'Deep metallic resonance', category: 'Robotic', previewUrl: '', isDownloaded: false },
  ];

  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingTime(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordedBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setOutputUrl(null);
    } catch (err) {
      alert('Microphone permission required for recording.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRecordedBlob(file);
      setOutputUrl(null);
    }
  };

  const convertVoice = () => {
    if (!recordedBlob || !selectedVoice) return;
    
    const isPremium = user && (user.membership === MembershipType.PREMIUM || user.membership === MembershipType.ULTRA);
    const isUltra = user && user.membership === MembershipType.ULTRA;

    if (selectedVoice.tier === MembershipType.PREMIUM && !isPremium) {
      alert('This voice requires a PREMIUM membership.');
      return;
    }
    if (selectedVoice.tier === MembershipType.ULTRA && !isUltra) {
      alert('This voice requires an ULTRA membership.');
      return;
    }

    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      setOutputUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); 
    }, 4000);
  };

  const filteredVoices = mockVoices.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Left Side: Audio Sources */}
        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
          <div className="glass p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Volume2 className="w-10 h-10 md:w-12 h-12 text-indigo-400" />
            </div>
            
            <h2 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>Voice Input</span>
            </h2>
            
            <div className="space-y-4">
              <button 
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-full py-6 md:py-8 rounded-2xl flex flex-col items-center justify-center space-y-3 border-2 transition-all relative ${isRecording ? 'bg-red-500/10 border-red-500 text-red-500 shadow-lg shadow-red-500/10' : 'bg-white/5 border-dashed border-white/10 text-slate-400 hover:border-indigo-500/50 hover:bg-white/10'}`}
              >
                {isRecording ? (
                  <>
                    <div className="absolute top-4 right-4 flex items-center space-x-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                      <span className="text-[10px] font-bold tracking-widest">{formatTime(recordingTime)}</span>
                    </div>
                    <Square className="w-8 h-8 md:w-10 h-10 fill-red-500" />
                  </>
                ) : (
                  <Mic className="w-8 h-8 md:w-10 h-10" />
                )}
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
                  {isRecording ? 'Stop Recording' : 'Record Voice'}
                </span>
              </button>

              <div className="relative group/upload">
                <input 
                  type="file" 
                  accept="audio/*" 
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full py-3 md:py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center space-x-2 group-hover/upload:bg-white/10 transition-all">
                  <Upload className="w-4 h-4 md:w-5 h-5" />
                  <span className="text-xs md:text-sm font-bold">Upload Local File</span>
                </div>
              </div>
            </div>

            {recordedBlob && (
              <div className="mt-6 md:mt-8 p-4 md:p-5 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span className="text-[10px] text-indigo-400 uppercase font-bold tracking-widest">Source Ready</span>
                  </div>
                  <button onClick={() => setRecordedBlob(null)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                    <Trash2 className="w-3.5 h-3.5 text-slate-500 hover:text-red-400" />
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <Play className="w-4 h-4 text-white fill-white" />
                  <div className="flex-grow h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-1/3 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Ready</span>
                </div>
              </div>
            )}
          </div>

          <div className="glass p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5 shadow-2xl shadow-indigo-500/5">
            <h2 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Settings2 className="w-5 h-5 text-purple-400" />
              <span>AI Engine</span>
            </h2>
            
            <button 
              onClick={convertVoice}
              disabled={!recordedBlob || !selectedVoice || isConverting}
              className={`w-full py-4 md:py-5 rounded-2xl font-bold text-white shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-3 ${!recordedBlob || !selectedVoice || isConverting ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/20'}`}
            >
              {isConverting ? (
                <>
                  <Loader2 className="w-4 h-4 md:w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 md:w-5 h-5" />
                  <span>Convert Now</span>
                </>
              )}
            </button>

            {outputUrl && (
              <div className="mt-4 md:mt-6 animate-slide-up">
                <a 
                  href={outputUrl} 
                  download="converted_free_voice.mp3"
                  className="w-full py-3 md:py-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center space-x-2 hover:bg-green-500/20 transition-all shadow-lg shadow-green-500/5"
                >
                  <Download className="w-4 h-4 md:w-5 h-5" />
                  <span className="text-xs md:text-sm font-bold">Download Result</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Voice Marketplace */}
        <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
          <div className="glass p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5 h-full flex flex-col">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">AI Voice Models</h2>
                <p className="text-xs md:text-sm text-slate-500">Select a target model</p>
              </div>
              <div className="relative w-full md:w-72 lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search models..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-2xl text-xs md:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 overflow-y-auto max-h-[400px] md:max-h-[580px] pr-1 md:pr-2 scrollbar-thin scrollbar-thumb-white/10 custom-scroll">
              {filteredVoices.map((voice) => {
                const isLocked = (voice.tier === MembershipType.PREMIUM && (!user || user.membership === MembershipType.FREE)) ||
                                (voice.tier === MembershipType.ULTRA && (!user || user.membership !== MembershipType.ULTRA));
                const isSelected = selectedVoice?.id === voice.id;

                return (
                  <div 
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice)}
                    className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer group flex items-start space-x-3 md:space-x-4 relative ${isSelected ? 'bg-indigo-600/15 border-indigo-500/50 ring-1 ring-indigo-500/20' : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/8'}`}
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${isSelected ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 text-slate-500'}`}>
                      {voice.category === 'Human' && <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7" />}
                      {voice.category === 'Robotic' && <Zap className="w-6 h-6 md:w-7 md:h-7" />}
                      {voice.category === 'Fantasy' && <Star className="w-6 h-6 md:w-7 md:h-7" />}
                    </div>
                    
                    <div className="flex-grow min-w-0 pt-0.5">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-bold truncate text-base md:text-lg">{voice.name}</h4>
                        {voice.tier === MembershipType.PREMIUM && <Crown className="w-3 h-3 text-yellow-500" />}
                        {voice.tier === MembershipType.ULTRA && <Star className="w-3 h-3 text-purple-500 fill-purple-500" />}
                      </div>
                      <p className="text-[10px] md:text-xs text-slate-500 leading-tight md:leading-relaxed truncate md:whitespace-normal">{voice.description}</p>
                    </div>

                    <div className="flex-shrink-0 pt-1 md:pt-2">
                      {isLocked ? (
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-900 flex items-center justify-center border border-white/5">
                          <Lock className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-600" />
                        </div>
                      ) : (
                        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-600 group-hover:text-slate-400'}`}>
                          <Play className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                        </div>
                      )}
                    </div>

                    {isSelected && (
                      <div className="absolute -top-1 -right-1">
                        <span className="flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Free Tier Info */}
            <div className="mt-6 md:mt-auto pt-6 border-t border-white/5">
              <div className="flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 md:w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-white uppercase tracking-wider truncate">Free Conversion Limit</p>
                    <p className="text-[9px] md:text-[10px] text-slate-500">Upgrade for unlimited use</p>
                  </div>
                </div>
                <span className="text-xs md:text-sm font-bold text-white whitespace-nowrap ml-2">5 / 5 Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
