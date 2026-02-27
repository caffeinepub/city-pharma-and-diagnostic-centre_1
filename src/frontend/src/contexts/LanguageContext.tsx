import React, { createContext, useContext, useState } from "react";

type Language = "EN" | "HI";

interface Translations {
  // Nav
  navHome: string;
  navMedicine: string;
  navPathology: string;
  navUltrasound: string;
  navDoctors: string;
  navContact: string;
  // Home
  heroSubtitle: string;
  heroSubtitleHindi: string;
  bookMedicines: string;
  bookPathology: string;
  bookUltrasound: string;
  bookDoctor: string;
  // Medicine page
  medicineHeading: string;
  medicineSubheading: string;
  prescriptionForm: string;
  patientName: string;
  mobileNumber: string;
  uploadPrescription: string;
  selectDate: string;
  selectTime: string;
  deliveryTiming: string;
  fullAddress: string;
  submitOrder: string;
  orderSuccess: string;
  freeDelivery: string;
  // Pathology page
  pathologyHeading: string;
  pathologySubheading: string;
  bloodTests: string;
  urineTests: string;
  searchTests: string;
  selectTests: string;
  sampleCollection: string;
  homeCollection: string;
  visitCentre: string;
  bookTestNow: string;
  pathologySuccess: string;
  // Ultrasound page
  ultrasoundHeading: string;
  selectService: string;
  bookUltrasoundBtn: string;
  ultrasoundSuccess: string;
  // Doctors page
  doctorsHeading: string;
  selectDoctor: string;
  reasonForVisit: string;
  bookAppointment: string;
  appointmentSuccess: string;
  // Contact page
  contactHeading: string;
  address: string;
  workingHours: string;
  workingHoursValue: string;
  // Common
  name: string;
  phone: string;
  email: string;
  submit: string;
  loading: string;
}

const enTranslations: Translations = {
  navHome: "Home",
  navMedicine: "Medicines",
  navPathology: "Pathology",
  navUltrasound: "Ultrasound",
  navDoctors: "Doctors",
  navContact: "Contact",
  heroSubtitle: "CITY PHARMA AND DIAGNOSTIC CENTRE",
  heroSubtitleHindi: "Your Trusted Healthcare Partner in Bundu Panch Pargana",
  bookMedicines: "Book Medicines",
  bookPathology: "Book Pathology Tests",
  bookUltrasound: "Book Ultrasound",
  bookDoctor: "Book Doctor Appointment",
  medicineHeading: "Medicine Counter & Free Home Delivery",
  medicineSubheading: "All branded & generic medicines available with proper storage and quality assurance.",
  prescriptionForm: "Upload Prescription & Place Order",
  patientName: "Patient Name",
  mobileNumber: "Mobile Number",
  uploadPrescription: "Upload Prescription (Image/PDF)",
  selectDate: "Select Date",
  selectTime: "Select Time",
  deliveryTiming: "Delivery Timing Preference",
  fullAddress: "Full Delivery Address",
  submitOrder: "Order Medicines",
  orderSuccess: "Your medicine order has been placed! We'll contact you shortly.",
  freeDelivery: "Free Delivery within 20 KM",
  pathologyHeading: "Pathology Services – Blood & Urine Tests",
  pathologySubheading: "Accurate, reliable & affordable laboratory testing with strict hygiene standards.",
  bloodTests: "Blood Tests",
  urineTests: "Urine & Microbiology Tests",
  searchTests: "Search tests...",
  selectTests: "Select Tests",
  sampleCollection: "Sample Collection",
  homeCollection: "Home Collection",
  visitCentre: "Visit Centre",
  bookTestNow: "Book Test Now",
  pathologySuccess: "Your pathology test has been booked! Our team will reach out for confirmation.",
  ultrasoundHeading: "Ultrasound & Imaging Services",
  selectService: "Select Service",
  bookUltrasoundBtn: "Book Ultrasound",
  ultrasoundSuccess: "Your ultrasound appointment has been booked successfully!",
  doctorsHeading: "Our Specialist Doctors",
  selectDoctor: "Select Doctor",
  reasonForVisit: "Reason for Visit",
  bookAppointment: "Book Appointment",
  appointmentSuccess: "Your appointment has been booked! We'll confirm your slot shortly.",
  contactHeading: "Contact Us",
  address: "Address",
  workingHours: "Working Hours",
  workingHoursValue: "8:00 AM – 8:00 PM (All Days)",
  name: "Name",
  phone: "Phone",
  email: "Email",
  submit: "Submit",
  loading: "Please wait...",
};

const hiTranslations: Translations = {
  navHome: "होम",
  navMedicine: "दवाइयाँ",
  navPathology: "पैथोलॉजी",
  navUltrasound: "अल्ट्रासाउंड",
  navDoctors: "डॉक्टर",
  navContact: "संपर्क",
  heroSubtitle: "सिटी फार्मा एंड डायग्नोस्टिक सेंटर",
  heroSubtitleHindi: "बुंडू पंच परगना में आपका विश्वसनीय स्वास्थ्य सेवा केंद्र",
  bookMedicines: "दवाई बुक करें",
  bookPathology: "जाँच बुक करें",
  bookUltrasound: "अल्ट्रासाउंड बुक करें",
  bookDoctor: "डॉक्टर अपॉइंटमेंट",
  medicineHeading: "दवाई काउंटर और मुफ्त होम डिलीवरी",
  medicineSubheading: "सभी ब्रांडेड और जेनेरिक दवाइयाँ उचित भंडारण और गुणवत्ता आश्वासन के साथ उपलब्ध।",
  prescriptionForm: "पर्चा अपलोड करें और ऑर्डर दें",
  patientName: "मरीज़ का नाम",
  mobileNumber: "मोबाइल नंबर",
  uploadPrescription: "पर्चा अपलोड करें (फोटो/PDF)",
  selectDate: "तारीख चुनें",
  selectTime: "समय चुनें",
  deliveryTiming: "डिलीवरी का समय",
  fullAddress: "पूरा पता",
  submitOrder: "ऑर्डर करें",
  orderSuccess: "आपका दवाई ऑर्डर हो गया! हम जल्द संपर्क करेंगे।",
  freeDelivery: "20 KM के अंदर मुफ्त डिलीवरी",
  pathologyHeading: "पैथोलॉजी सेवाएँ – रक्त और मूत्र परीक्षण",
  pathologySubheading: "सख्त स्वच्छता मानकों के साथ सटीक, विश्वसनीय और किफायती प्रयोगशाला परीक्षण।",
  bloodTests: "रक्त परीक्षण",
  urineTests: "मूत्र और माइक्रोबायोलॉजी परीक्षण",
  searchTests: "परीक्षण खोजें...",
  selectTests: "परीक्षण चुनें",
  sampleCollection: "नमूना संग्रह",
  homeCollection: "घर से संग्रह",
  visitCentre: "केंद्र पर आएं",
  bookTestNow: "अभी बुक करें",
  pathologySuccess: "आपकी पैथोलॉजी जाँच बुक हो गई! हमारी टीम पुष्टि के लिए संपर्क करेगी।",
  ultrasoundHeading: "अल्ट्रासाउंड और इमेजिंग सेवाएँ",
  selectService: "सेवा चुनें",
  bookUltrasoundBtn: "अल्ट्रासाउंड बुक करें",
  ultrasoundSuccess: "आपका अल्ट्रासाउंड अपॉइंटमेंट सफलतापूर्वक बुक हो गया!",
  doctorsHeading: "हमारे विशेषज्ञ डॉक्टर",
  selectDoctor: "डॉक्टर चुनें",
  reasonForVisit: "मुलाकात का कारण",
  bookAppointment: "अपॉइंटमेंट बुक करें",
  appointmentSuccess: "आपकी अपॉइंटमेंट बुक हो गई! हम जल्द स्लॉट की पुष्टि करेंगे।",
  contactHeading: "संपर्क करें",
  address: "पता",
  workingHours: "काम के घंटे",
  workingHoursValue: "सुबह 8:00 – रात 8:00 (सभी दिन)",
  name: "नाम",
  phone: "फोन",
  email: "ईमेल",
  submit: "जमा करें",
  loading: "कृपया प्रतीक्षा करें...",
};

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "HI" : "EN"));
  };

  const t = language === "EN" ? enTranslations : hiTranslations;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
