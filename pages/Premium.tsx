
import React from 'react';
import { CHECKOUT_LINKS } from '../constants';
import { UserProfile, MembershipType } from '../types';
import { Check, Crown, Zap, Star, LogIn, ShieldCheck } from 'lucide-react';

interface PremiumProps {
  user: UserProfile | null;
  onLogin: () => void;
}

const Premium: React.FC<PremiumProps> = ({ user, onLogin }) => {
  const plans = [
    {
      name: 'Weekly',
      price: '$2.00',
      duration: '7 Days',
      link: CHECKOUT_LINKS.WEEKLY,
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      features: [
        'Live Voice Changing',
        'Unlimited Conversions',
        'Desktop App Access',
        'Standard Human Voices'
      ]
    },
    {
      name: 'Monthly',
      price: '$10.00',
      duration: '30 Days',
      link: CHECKOUT_LINKS.MONTHLY,
      popular: true,
      icon: <Crown className="w-6 h-6 text-yellow-400" />,
      features: [
        'Everything in Weekly',
        'Ultra-Realistic Voices',
        'Mobile App Support',
        'Priority Support',
        'Early Access Features'
      ]
    },
    {
      name: 'Yearly',
      price: '$50.00',
      duration: '365 Days',
      link: CHECKOUT_LINKS.YEARLY,
      icon: <Star className="w-6 h-6 text-purple-400" />,
      features: [
        'Everything in Monthly',
        'Best Value: Save 60%',
        'Commercial Usage Rights',
        'Exclusive Voice Packs',
        'Developer API Access'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your <span className="text-indigo-500">Plan</span></h1>
        <p className="text-slate-400 max-w-xl mx-auto mb-6">
          Unlock the full potential of Free Voice. Real-time conversion, ultra-realistic voices, and system-wide support.
        </p>
        
        {!user && (
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500 text-sm font-semibold animate-pulse">
            <ShieldCheck className="w-4 h-4" />
            <span>Note: You must sign in to save your membership information.</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative p-8 rounded-[32px] glass flex flex-col transition-transform hover:scale-[1.02] ${plan.popular ? 'border-indigo-500/50 ring-1 ring-indigo-500/20 shadow-2xl shadow-indigo-500/10' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                {plan.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-slate-500">/ {plan.duration}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start space-x-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-indigo-400" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {user ? (
              <a 
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 px-6 rounded-2xl font-bold text-center transition-all ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
              >
                Buy with Stripe
              </a>
            ) : (
              <button 
                onClick={onLogin}
                className="w-full py-4 px-6 rounded-2xl font-bold text-center bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center space-x-2 transition-all shadow-lg shadow-indigo-600/20"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In to Buy</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Security Info */}
      <div className="mt-20 p-8 glass rounded-[32px] text-center max-w-3xl mx-auto">
        <h4 className="text-white font-bold mb-4">Secure Checkout Powered by Stripe</h4>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          Your membership is verified in real-time. By signing in, we create a secure profile for you. Once you complete the payment on Stripe, your account status will be updated to reflect your new benefits.
        </p>
        <div className="flex items-center justify-center space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
        </div>
      </div>
    </div>
  );
};

export default Premium;
