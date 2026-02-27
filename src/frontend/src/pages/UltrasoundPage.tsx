import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SuccessToast, useToast } from "@/components/Toast";
import { useSubmitUltrasoundBooking } from "@/hooks/useQueries";

const ultrasoundServices = [
  { id: "abdominal", name: "Abdominal Ultrasound", price: 1500 },
  { id: "tvs-pelvic", name: "TVS Pelvic Ultrasound", price: 1700 },
  { id: "obstetric", name: "Obstetric Ultrasound", price: 1700 },
  { id: "thyroid", name: "Thyroid Ultrasound", price: 800 },
  { id: "whole-abdomen", name: "Whole Abdomen", price: 1500 },
  { id: "tas-pelvis", name: "TAS Pelvis", price: 1200 },
  { id: "doppler", name: "DOPPLER", price: 2000 },
  { id: "fetal-wellbeing", name: "Fetal Wellbeing", price: 1000 },
];

const trustBadges = [
  { id: "safe", text: "Safe & accurate scanning", textHi: "सुरक्षित और सटीक स्कैनिंग" },
  { id: "trained", text: "Trained professionals", textHi: "प्रशिक्षित पेशेवर" },
  { id: "online", text: "Online booking", textHi: "ऑनलाइन बुकिंग" },
];

// Ultrasound pulse animation
function UltrasoundAnimation() {
  return (
    <div className="flex items-center justify-center py-8" aria-hidden="true">
      <div className="relative w-32 h-32">
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal z-10" />
        {/* Pulse waves */}
        {["wave-a", "wave-b", "wave-c", "wave-d"].map((waveId, idx) => (
          <div
            key={waveId}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-teal animate-us-pulse"
            style={{
              width: `${(idx + 1) * 28}px`,
              height: `${(idx + 1) * 28}px`,
              animationDelay: `${idx * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface FormState {
  patientName: string;
  mobileNumber: string;
  selectedService: string;
  date: string;
  time: string;
}

export function UltrasoundPage() {
  const { t, language } = useLanguage();
  const { show, message, showToast, hideToast } = useToast();
  const submitMutation = useSubmitUltrasoundBooking();
  const isSubmitting = submitMutation.isPending;

  const [form, setForm] = useState<FormState>({
    patientName: "",
    mobileNumber: "",
    selectedService: "",
    date: "",
    time: "",
  });

  const selectedServiceData = ultrasoundServices.find((s) => s.name === form.selectedService);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientName || !form.mobileNumber || !form.selectedService || !form.date || !form.time) {
      return;
    }
    const [hourStr, minuteStr] = form.time.split(":");
    const hour = parseInt(hourStr ?? "0", 10);
    const minute = parseInt(minuteStr ?? "0", 10);

    submitMutation.mutate(
      {
        patientName: form.patientName,
        mobileNumber: form.mobileNumber,
        selectedService: form.selectedService,
        date: form.date,
        time: { hour, minute },
      },
      {
        onSuccess: () => {
          showToast(t.ultrasoundSuccess);
          setForm({ patientName: "", mobileNumber: "", selectedService: "", date: "", time: "" });
        },
        onError: (err) => console.error(err),
      }
    );
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-green-900 via-green-800 to-teal-800 overflow-hidden text-white">
        {/* Background wave pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="none" aria-hidden="true" focusable="false" role="img"><title>background wave pattern</title>
            {[
            {id: "w0", offset: 0}, {id: "w1", offset: 40}, {id: "w2", offset: 80},
            {id: "w3", offset: 120}, {id: "w4", offset: 160}, {id: "w5", offset: 200}
          ].map(({id, offset}) => (
              <path
                key={id}
                d={`M0,${150 + offset} Q300,${100 + offset} 600,${150 + offset} T1200,${150 + offset}`}
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block bg-white/15 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                🩺 {language === "EN" ? "Imaging Services" : "इमेजिंग सेवाएँ"}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                {t.ultrasoundHeading}
              </h1>
              <div className="flex flex-wrap gap-3 mt-6">
                {trustBadges.map((badge) => (
                  <div key={badge.id} className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span>{language === "EN" ? badge.text : badge.textHi}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <UltrasoundAnimation />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Service cards */}
          <h2 className="font-serif text-2xl font-bold text-medical-blue text-center mb-8">
            {language === "EN" ? "Available Ultrasound Services" : "उपलब्ध अल्ट्रासाउंड सेवाएँ"}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {ultrasoundServices.map((svc) => (
              <button
                key={svc.id}
                type="button"
                className={`w-full bg-white rounded-2xl p-4 shadow-card border-2 transition-all duration-200 text-left ${
                  form.selectedService === svc.name
                    ? "border-medical-green shadow-card-hover"
                    : "border-transparent hover:border-teal/40"
                }`}
                onClick={() => setForm((p) => ({ ...p, selectedService: svc.name }))}
                aria-pressed={form.selectedService === svc.name}
              >
                <div className="text-2xl mb-2">
                  {svc.id === "obstetric" || svc.id === "fetal-wellbeing" ? "🤰" :
                   svc.id === "thyroid" ? "🦋" :
                   svc.id === "doppler" ? "💓" : "🔊"}
                </div>
                <p className="text-sm font-semibold text-foreground leading-tight mb-1">{svc.name}</p>
                <p className="text-lg font-bold text-medical-blue">₹{svc.price}</p>
              </button>
            ))}
          </div>

          {/* Booking Form */}
          <div className="max-w-2xl mx-auto">
            <div className="form-card-green">
              <h2 className="font-serif text-2xl font-bold text-medical-green mb-6">
                {language === "EN" ? "Book Ultrasound Appointment" : "अल्ट्रासाउंड अपॉइंटमेंट बुक करें"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="us-name" className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.patientName} *
                  </Label>
                  <Input
                    id="us-name"
                    type="text"
                    placeholder={language === "EN" ? "Enter patient name" : "मरीज़ का नाम दर्ज करें"}
                    value={form.patientName}
                    onChange={(e) => setForm((p) => ({ ...p, patientName: e.target.value }))}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="us-mobile" className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.mobileNumber} *
                  </Label>
                  <Input
                    id="us-mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.mobileNumber}
                    onChange={(e) => setForm((p) => ({ ...p, mobileNumber: e.target.value }))}
                    required
                    pattern="[0-9]{10}"
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.selectService} *
                  </Label>
                  <Select
                    value={form.selectedService}
                    onValueChange={(val) => setForm((p) => ({ ...p, selectedService: val }))}
                    required
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder={language === "EN" ? "Select ultrasound type" : "अल्ट्रासाउंड प्रकार चुनें"} />
                    </SelectTrigger>
                    <SelectContent>
                      {ultrasoundServices.map((svc) => (
                        <SelectItem key={svc.id} value={svc.name}>
                          {svc.name} — ₹{svc.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedServiceData && (
                    <p className="text-sm text-medical-green font-semibold mt-1.5">
                      {language === "EN" ? "Fee:" : "शुल्क:"} ₹{selectedServiceData.price}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="us-date" className="text-sm font-semibold text-foreground mb-1.5 block">
                      {t.selectDate} *
                    </Label>
                    <Input
                      id="us-date"
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="us-time" className="text-sm font-semibold text-foreground mb-1.5 block">
                      {t.selectTime} *
                    </Label>
                    <Input
                      id="us-time"
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-medical-green text-white font-bold text-base py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.loading}</>
                  ) : (
                    <>{t.bookUltrasoundBtn}</>
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
