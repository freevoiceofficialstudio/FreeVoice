
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { OWNER_NAME } from '../constants';

const Legal: React.FC = () => {
  const { type } = useParams<{ type: string }>();

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy & Data Protection',
          content: `
            <div class="space-y-8">
              <section>
                <h3 class="text-xl font-bold text-white mb-4">1. Our Commitment</h3>
                <p class="mb-4">At Free Voice, we understand that your voice is a unique part of your identity. We are committed to protecting your privacy while providing cutting-edge AI voice conversion technology. This policy explains how we handle data when you use our web, desktop, and mobile applications.</p>
              </section>

              <section>
                <h3 class="text-xl font-bold text-white mb-4">2. Voice Data Processing</h3>
                <p class="mb-4"><strong>Zero Persistence Policy:</strong> We do NOT store your original voice recordings or your converted audio files on our servers. All voice processing is designed to be ephemeral:</p>
                <ul class="list-disc pl-6 space-y-2 mb-4 text-slate-400">
                  <li><strong>Local Processing:</strong> Whenever possible, voice modulation occurs locally on your device.</li>
                  <li><strong>Transient Streaming:</strong> For high-fidelity conversions that require cloud-based AI models, audio data is sent via encrypted streams. These segments are processed in RAM and destroyed immediately after the conversion is returned to you.</li>
                  <li><strong>No Training on User Data:</strong> We do NOT use your voice recordings to train or improve our AI models without your explicit, separate consent.</li>
                </ul>
              </section>

              <section>
                <h3 class="text-xl font-bold text-white mb-4">3. Information We Collect</h3>
                <p class="mb-4">To provide our services, we collect the following minimal information:</p>
                <ul class="list-disc pl-6 space-y-2 mb-4 text-slate-400">
                  <li><strong>Identity:</strong> Name and email address via Google Sign-In. This is used solely to identify your account and manage your membership.</li>
                  <li><strong>Membership Status:</strong> We store your subscription tier and expiry date in our secure database to unlock premium features across your devices.</li>
                  <li><strong>Technical Logs:</strong> Minimal device information (OS version, app version) to ensure compatibility and prevent system abuse.</li>
                </ul>
              </section>

              <section>
                <h3 class="text-xl font-bold text-white mb-4">4. Third-Party Services</h3>
                <p class="mb-4">We use industry-leading partners to ensure service reliability:</p>
                <ul class="list-disc pl-6 space-y-2 mb-4 text-slate-400">
                  <li><strong>Stripe:</strong> All payments are handled by Stripe. We never see or store your credit card or billing details.</li>
                  <li><strong>Firebase:</strong> Our database and authentication are secured by Google's Firebase infrastructure.</li>
                </ul>
              </section>

              <section>
                <h3 class="text-xl font-bold text-white mb-4">5. Security Measures</h3>
                <p class="mb-4">We employ end-to-end encryption for all data transfers. Our membership verification system is server-side, meaning your status is protected against unauthorized modifications or bypasses. Even in offline mode, the system uses secure cached tokens to verify your rights to specific voice models.</p>
              </section>
            </div>
          `
        };
      case 'about':
        return {
          title: 'About Free Voice',
          content: `
            <div class="space-y-12">
              <section>
                <h3 class="text-2xl font-bold text-white mb-4">The Vision</h3>
                <p class="mb-4 text-lg">Free Voice was established with a singular, powerful vision: to democratize advanced AI vocal technology. Founded by <strong>${OWNER_NAME}</strong>, the platform bridges the gap between complex neural network processing and daily digital interaction.</p>
                <p class="text-slate-400">In an era where digital identity is becoming as significant as physical identity, we believe everyone should have the tools to express themselves creatively, maintain their privacy, or simply enhance their digital presence without technical barriers.</p>
              </section>

              <section>
                <h3 class="text-2xl font-bold text-white mb-4">Technological Innovation</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div class="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 class="text-indigo-400 font-bold mb-2">Neural Conversion</h4>
                    <p class="text-sm">Our proprietary engine uses multi-stage neural voice conversion (NVC) to ensure that converted audio retains the natural prosody, emotion, and rhythm of the original speaker while adopting the target timbre perfectly.</p>
                  </div>
                  <div class="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 class="text-purple-400 font-bold mb-2">Real-Time Low Latency</h4>
                    <p class="text-sm">By optimizing our inference models for edge computing, we've achieved sub-50ms latency in our desktop and mobile applications, making live conversation in games and calls feel completely natural.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 class="text-2xl font-bold text-white mb-4">A Unified Ecosystem</h3>
                <p class="mb-4">Unlike fragmented tools, Free Voice offers a seamless experience across all platforms. Your identity, your downloaded voices, and your membership follow you everywhere.</p>
                <ul class="list-disc pl-6 space-y-4 text-slate-400">
                  <li><strong class="text-white">Web Experience:</strong> Instant conversions and management from any browser with no installation.</li>
                  <li><strong class="text-white">Desktop Power:</strong> Advanced system-wide driver level microphone interception for professional gaming and streaming.</li>
                  <li><strong class="text-white">Mobile Freedom:</strong> Background service integration for real-time modulation during phone calls and mobile voice chats.</li>
                </ul>
              </section>

              <section>
                <h3 class="text-2xl font-bold text-white mb-4">Our Commitment to Ethics</h3>
                <p class="mb-4">As AI technology evolves, so does our responsibility. Free Voice is built on the foundation of "Responsible AI." We implement strict usage policies to prevent the misuse of our technology for malicious deepfakes or harmful impersonation.</p>
                <p class="text-slate-400 italic">"Our goal is to empower creators, not to replace authenticity. We believe AI is a tool for human enhancement, a way to unlock voices that were previously unheard." — ${OWNER_NAME}</p>
              </section>

              <section>
                <h3 class="text-2xl font-bold text-white mb-4">The Journey So Far</h3>
                <p class="mb-4">What started as a small experimental project has grown into a comprehensive suite of AI tools serving thousands of users globally. Our roadmap includes expanding our "Ultra-Realistic" library to include diverse dialects, emotional presets, and community-driven voice modeling.</p>
              </section>
            </div>
          `
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          content: `
            <div class="space-y-8">
              <section>
                <h3 class="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h3>
                <p class="mb-4">By accessing Free Voice, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>
              </section>

              <section>
                <h3 class="text-xl font-bold text-white mb-4">2. Prohibited Uses</h3>
                <p class="mb-4">You agree NOT to use Free Voice to:</p>
                <ul class="list-disc pl-6 space-y-2 mb-4 text-slate-400">
                  <li>Commit fraud or misrepresent your identity for illegal gains.</li>
                  <li>Harass, threaten, or stalk others.</li>
                  <li>Bypass or attempt to bypass membership restrictions.</li>
                  <li>Reverse engineer our proprietary voice models or applications.</li>
                </ul>
              </section>

              <section>
                <h3 class="text-xl font-bold text-white mb-4">3. Membership & Payments</h3>
                <p class="mb-4">Premium features are granted based on valid subscriptions. Payments are non-refundable unless required by law. We reserve the right to terminate accounts that violate our "Fair Use" policy (e.g., using a personal account for high-volume automated bot services).</p>
              </section>

              <section>
                <h3 class="text-xl font-bold text-white mb-4">4. Disclaimer</h3>
                <p class="mb-4">The service is provided "as is". While we strive for 100% uptime and the highest realism, we cannot guarantee that the AI will perfectly mimic every voice or be available at all times during server maintenance.</p>
              </section>
            </div>
          `
        };
      default:
        return { title: 'Legal Information', content: '<p>Select a legal document from the footer.</p>' };
    }
  };

  const { title, content } = getContent();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link to="/" className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block font-bold">← Back to Home</Link>
      <div className="glass p-10 md:p-16 rounded-[48px] border border-white/10 shadow-2xl shadow-indigo-500/5">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-12 gradient-text tracking-tight">{title}</h1>
        <div 
          className="text-slate-300 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-16 pt-8 border-t border-white/5">
          {/* Fix: Changed 'class' to 'className' on the span element to resolve React attribute error */}
          <p className="text-sm text-slate-500 italic">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}. Free Voice operates under a policy of transparency and user empowerment. For specific inquiries, contact our founder at <span className="text-indigo-400">jobsofficial786@gmail.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Legal;
