import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { Time } from "../backend";

// Medicine Order
export function useSubmitMedicineOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      patientName,
      mobileNumber,
      prescriptionFileUrl,
      deliveryDate,
      deliveryTime,
      deliveryTimingPreference,
      fullAddress,
    }: {
      patientName: string;
      mobileNumber: string;
      prescriptionFileUrl: string | null;
      deliveryDate: string;
      deliveryTime: Time;
      deliveryTimingPreference: string;
      fullAddress: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitMedicineOrder(
        patientName,
        mobileNumber,
        prescriptionFileUrl,
        deliveryDate,
        deliveryTime,
        deliveryTimingPreference,
        fullAddress
      );
    },
  });
}

// Pathology Booking
export function useSubmitPathologyBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      patientName,
      mobileNumber,
      selectedTests,
      date,
      time,
      sampleCollectionType,
    }: {
      patientName: string;
      mobileNumber: string;
      selectedTests: string[];
      date: string;
      time: Time;
      sampleCollectionType: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitPathologyBooking(
        patientName,
        mobileNumber,
        selectedTests,
        date,
        time,
        sampleCollectionType
      );
    },
  });
}

// Ultrasound Booking
export function useSubmitUltrasoundBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      patientName,
      mobileNumber,
      selectedService,
      date,
      time,
    }: {
      patientName: string;
      mobileNumber: string;
      selectedService: string;
      date: string;
      time: Time;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitUltrasoundBooking(
        patientName,
        mobileNumber,
        selectedService,
        date,
        time
      );
    },
  });
}

// Doctor Appointment
export function useSubmitDoctorAppointment() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      doctorName,
      patientName,
      mobileNumber,
      appointmentDate,
      appointmentTime,
      reasonForVisit,
    }: {
      doctorName: string;
      patientName: string;
      mobileNumber: string;
      appointmentDate: string;
      appointmentTime: Time;
      reasonForVisit: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitDoctorAppointment(
        doctorName,
        patientName,
        mobileNumber,
        appointmentDate,
        appointmentTime,
        reasonForVisit
      );
    },
  });
}
