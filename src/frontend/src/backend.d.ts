import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UltrasoundBooking {
    id: bigint;
    date: string;
    time: Time;
    mobileNumber: string;
    selectedService: string;
    patientName: string;
}
export interface MedicineOrder {
    id: bigint;
    prescriptionFileUrl?: string;
    deliveryDate: string;
    mobileNumber: string;
    deliveryTime: Time;
    patientName: string;
    fullAddress: string;
    deliveryTimingPreference: string;
}
export interface Time {
    hour: number;
    minute: number;
}
export interface DoctorAppointment {
    id: bigint;
    reasonForVisit: string;
    mobileNumber: string;
    appointmentDate: string;
    appointmentTime: Time;
    patientName: string;
    doctorName: string;
}
export interface PathologyBooking {
    id: bigint;
    selectedTests: Array<string>;
    date: string;
    time: Time;
    mobileNumber: string;
    sampleCollectionType: string;
    patientName: string;
}
export interface backendInterface {
    getDoctorAppointments(): Promise<Array<DoctorAppointment>>;
    getMedicineOrders(): Promise<Array<MedicineOrder>>;
    getPathologyBookings(): Promise<Array<PathologyBooking>>;
    getUltrasoundBookings(): Promise<Array<UltrasoundBooking>>;
    submitDoctorAppointment(doctorName: string, patientName: string, mobileNumber: string, appointmentDate: string, appointmentTime: Time, reasonForVisit: string): Promise<bigint>;
    submitMedicineOrder(patientName: string, mobileNumber: string, prescriptionFileUrl: string | null, deliveryDate: string, deliveryTime: Time, deliveryTimingPreference: string, fullAddress: string): Promise<bigint>;
    submitPathologyBooking(patientName: string, mobileNumber: string, selectedTests: Array<string>, date: string, time: Time, sampleCollectionType: string): Promise<bigint>;
    submitUltrasoundBooking(patientName: string, mobileNumber: string, selectedService: string, date: string, time: Time): Promise<bigint>;
}
