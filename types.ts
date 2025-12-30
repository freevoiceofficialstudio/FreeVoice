
export enum MembershipType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ULTRA = 'ULTRA'
}

export interface UserProfile {
  name: string;
  email: string;
  photoURL?: string;
  membership: MembershipType;
  expiryDate: string | null; // ISO string
}

export interface Voice {
  id: string;
  name: string;
  description: string;
  tier: MembershipType;
  category: 'Human' | 'Fantasy' | 'Robotic' | 'Anime';
  previewUrl: string;
  isDownloaded: boolean;
}

export interface VoiceConfig {
  voices: Voice[];
  version: string;
  lastUpdated: string;
}
