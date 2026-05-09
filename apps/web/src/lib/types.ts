export type Role = 'ADMIN' | 'MANAGER';
export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'WON' | 'LOST';

export type Service = {
  id: number;
  title: string;
  slug: string;
  description: string;
  priceLabel?: string | null;
  durationMinutes?: number | null;
  imageUrl?: string | null;
  active?: boolean;
  sortOrder?: number;
};

export type Coach = {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string | null;
  specialities: string[];
  active?: boolean;
  sortOrder?: number;
};

export type Membership = {
  id: number;
  title: string;
  price: number | string;
  period: string;
  description: string;
  benefits: string[];
  active?: boolean;
  sortOrder?: number;
};

export type ScheduleItem = {
  id: number;
  title: string;
  area: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  capacity?: number | null;
  active?: boolean;
  coachId?: number | null;
  serviceId?: number | null;
  coach?: Coach | null;
  service?: Service | null;
};

export type Event = {
  id: number;
  title: string;
  slug: string;
  description: string;
  startsAt: string;
  endsAt?: string | null;
  location: string;
  imageUrl?: string | null;
  active?: boolean;
};

export type User = {
  id: number;
  email: string;
  name: string;
  role: Role;
};

export type LeadComment = {
  id: number;
  body: string;
  createdAt: string;
  user: User;
};

export type Lead = {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  interest?: string | null;
  source?: string | null;
  status: LeadStatus;
  comments: LeadComment[];
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};
