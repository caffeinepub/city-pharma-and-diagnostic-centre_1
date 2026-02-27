import { useState } from "react";
import { Loader2, CalendarCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SuccessToast, useToast } from "@/components/Toast";
import { useSubmitDoctorAppointment } from "@/hooks/useQueries";

const doctors = [
  {
    id: "swati-lal",
    name: "Dr. Swati Lal",
    initials: "SL",
    specialization: "Gynaecologist & Obstetrician",
    specializationHi: "स्त्री रोग विशेषज्ञ",
    color: "from-pink-500 to-rose-600",
    ringColor: "ring-pink-400",
    badgeColor: "bg-pink-50 text-pink-700",
  },
  {
    id: "faruque",
    name: "Dr. Faruque",
    initials: "F",
    specialization: "Child, Diabetic & General Physician",
    specializationHi: "बाल, मधुमेह और सामान्य चिकित्सक",
    color: "from-blue-500 to-blue-700",
    ringColor: "ring-blue-400",
    badgeColor: "bg-blue-50 text-blue-700",
  },
  {
    id: "rahul-yogendar",
    name: "Dr. Rahul Yogendar Raj",
    initials: "RR",
    specialization: "Orthopaedic & Neurologist",
    specializationHi: "हड्डी रोग और तंत्रिका विशेषज्ञ",
    color: "from-green-500 to-green-700",
    ringColor: "ring-green-400",
    badgeColor: "bg-green-50 text-green-700",
  },
  {
    id: "anup-tirkey",
    name: "Dr. Anup Tirkey",
    initials: "AT",
    specialization: "Dermatologist & Cosmetic Specialist",
    specializationHi: "त्वचा रोग और सौंदर्य विशेषज्ञ",
    color: "from-amber-500 to-orange-600",
    ringColor: "ring-amber-400",
    badgeColor: "bg-amber-50 text-amber-700",
  },
  {
    id: "parmeshwar-lal",
    name: "Dr. Parmeshwar Lal",
    initials: "PL",
    specialization: "Senior Physician (Chest & Neurology)",
    specializationHi: "वरिष्ठ चिकित्सक (छाती और तंत्रिका)",
    color: "from-violet-500 to-purple-700",
    ringColor: "ring-violet-400",
    badgeColor: "bg-violet-50 text-violet-700",
  },
  {
    id: "rl-munda",
    name: "Dr. R. L. Munda",
    initials: "RM",
    specialization: "Senior Physician & Child Specialist",
    specializationHi: "वरिष्ठ चिकित्सक और बाल विशेषज्ञ",
    color: "from-teal-500 to-teal-700",
    ringColor: "ring-teal-400",
    badgeColor: "bg-teal-50 text-teal-700",
  },
  {
    id: "mayank-sharma",
    name: "Dr. Mayank Shekhar Sharma",
    initials: "MS",
    specialization: "Gastroenterologist",
    specializationHi: "पाचन तंत्र विशेषज्ञ",
    color: "from-indigo-500 to-indigo-700",
    ringColor: "ring-indigo-400",
    badgeColor: "bg-indigo-50 text-indigo-700",
  },
  {
    id: "sk-choudhary",
    name: "Dr. S. K. Choudhary",
    initials: "SC",
    specialization: "Senior Dermatologist & Physician",
    specializationHi: "वरिष्ठ त्वचा रोग विशेषज्ञ",
    color: "from-rose-500 to-pink-700",
    ringColor: "ring-rose-400",
    badgeColor: "bg-rose-50 text-rose-700",
  },
  {
    id: "kc-singh-munda",
    name: "Dr. K. C. Singh Munda",
    initials: "KM",
    specialization: "Senior General Physician",
    specializationHi: "वरिष्ठ सामान्य चिकित्सक",
    color: "from-cyan-500 to-cyan-700",
    ringColor: "ring-cyan-400",
    badgeColor: "bg-cyan-50 text-cyan-700",
  },
  {
    id: "baidyanath-sadhu",
    name: "Dr. Baidyanath Sadhu",
    initials: "BS",
    specialization: "Expert Surgeon & General Surgeon",
    specializationHi: "विशेषज्ञ सर्जन",
    color: "from-red-500 to-red-700",
    ringColor: "ring-red-400",
    badgeColor: "bg-red-50 text-red-700",
  },
];

// ECG background animation
function EcgBackground() {
  const ECG_PATH =
    "M0,30 L60,30 L70,30 L80,10 L90,50 L100,30 L110,30 L120,10 L130,30 L140,30 " +
    "L150,30 L160,30 L170,10 L180,50 L190,30 L200,30 L210,30 L220,30 L230,10 L240,50 L250,30 L260,30 " +
    "L270,30 L280,10 L290,50 L300,30 L310,30 L320,30 L330,10 L340,50 L350,30 L360,30";

  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-16 opacity-10" aria-hidden="true">
      <div className="flex w-[200%] animate-ecg-loop">
        {["ecg-bg-a", "ecg-bg-b"].map((key) => (
          <svg key={key} viewBox="0 0 360 60" className="w-1/2 h-16" preserveAspectRatio="none" aria-hidden="true">
            <path d={ECG_PATH} fill="none" stroke="white" strokeWidth="2" />
          </svg>
        ))}
      </div>
    </div>
  );
}

interface FormState {
  doctorName: string;
  patientName: string;
  mobileNumber: string;
  date: string;
  time: string;
  reasonForVisit: string;
}

export function DoctorsPage() {
  const { t, language } = useLanguage();
  const { show, message, showToast, hideToast } = useToast();
  const submitMutation = useSubmitDoctorAppointment();
  const isSubmitting = submitMutation.isPending;

  const [form, setForm] = useState<FormState>({
    doctorName: "",
    patientName: "",
    mobileNumber: "",
    date: "",
    time: "",
    reasonForVisit: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.doctorName || !form.patientName || !form.mobileNumber || !form.date || !form.time) {
      return;
    }
    const [hourStr, minuteStr] = form.time.split(":");
    const hour = parseInt(hourStr ?? "0", 10);
    const minute = parseInt(minuteStr ?? "0", 10);

    submitMutation.mutate(
      {
        doctorName: form.doctorName,
        patientName: form.patientName,
        mobileNumber: form.mobileNumber,
        appointmentDate: form.date,
        appointmentTime: { hour, minute },
        reasonForVisit: form.reasonForVisit,
      },
      {
        onSuccess: () => {
          showToast(t.appointmentSuccess);
          setForm({ doctorName: "", patientName: "", mobileNumber: "", date: "", time: "", reasonForVisit: "" });
        },
        onError: (err) => console.error(err),
      }
    );
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 overflow-hidden text-white">
        <EcgBackground />
        <div className="container mx-auto px-4 relative z-10">
          <span className="inline-block bg-white/15 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
            👨‍⚕️ {language === "EN" ? "Doctor Consultations" : "डॉक्टर परामर्श"}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {t.doctorsHeading}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {language === "EN"
              ? "Our team of experienced specialists is dedicated to providing you with the highest quality care."
              : "हमारी अनुभवी विशेषज्ञों की टीम आपको उच्चतम गुणवत्ता की देखभाल प्रदान करने के लिए समर्पित है।"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Doctors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
            {doctors.map((doc) => {
              const isSelected = form.doctorName === doc.name;
              return (
                <div
                  key={doc.id}
                  className={`doctor-card group flex flex-col ${isSelected ? `ring-2 ${doc.ringColor}` : ""}`}
                >
                  {/* Avatar row */}
                  <div className="flex items-center gap-3 mb-4">
                    {/* Initials avatar */}
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${doc.color} flex items-center justify-center text-white font-serif text-xl font-bold shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0`}
                    >
                      {doc.initials}
                    </div>
                    {/* Name + specialty */}
                    <div className="min-w-0">
                      <h3 className="font-serif text-sm font-bold text-medical-blue leading-tight mb-0.5 line-clamp-2">
                        {doc.name}
                      </h3>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${doc.badgeColor}`}>
                        {language === "EN" ? doc.specialization.split(" ")[0] : doc.specializationHi.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Full specialization */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                    {language === "EN" ? doc.specialization : doc.specializationHi}
                  </p>

                  {/* Book button */}
                  <Button
                    onClick={() => setForm((p) => ({ ...p, doctorName: doc.name }))}
                    className={`w-full text-xs font-bold rounded-xl transition-all py-2 ${
                      isSelected
                        ? `bg-gradient-to-r ${doc.color} text-white shadow-sm`
                        : "bg-muted text-medical-blue hover:bg-medical-blue hover:text-white border border-medical-blue/20"
                    }`}
                  >
                    {isSelected ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <CalendarCheck className="w-3.5 h-3.5" />
                        {language === "EN" ? "Selected" : "चुना गया"}
                      </span>
                    ) : (
                      language === "EN" ? "Book Appointment" : "अपॉइंटमेंट बुक करें"
                    )}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Appointment Booking Form */}
          <div className="max-w-2xl mx-auto">
            <div className="form-card-orange">
              <h2 className="font-serif text-2xl font-bold text-orange-accent mb-6 flex items-center gap-2">
                <CalendarCheck className="w-6 h-6" />
                {language === "EN" ? "Book Doctor Appointment" : "डॉक्टर अपॉइंटमेंट बुक करें"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Select Doctor */}
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.selectDoctor} *
                  </Label>
                  <Select
                    value={form.doctorName}
                    onValueChange={(val) => setForm((p) => ({ ...p, doctorName: val }))}
                    required
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder={language === "EN" ? "Select a specialist" : "विशेषज्ञ चुनें"} />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doc) => (
                        <SelectItem key={doc.id} value={doc.name}>
                          {doc.name} — {language === "EN" ? doc.specialization : doc.specializationHi}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Patient Name */}
                <div>
                  <Label htmlFor="doc-name" className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.patientName} *
                  </Label>
                  <Input
                    id="doc-name"
                    type="text"
                    placeholder={language === "EN" ? "Enter patient name" : "मरीज़ का नाम दर्ज करें"}
                    value={form.patientName}
                    onChange={(e) => setForm((p) => ({ ...p, patientName: e.target.value }))}
                    required
                    className="rounded-xl"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <Label htmlFor="doc-mobile" className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.mobileNumber} *
                  </Label>
                  <Input
                    id="doc-mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.mobileNumber}
                    onChange={(e) => setForm((p) => ({ ...p, mobileNumber: e.target.value }))}
                    required
                    pattern="[0-9]{10}"
                    className="rounded-xl"
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="doc-date" className="text-sm font-semibold text-foreground mb-1.5 block">
                      {t.selectDate} *
                    </Label>
                    <Input
                      id="doc-date"
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="doc-time" className="text-sm font-semibold text-foreground mb-1.5 block">
                      {t.selectTime} *
                    </Label>
                    <Input
                      id="doc-time"
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <Label htmlFor="doc-reason" className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.reasonForVisit}
                  </Label>
                  <Textarea
                    id="doc-reason"
                    placeholder={language === "EN" ? "Briefly describe your symptoms or reason for visit" : "अपने लक्षण या मुलाकात का कारण संक्षेप में बताएं"}
                    value={form.reasonForVisit}
                    onChange={(e) => setForm((p) => ({ ...p, reasonForVisit: e.target.value }))}
                    rows={3}
                    className="rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-orange text-white font-bold text-base py-3 rounded-xl hover:opacity-90 transition-opacity shadow-orange"
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.loading}</>
                  ) : (
                    <>{t.bookAppointment}</>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {show && <SuccessToast message={message} onClose={hideToast} />}
    </main>
  );
}
