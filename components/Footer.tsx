
import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, OWNER_NAME } from '../constants';
import { Mail, Shield, Info, ExternalLink, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  const handleContact = () => {
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=Help/Support - Free Voice`;
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-bold tracking-tight text-white">Free<span className="text-indigo-500">Voice</span></span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
              Experience the next generation of voice conversion. Record, convert, and stream your voice using ultra-realistic AI technology.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
              <span>Developer:</span>
              <span className="text-indigo-400">{OWNER_NAME}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/convert" className="text-slate-400 hover:text-white transition-colors">AI Converter</Link></li>
              <li><Link to="/premium" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/download" className="text-slate-400 hover:text-white transition-colors">Download App</Link></li>
              <li><button onClick={handleContact} className="text-slate-400 hover:text-white transition-colors flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Contact Us</span>
              </button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/legal/privacy" className="text-slate-400 hover:text-white transition-colors flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Privacy Policy</span>
              </Link></li>
              <li><Link to="/legal/terms" className="text-slate-400 hover:text-white transition-colors flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Terms of Service</span>
              </Link></li>
              <li><Link to="/legal/about" className="text-slate-400 hover:text-white transition-colors flex items-center space-x-2">
                <Info className="w-4 h-4" />
                <span>About Us</span>
              </Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Free Voice. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
