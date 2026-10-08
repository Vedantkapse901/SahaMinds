"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Appointment,
  AppointmentStatus,
  VerificationRequest,
} from "./types";
import {
  SEED_APPOINTMENTS,
  VERIFICATION_REQUESTS,
  PSYCHOLOGISTS,
} from "./mock-data";

interface BlockedSlot {
  psychologistId: string;
  date: string;
  time: string;
}

interface PlatformState {
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
  blockedDates: { psychologistId: string; date: string }[];
  verifications: VerificationRequest[];
  bookAppointment: (appt: Appointment) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  blockSlot: (psychologistId: string, date: string, time: string) => void;
  unblockSlot: (psychologistId: string, date: string, time: string) => void;
  isSlotBlocked: (psychologistId: string, date: string, time: string) => boolean;
  blockDate: (psychologistId: string, date: string) => void;
  unblockDate: (psychologistId: string, date: string) => void;
  setVerificationStatus: (id: string, status: "approved" | "rejected") => void;
  submitVerification: (req: VerificationRequest) => void;
  reset: () => void;
}

export const usePlatformStore = create<PlatformState>()(
  persist(
    (set, get) => ({
      appointments: SEED_APPOINTMENTS,
      blockedSlots: [],
      blockedDates: [],
      verifications: VERIFICATION_REQUESTS,

      bookAppointment: (appt) =>
        set((state) => ({ appointments: [appt, ...state.appointments] })),

      updateAppointmentStatus: (id, status) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status } : a
          ),
        })),

      blockSlot: (psychologistId, date, time) =>
        set((state) => ({
          blockedSlots: [...state.blockedSlots, { psychologistId, date, time }],
        })),

      unblockSlot: (psychologistId, date, time) =>
        set((state) => ({
          blockedSlots: state.blockedSlots.filter(
            (b) =>
              !(
                b.psychologistId === psychologistId &&
                b.date === date &&
                b.time === time
              )
          ),
        })),

      isSlotBlocked: (psychologistId, date, time) =>
        get().blockedSlots.some(
          (b) =>
            b.psychologistId === psychologistId &&
            b.date === date &&
            b.time === time
        ) ||
        get().blockedDates.some(
          (b) => b.psychologistId === psychologistId && b.date === date
        ),

      blockDate: (psychologistId, date) =>
        set((state) => ({
          blockedDates: [...state.blockedDates, { psychologistId, date }],
        })),

      unblockDate: (psychologistId, date) =>
        set((state) => ({
          blockedDates: state.blockedDates.filter(
            (b) => !(b.psychologistId === psychologistId && b.date === date)
          ),
        })),

      setVerificationStatus: (id, status) =>
        set((state) => ({
          verifications: state.verifications.map((v) =>
            v.id === id ? { ...v, status } : v
          ),
        })),

      submitVerification: (req) =>
        set((state) => ({ verifications: [req, ...state.verifications] })),

      reset: () =>
        set({
          appointments: SEED_APPOINTMENTS,
          blockedSlots: [],
          blockedDates: [],
          verifications: VERIFICATION_REQUESTS,
        }),
    }),
    { name: "sahaminds-platform-store", skipHydration: true }
  )
);

export function getAppointmentsForPsychologist(
  appointments: Appointment[],
  psychologistId: string
) {
  return appointments.filter((a) => a.psychologistId === psychologistId);
}

export function getAllPsychologistIds() {
  return PSYCHOLOGISTS.map((p) => p.id);
}
