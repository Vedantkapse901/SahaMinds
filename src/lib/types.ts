export type ConsultationType = "video" | "audio";

export type SessionPeriod = "morning" | "afternoon" | "evening";

export interface TimeSlot {
  time: string; // "10:00 AM"
  period: SessionPeriod;
  available: boolean;
}

export interface DayAvailability {
  date: string; // ISO date "2026-10-13"
  weekday: string; // "Tuesday"
  slots: TimeSlot[];
}

export interface Review {
  id: string;
  authorInitial: string;
  rating: number;
  comment: string;
  date: string;
}

export interface WeeklyAvailabilityBlock {
  day: string; // "Monday"
  ranges: { start: string; end: string }[];
}

export interface Psychologist {
  id: string;
  name: string;
  designation: string;
  verified: boolean;
  experienceYears: number;
  specialisations: string[];
  languages: string[];
  fee: number;
  sessionDuration: number;
  consultationTypes: ConsultationType[];
  rating: number;
  reviewCount: number;
  gender: "female" | "male" | "non-binary";
  about: string;
  qualifications: string[];
  avatarColor: string;
  nextAvailable: string;
  availability: DayAvailability[];
  weeklyAvailability: WeeklyAvailabilityBlock[];
  reviews: Review[];
  monthlyEarnings: number;
  completedSessions: number;
  pendingPayout: number;
  blockedDates: string[];
  vacationMode: boolean;
}

export type AppointmentStatus =
  | "upcoming"
  | "completed"
  | "cancelled"
  | "pending-verification";

export type PaymentStatus = "paid" | "pending" | "refunded";

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  reason?: string;
  psychologistId: string;
  date: string;
  weekday: string;
  time: string;
  duration: number;
  type: ConsultationType;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  fee: number;
  platformFee: number;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface VerificationDoc {
  label: string;
  status: "submitted" | "verified";
}

export interface VerificationRequest {
  id: string;
  psychologistId: string;
  psychologistName: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  documents: VerificationDoc[];
}

export interface ActivityItem {
  id: string;
  type: "booking" | "payment" | "profile" | "session" | "cancellation";
  label: string;
  detail: string;
  date: string;
}
