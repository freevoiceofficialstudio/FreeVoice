import React, { useState } from 'react';
import { Monitor, Smartphone, Apple, ShieldCheck, Download as DownloadIcon } from 'lucide-react';

const Download: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDesktopDownload = () => {
    setDownloaded(true);
    window.location.href =
      'https://github.com/freevoiceofficialstudio/desktopapp/releases/latest/download/FreeVoice-Setup.exe';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
        Take Free Voice <span className="text-indigo-500">Everywhere</span>
      </h1>

      <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-16">
        Unlock system-wide live voice changing on PC and Mobile. Low latency, ultra performance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
        
        {/* Desktop */}
        <div className="glass p-12 rounded-[48px] border border-white/10 relative group overflow-hidden">
          <Monitor className="w-16 h-16 text-indigo-500 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-white mb-4">Desktop App</h2>
          <p className="text-slate-400 mb-10">
            System-wide mic interception for Windows & macOS. Perfect for Discord and games.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleDesktopDownload}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all"
            >
              <DownloadIcon className="w-5 h-5" />
              <span>Download for Windows</span>
            </button>

            {downloaded && (
              <p className="text-green-400 text-sm font-semibold">
                Thanks for downloading Free Voice 💚
              </p>
            )}

            <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
              <Apple className="w-3 h-3" />
              <span>macOS M1/M2 support included</span>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="glass p-12 rounded-[48px] border border-white/10 relative group overflow-hidden">
          <Smartphone className="w-16 h-16 text-purple-500 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-white mb-4">Mobile App</h2>
          <p className="text-slate-400 mb-10">
            Real-time voice modulation for calls and voice chats. Android first support.
          </p>

          <button className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all">
            <DownloadIcon className="w-5 h-5" />
            <span>Download for Android</span>
          </button>

          <div className="text-xs text-slate-500 mt-2">
            iOS coming soon
          </div>
        </div>
      </div>

      <div className="inline-flex items-center space-x-3 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 font-bold">
        <ShieldCheck className="w-5 h-5" />
        <span>Verified Secure & Malware Free</span>
      </div>
    </div>
  );
};

export default Download;
