import {
  Appointment,
  DayAvailability,
  Psychologist,
  SessionPeriod,
  VerificationRequest,
  WeeklyAvailabilityBlock,
} from "./types";

const TODAY = new Date("2026-10-08T00:00:00");

const SLOT_TEMPLATE: { time: string; period: SessionPeriod }[] = [
  { time: "10:00 AM", period: "morning" },
  { time: "11:00 AM", period: "morning" },
  { time: "2:00 PM", period: "afternoon" },
  { time: "3:30 PM", period: "afternoon" },
  { time: "6:00 PM", period: "evening" },
  { time: "6:30 PM", period: "evening" },
  { time: "7:30 PM", period: "evening" },
];

function toLocalISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildAvailability(unavailableIndices: number[][]): DayAvailability[] {
  const days: DayAvailability[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(TODAY);
    date.setDate(TODAY.getDate() + i);
    const weekday = date.toLocaleDateString("en-IN", { weekday: "long" });
    const unavailable = unavailableIndices[i] ?? [];
    days.push({
      date: toLocalISODate(date),
      weekday,
      slots: SLOT_TEMPLATE.map((s, idx) => ({
        ...s,
        available: !unavailable.includes(idx),
      })),
    });
  }
  return days;
}

const DEFAULT_WEEKLY: WeeklyAvailabilityBlock[] = [
  { day: "Monday", ranges: [{ start: "10:00 AM", end: "1:00 PM" }, { start: "4:00 PM", end: "8:00 PM" }] },
  { day: "Tuesday", ranges: [{ start: "10:00 AM", end: "2:00 PM" }, { start: "5:00 PM", end: "8:00 PM" }] },
  { day: "Wednesday", ranges: [{ start: "10:00 AM", end: "1:00 PM" }, { start: "4:00 PM", end: "8:00 PM" }] },
  { day: "Thursday", ranges: [{ start: "10:00 AM", end: "2:00 PM" }, { start: "5:00 PM", end: "8:00 PM" }] },
  { day: "Friday", ranges: [{ start: "10:00 AM", end: "1:00 PM" }, { start: "4:00 PM", end: "7:00 PM" }] },
  { day: "Saturday", ranges: [{ start: "11:00 AM", end: "3:00 PM" }] },
  { day: "Sunday", ranges: [] },
];

export const PSYCHOLOGISTS: Psychologist[] = [
  {
    id: "ananya-mehta",
    name: "Dr. Ananya Mehta",
    designation: "Clinical Psychologist",
    verified: true,
    experienceYears: 8,
    specialisations: ["Anxiety", "Stress", "Workplace Wellbeing", "Relationships"],
    languages: ["English", "Hindi", "Marathi"],
    fee: 800,
    sessionDuration: 45,
    consultationTypes: ["video", "audio"],
    rating: 4.9,
    reviewCount: 212,
    gender: "female",
    about:
      "Dr. Ananya Mehta is a clinical psychologist with eight years of experience helping working professionals manage anxiety, stress and relationship challenges. She takes an integrative, evidence-based approach tailored to each client.",
    qualifications: ["M.Phil Clinical Psychology, TISS Mumbai", "RCI Licensed Psychologist"],
    avatarColor: "#b8673a",
    nextAvailable: "Today, 6:30 PM",
    availability: buildAvailability([[], [0, 1], [], [4], [], [2, 3], []]),
    weeklyAvailability: DEFAULT_WEEKLY,
    reviews: [
      { id: "r1", authorInitial: "R", rating: 5, comment: "Felt heard from the very first session. Practical guidance, not just listening.", date: "2026-09-28" },
      { id: "r2", authorInitial: "K", rating: 5, comment: "Helped me navigate a difficult work transition with a lot of patience.", date: "2026-09-12" },
      { id: "r3", authorInitial: "S", rating: 4, comment: "Good experience overall, scheduling was easy.", date: "2026-08-30" },
    ],
    monthlyEarnings: 42800,
    completedSessions: 54,
    pendingPayout: 6400,
    blockedDates: [],
    vacationMode: false,
  },
  {
    id: "rohan-shah",
    name: "Dr. Rohan Shah",
    designation: "Counselling Psychologist",
    verified: true,
    experienceYears: 6,
    specialisations: ["Depression", "Grief", "Self-esteem", "Career Stress"],
    languages: ["English", "Hindi", "Gujarati"],
    fee: 700,
    sessionDuration: 45,
    consultationTypes: ["video", "audio"],
    rating: 4.8,
    reviewCount: 158,
    gender: "male",
    about:
      "Dr. Rohan Shah specialises in counselling psychology with a focus on grief, self-esteem and career-related stress. He creates a calm, non-judgemental space for clients to work through difficult emotions.",
    qualifications: ["M.A. Counselling Psychology, Ambedkar University", "RCI Licensed Psychologist"],
    avatarColor: "#5c584f",
    nextAvailable: "Tomorrow, 5:00 PM",
    availability: buildAvailability([[], [], [5, 6], [], [1], [], []]),
    weeklyAvailability: DEFAULT_WEEKLY,
    reviews: [
      { id: "r1", authorInitial: "A", rating: 5, comment: "Very grounded and easy to talk to.", date: "2026-09-20" },
      { id: "r2", authorInitial: "P", rating: 5, comment: "Helped me through a tough period after a loss in the family.", date: "2026-09-02" },
    ],
    monthlyEarnings: 31200,
    completedSessions: 41,
    pendingPayout: 4200,
    blockedDates: [],
    vacationMode: false,
  },
  {
    id: "priya-nair",
    name: "Dr. Priya Nair",
    designation: "Child & Adolescent Psychologist",
    verified: true,
    experienceYears: 10,
    specialisations: ["Adolescent Mental Health", "Parenting", "Anxiety", "ADHD"],
    languages: ["English", "Malayalam", "Hindi"],
    fee: 900,
    sessionDuration: 50,
    consultationTypes: ["video"],
    rating: 4.9,
    reviewCount: 267,
    gender: "female",
    about:
      "Dr. Priya Nair has over a decade of experience working with adolescents and families. She works closely with parents to build supportive environments for young people navigating anxiety, attention difficulties and developmental changes.",
    qualifications: ["Ph.D. Developmental Psychology, Delhi University", "RCI Licensed Psychologist"],
    avatarColor: "#9c6b22",
    nextAvailable: "Today, 7:30 PM",
    availability: buildAvailability([[6], [], [], [], [0, 1], [], [2]]),
    weeklyAvailability: DEFAULT_WEEKLY,
    reviews: [
      { id: "r1", authorInitial: "M", rating: 5, comment: "My daughter finally opened up about school stress. Very grateful.", date: "2026-09-15" },
    ],
    monthlyEarnings: 51600,
    completedSessions: 61,
    pendingPayout: 7800,
    blockedDates: [],
    vacationMode: false,
  },
  {
    id: "arjun-kapoor",
    name: "Dr. Arjun Kapoor",
    designation: "Clinical Psychologist",
    verified: true,
    experienceYears: 5,
    specialisations: ["Workplace Wellbeing", "Burnout", "Anxiety", "Sleep"],
    languages: ["English", "Hindi", "Punjabi"],
    fee: 650,
    sessionDuration: 45,
    consultationTypes: ["video", "audio"],
    rating: 4.7,
    reviewCount: 94,
    gender: "male",
    about:
      "Dr. Arjun Kapoor works primarily with early and mid-career professionals dealing with burnout, workplace stress and sleep difficulties, combining CBT techniques with practical lifestyle coaching.",
    qualifications: ["M.Phil Clinical Psychology, NIMHANS Bengaluru", "RCI Licensed Psychologist"],
    avatarColor: "#3f6b4f",
    nextAvailable: "Tomorrow, 10:00 AM",
    availability: buildAvailability([[], [3, 4], [], [], [], [0], []]),
    weeklyAvailability: DEFAULT_WEEKLY,
    reviews: [
      { id: "r1", authorInitial: "N", rating: 5, comment: "Practical strategies that actually fit my schedule.", date: "2026-09-18" },
    ],
    monthlyEarnings: 24400,
    completedSessions: 33,
    pendingPayout: 3100,
    blockedDates: [],
    vacationMode: false,
  },
  {
    id: "meera-iyer",
    name: "Dr. Meera Iyer",
    designation: "Relationship & Family Therapist",
    verified: false,
    experienceYears: 4,
    specialisations: ["Couples Therapy", "Family Conflict", "Communication"],
    languages: ["English", "Tamil", "Hindi"],
    fee: 750,
    sessionDuration: 50,
    consultationTypes: ["video"],
    rating: 4.6,
    reviewCount: 48,
    gender: "female",
    about:
      "Dr. Meera Iyer focuses on couples and family therapy, helping partners and families build healthier communication patterns in a structured, private setting.",
    qualifications: ["M.A. Family Therapy, TISS Mumbai"],
    avatarColor: "#a3402f",
    nextAvailable: "In 2 days",
    availability: buildAvailability([[], [], [], [], [], [], []]),
    weeklyAvailability: DEFAULT_WEEKLY,
    reviews: [],
    monthlyEarnings: 9800,
    completedSessions: 12,
    pendingPayout: 1400,
    blockedDates: [],
    vacationMode: false,
  },
];

export const CURRENT_CLIENT = {
  id: "client-aarav",
  name: "Aarav Sharma",
  email: "aarav.sharma@example.com",
  phone: "+91 98765 43210",
};

export const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: "appt-seed-1",
    clientId: CURRENT_CLIENT.id,
    clientName: CURRENT_CLIENT.name,
    clientEmail: CURRENT_CLIENT.email,
    clientPhone: CURRENT_CLIENT.phone,
    reason: "Work-related stress and difficulty sleeping",
    psychologistId: "ananya-mehta",
    date: PSYCHOLOGISTS[0].availability[0].date,
    weekday: PSYCHOLOGISTS[0].availability[0].weekday,
    time: "6:30 PM",
    duration: 45,
    type: "video",
    status: "upcoming",
    paymentStatus: "paid",
    fee: 800,
    platformFee: 60,
    createdAt: "2026-10-05",
  },
  {
    id: "appt-seed-2",
    clientId: CURRENT_CLIENT.id,
    clientName: CURRENT_CLIENT.name,
    clientEmail: CURRENT_CLIENT.email,
    clientPhone: CURRENT_CLIENT.phone,
    psychologistId: "rohan-shah",
    date: "2026-09-16",
    weekday: "Wednesday",
    time: "5:00 PM",
    duration: 45,
    type: "audio",
    status: "completed",
    paymentStatus: "paid",
    fee: 700,
    platformFee: 55,
    createdAt: "2026-09-10",
  },
  {
    id: "appt-seed-3",
    clientId: CURRENT_CLIENT.id,
    clientName: CURRENT_CLIENT.name,
    clientEmail: CURRENT_CLIENT.email,
    clientPhone: CURRENT_CLIENT.phone,
    psychologistId: "priya-nair",
    date: "2026-09-02",
    weekday: "Wednesday",
    time: "7:30 PM",
    duration: 50,
    type: "video",
    status: "cancelled",
    paymentStatus: "refunded",
    fee: 900,
    platformFee: 70,
    createdAt: "2026-08-28",
  },
];

export const VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: "ver-1",
    psychologistId: "meera-iyer",
    psychologistName: "Dr. Meera Iyer",
    submittedAt: "2026-10-04",
    status: "pending",
    documents: [
      { label: "Qualification documents", status: "submitted" },
      { label: "Professional registration", status: "submitted" },
      { label: "Identity verification", status: "submitted" },
    ],
  },
  {
    id: "ver-2",
    psychologistId: "arjun-kapoor",
    psychologistName: "Dr. Arjun Kapoor",
    submittedAt: "2026-08-20",
    status: "approved",
    documents: [
      { label: "Qualification documents", status: "verified" },
      { label: "Professional registration", status: "verified" },
      { label: "Identity verification", status: "verified" },
    ],
  },
];

export const PLATFORM_FEE_RATE = 0.075;

export const CURRENT_PSYCHOLOGIST_ID = "ananya-mehta";

export function getPsychologist(id: string) {
  return PSYCHOLOGISTS.find((p) => p.id === id);
}
