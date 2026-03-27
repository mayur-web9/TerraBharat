export interface Destination {
  id: string;
  name: string;
  district: string;
  category: 'waterfall' | 'temple' | 'wildlife' | 'tribal' | 'historical' | 'park';
  description: string;
  short_description: string;
  latitude?: number;
  longitude?: number;
  images: string[];
  best_time?: string;
  entry_fee: number;
  is_featured: boolean;
  created_at: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  category: 'festival' | 'fair' | 'cultural' | 'sports';
  date_start: string;
  date_end: string;
  location: string;
  image_url?: string;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  rating: number;
  comment?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  target_type: 'destination';
  target_id: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  user_email: string;
  user_name: string;
  message: string;
  category: 'bug' | 'suggestion' | 'praise' | 'other';
  created_at: string;
}

export interface Marketplace {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  tags: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'tourist' | 'guide' | 'admin';
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}
