
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Premium from './pages/Premium';
import Profile from './pages/Profile';
import Converter from './pages/Converter';
import Download from './pages/Download';
import Legal from './pages/Legal';
import { UserProfile, MembershipType } from './types';
import { FIREBASE_CONFIG } from './constants';

// Initialize Firebase (Compatibility Mode)
const firebase = (window as any).firebase;

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}
const auth = firebase.auth();
const db = firebase.firestore();

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (firebaseUser: any) => {
      if (firebaseUser) {
        const userRef = db.collection('users').doc(firebaseUser.uid);
        
        const unsubscribeDoc = userRef.onSnapshot(async (doc: any) => {
          if (doc.exists) {
            const data = doc.data();
            
            // Real-time Expiry Logic
            if (data.membership !== MembershipType.FREE && data.expiryDate) {
              const now = new Date().getTime();
              const expiry = new Date(data.expiryDate).getTime();
              
              if (now > expiry) {
                // Membership has expired, update Firestore
                await userRef.update({
                  membership: MembershipType.FREE,
                  expiryDate: null
                });
                return;
              }
            }

            setUser({
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              photoURL: firebaseUser.photoURL || '',
              membership: data.membership || MembershipType.FREE,
              expiryDate: data.expiryDate || null
            });
          } else {
            const newUser: UserProfile = {
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              photoURL: firebaseUser.photoURL || '',
              membership: MembershipType.FREE,
              expiryDate: null
            };
            userRef.set({
              uid: firebaseUser.uid,
              name: newUser.name,
              email: newUser.email,
              membership: newUser.membership,
              expiryDate: newUser.expiryDate,
              photoURL: newUser.photoURL,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            setUser(newUser);
          }
          setLoading(false);
        });

        return () => unsubscribeDoc();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-indigo-400 font-bold tracking-widest text-sm animate-pulse">CONNECTING TO SECURE CLOUD...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200">
        <Navbar user={user} login={login} logout={logout} />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/premium" element={<Premium user={user} onLogin={login} />} />
            <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
            <Route path="/convert" element={<Converter user={user} />} />
            <Route path="/download" element={<Download />} />
            <Route path="/legal/:type" element={<Legal />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
