import { useState } from "react";
import { Truck, CheckCircle, Package, Loader2, Upload } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SuccessToast, useToast } from "@/components/Toast";
import { useSubmitMedicineOrder } from "@/hooks/useQueries";

function FloatingMedicines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Capsule 1 */}
      <div className="absolute top-10 left-10 animate-float-slow opacity-15" style={{animationDelay:"0s"}}>
        <svg viewBox="0 0 60 24" className="w-16 h-8" aria-hidden="true">
          <rect x="0" y="2" width="60" height="20" rx="10" fill="none" stroke="oklch(0.42 0.18 250)" strokeWidth="2.5"/>
          <rect x="0" y="2" width="30" height="20" rx="10" fill="oklch(0.42 0.18 250)" opacity="0.4"/>
          <line x1="30" y1="2" x2="30" y2="22" stroke="oklch(0.42 0.18 250)" strokeWidth="2"/>
        </svg>
      </div>
      {/* Capsule 2 */}
      <div className="absolute top-24 right-20 animate-float-medium opacity-15" style={{animationDelay:"1s"}}>
        <svg viewBox="0 0 60 24" className="w-14 h-7" aria-hidden="true">
          <rect x="0" y="2" width="60" height="20" rx="10" fill="none" stroke="oklch(0.58 0.13 192)" strokeWidth="2.5"/>
          <rect x="30" y="2" width="30" height="20" rx="10" fill="oklch(0.58 0.13 192)" opacity="0.4"/>
          <line x1="30" y1="2" x2="30" y2="22" stroke="oklch(0.58 0.13 192)" strokeWidth="2"/>
        </svg>
      </div>
      {/* Pill strip */}
      <div className="absolute bottom-40 left-20 animate-float-slow opacity-15" style={{animationDelay:"2s"}}>
        <svg viewBox="0 0 80 30" className="w-20 h-8" aria-hidden="true">
          {[0,1,2,3].map((i) => (
            <ellipse key={i} cx={10 + i*20} cy={15} rx={8} ry={10} fill="none" stroke="oklch(0.55 0.16 150)" strokeWidth="2"/>
          ))}
        </svg>
      </div>
      {/* Tablet bottle */}
      <div className="absolute top-1/3 right-10 animate-float-fast opacity-10" style={{animationDelay:"1.5s"}}>
        <svg viewBox="0 0 30 50" className="w-10 h-16" aria-hidden="true">
          <rect x="8" y="0" width="14" height="8" rx="2" fill="none" stroke="oklch(0.72 0.19 55)" strokeWidth="2"/>
          <rect x="4" y="8" width="22" height="38" rx="6" fill="none" stroke="oklch(0.72 0.19 55)" strokeWidth="2"/>
          <line x1="4" y1="20" x2="26" y2="20" stroke="oklch(0.72 0.19 55)" strokeWidth="1.5"/>
        </svg>
      </div>
    </div>
  );
}

// Animated delivery van
function DeliveryVan() {
  return (
    <div className="relative overflow-hidden h-20 bg-gradient-to-r from-teal-light to-background rounded-xl border border-teal/20 flex items-center">
      <div className="absolute animate-delivery-drive" style={{bottom: "12px", animationDuration: "12s"}}>
        <svg viewBox="0 0 120 50" className="w-28 h-12" aria-hidden="true">
          <rect x="0" y="10" width="80" height="30" rx="4" fill="oklch(0.42 0.18 250)"/>
          <rect x="80" y="15" width="30" height="25" rx="4" fill="oklch(0.32 0.18 250)"/>
          <polygon points="80,15 110,15 110,25 80,25" fill="oklch(0.55 0.14 192)" opacity="0.8"/>
          <circle cx="20" cy="42" r="7" fill="oklch(0.18 0.02 245)"/>
          <circle cx="20" cy="42" r="4" fill="oklch(0.6 0.06 245)"/>
          <circle cx="85" cy="42" r="7" fill="oklch(0.18 0.02 245)"/>
          <circle cx="85" cy="42" r="4" fill="oklch(0.6 0.06 245)"/>
          {/* Cross on van */}
          <rect x="35" y="16" width="4" height="18" rx="1" fill="white" opacity="0.8"/>
          <rect x="28" y="23" width="18" height="4" rx="1" fill="white" opacity="0.8"/>
        </svg>
      </div>
      <div className="w-full flex items-center justify-center">
        <span className="text-sm font-semibold text-medical-blue flex items-center gap-2">
          <Truck className="w-5 h-5 text-teal" />
          Free Delivery within 20 KM from City Pharma
        </span>
      </div>
    </div>
  );
}

interface FormState {
  patientName: string;
  mobileNumber: string;
  prescriptionFile: File | null;
  deliveryDate: string;
  deliveryTime: string;
  deliveryTimingPreference: string;
  fullAddress: string;
}

export function MedicinePage() {
  const { t, language } = useLanguage();
  const { show, message, showToast, hideToast } = useToast();
  const submitMutation = useSubmitMedicineOrder();
  const isSubmitting = submitMutation.isPending;

  const [form, setForm] = useState<FormState>({
    patientName: "",
    mobileNumber: "",
    prescriptionFile: null,
    deliveryDate: "",
    deliveryTime: "",
    deliveryTimingPreference: "",
    fullAddress: "",
  });

  const features = [
    {
      id: "all-meds",
      icon: <Package className="w-5 h-5" />,
      text: language === "EN" ? "All branded & generic medicines available" : "सभी ब्रांडेड और जेनेरिक दवाइयाँ उपलब्ध",
    },
    {
      id: "quality",
      icon: <CheckCircle className="w-5 h-5" />,
      text: language === "EN" ? "Proper storage & quality assurance" : "उचित भंडारण और गुणवत्ता आश्वासन",
    },
    {
      id: "delivery",
      icon: <Truck className="w-5 h-5" />,
      text: language === "EN" ? "Free delivery within 20 KM radius" : "20 KM के दायरे में मुफ्त डिलीवरी",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientName || !form.mobileNumber || !form.deliveryDate || !form.deliveryTime || !form.deliveryTimingPreference || !form.fullAddress) {
      return;
    }
    const [hourStr, minuteStr] = form.deliveryTime.split(":");
    const hour = parseInt(hourStr ?? "0", 10);
    const minute = parseInt(minuteStr ?? "0", 10);

    submitMutation.mutate(
      {
        patientName: form.patientName,
        mobileNumber: form.mobileNumber,
        prescriptionFileUrl: null,
        deliveryDate: form.deliveryDate,
        deliveryTime: { hour, minute },
        deliveryTimingPreference: form.deliveryTimingPreference,
        fullAddress: form.fullAddress,
      },
      {
        onSuccess: () => {
          showToast(t.orderSuccess);
          setForm({
            patientName: "",
            mobileNumber: "",
            prescriptionFile: null,
            deliveryDate: "",
            deliveryTime: "",
            deliveryTimingPreference: "",
            fullAddress: "",
          });
        },
        onError: (err) => console.error(err),
      }
    );
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden text-white">
        <FloatingMedicines />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/15 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
              💊 {language === "EN" ? "Pharmacy Services" : "फार्मेसी सेवाएँ"}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              {t.medicineHeading}
            </h1>
            <p className="text-blue-100 text-lg mb-6">{t.medicineSubheading}</p>

            {/* Features */}
            <div className="flex flex-col gap-3">
              {features.map((f) => (
                <div key={f.id} className="flex items-center gap-3 text-sm">
                  <span className="text-green-300">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Delivery van animation */}
          <div className="mb-8">
            <DeliveryVan />
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div className="form-card">
              <h2 className="font-serif text-2xl font-bold text-medical-blue mb-6">
                {t.prescriptionForm}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Patient Name */}
                <div>
                  <Label htmlFor="med-name" className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.patientName} *
                  </Label>
                  <Input
                    id="med-name"
                    type="text"
                    placeholder={language === "EN" ? "Enter patient name" : "मरीज़ का नाम दर्ज करें"}
                    value={form.patientName}
                    onChange={(e) => setForm((p) => ({ ...p, patientName: e.target.value }))}
                    required
                    className="rounded-xl"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <Label htmlFor="med-mobile" className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.mobileNumber} *
                  </Label>
                  <Input
                    id="med-mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.mobileNumber}
                    onChange={(e) => setForm((p) => ({ ...p, mobileNumber: e.target.value }))}
                    required
                    pattern="[0-9]{10}"
                    className="rounded-xl"
                  />
                </div>

                {/* Upload Prescription */}
                <div>
                  <Label htmlFor="med-prescription" className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.uploadPrescription}
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-teal transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <label htmlFor="med-prescription" className="cursor-pointer text-sm text-muted-foreground hover:text-teal transition-colors">
                      {form.prescriptionFile
                        ? form.prescriptionFile.name
                        : (language === "EN" ? "Click to upload image or PDF" : "फोटो या PDF अपलोड करें")}
                    </label>
                    <input
                      id="med-prescription"
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => setForm((p) => ({ ...p, prescriptionFile: e.target.files?.[0] ?? null }))}
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="med-date" className="text-sm font-semibold text-foreground mb-1.5 block">
                      {t.selectDate} *
                    </Label>
                    <Input
                      id="med-date"
                      type="date"
                      value={form.deliveryDate}
                      onChange={(e) => setForm((p) => ({ ...p, deliveryDate: e.target.value }))}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="med-time" className="text-sm font-semibold text-foreground mb-1.5 block">
                      {t.selectTime} *
                    </Label>
                    <Input
                      id="med-time"
                      type="time"
                      value={form.deliveryTime}
                      onChange={(e) => setForm((p) => ({ ...p, deliveryTime: e.target.value }))}
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>

                {/* Delivery Timing */}
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.deliveryTiming} *
                  </Label>
                  <Select
                    value={form.deliveryTimingPreference}
                    onValueChange={(val) => setForm((p) => ({ ...p, deliveryTimingPreference: val }))}
                    required
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder={language === "EN" ? "Select timing" : "समय चुनें"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">
                        {language === "EN" ? "Morning (8 AM – 12 PM)" : "सुबह (8 AM – 12 PM)"}
                      </SelectItem>
                      <SelectItem value="afternoon">
                        {language === "EN" ? "Afternoon (12 PM – 4 PM)" : "दोपहर (12 PM – 4 PM)"}
                      </SelectItem>
                      <SelectItem value="evening">
                        {language === "EN" ? "Evening (4 PM – 8 PM)" : "शाम (4 PM – 8 PM)"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="med-address" className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.fullAddress} *
                  </Label>
                  <Textarea
                    id="med-address"
                    placeholder={language === "EN" ? "House/flat number, street, area, landmark, city, pincode" : "मकान/फ्लैट नंबर, गली, क्षेत्र, लैंडमार्क, शहर, पिनकोड"}
                    value={form.fullAddress}
                    onChange={(e) => setForm((p) => ({ ...p, fullAddress: e.target.value }))}
                    required
                    rows={3}
                    className="rounded-xl"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-blue-teal text-white font-bold text-base py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t.loading}</>
                  ) : (
                    <><Truck className="mr-2 h-4 w-4" /> {t.submitOrder}</>
                  )}
                </Button>

                {/* Disclaimer */}
                <p className="text-xs text-muted-foreground text-center">
                  📌 {language === "EN"
                    ? "Free delivery within 20 KM from City Pharma & Diagnostic Centre, Bundu"
                    : "सिटी फार्मा, बुंडू से 20 KM के अंदर मुफ्त डिलीवरी"}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {show && <SuccessToast message={message} onClose={hideToast} />}
    </main>
  );
}
