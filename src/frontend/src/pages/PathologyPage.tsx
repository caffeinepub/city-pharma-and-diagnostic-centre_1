import { useState } from "react";
import { Search, Microscope, Loader2, FlaskConical } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SuccessToast, useToast } from "@/components/Toast";
import { useSubmitPathologyBooking } from "@/hooks/useQueries";

const bloodTests = [
  { id: "cbc", name: "CBC (Hb, TLC, DLC, Platelet)", price: 300 },
  { id: "esr", name: "ESR", price: 100 },
  { id: "retic", name: "Reticulocyte Count", price: 100 },
  { id: "aec", name: "AEC", price: 100 },
  { id: "mp", name: "MP (Malaria Parasite)", price: 200 },
  { id: "pbs", name: "PBS", price: 300 },
  { id: "sickling", name: "Sickling Test", price: 400 },
  { id: "direct-coombs", name: "Direct Coombs", price: 400 },
  { id: "indirect-coombs", name: "Indirect Coombs", price: 400 },
  { id: "hba1c", name: "HbA1C", price: 450 },
  { id: "rbs", name: "RBS", price: 75 },
  { id: "fbs", name: "FBS", price: 75 },
  { id: "ppbs", name: "PPBS", price: 75 },
  { id: "ogtt", name: "OGTT", price: 500 },
  { id: "ogct", name: "OGCT", price: 500 },
  { id: "trop-t", name: "Trop-T", price: 1200 },
  { id: "hb-electrophoresis", name: "Hb Electrophoresis", price: 1200 },
  { id: "optimal", name: "Optimal", price: 300 },
  { id: "abo-rh", name: "ABO & Rh", price: 100 },
  { id: "ammonia", name: "Ammonia", price: 1000 },
  { id: "kft", name: "KFT", price: 500 },
  { id: "rft", name: "RFT", price: 500 },
  { id: "lft", name: "LFT", price: 600 },
  { id: "blood-urea", name: "Blood Urea", price: 150 },
  { id: "serum-creatinine", name: "Serum Creatinine", price: 150 },
  { id: "uric-acid", name: "Serum Uric Acid", price: 200 },
  { id: "calcium", name: "Serum Calcium", price: 200 },
  { id: "sodium", name: "Serum Sodium", price: 250 },
  { id: "potassium", name: "Serum Potassium", price: 250 },
  { id: "sgpt", name: "SGPT", price: 150 },
  { id: "sgot", name: "SGOT", price: 150 },
  { id: "alk-phosphatase", name: "Alkaline Phosphatase", price: 150 },
  { id: "total-protein", name: "Total Protein", price: 200 },
  { id: "albumin", name: "Serum Albumin", price: 150 },
  { id: "lipid-profile", name: "Lipid Profile", price: 500 },
  { id: "ldh", name: "LDH", price: 500 },
  { id: "tft", name: "TFT (T3, T4, TSH)", price: 600 },
  { id: "ft3ft4", name: "FT3, FT4", price: 600 },
  { id: "vit-b12", name: "Vitamin B12", price: 1300 },
  { id: "vit-d", name: "Vitamin D", price: 1300 },
  { id: "ige", name: "Serum IgE", price: 1000 },
  { id: "psa-free", name: "PSA Free", price: 1000 },
  { id: "psa-total", name: "PSA Total", price: 1000 },
  { id: "hiv", name: "HIV I & II", price: 350 },
  { id: "hbsag", name: "HBsAg", price: 300 },
  { id: "hcv", name: "HCV", price: 450 },
  { id: "crp", name: "CRP", price: 450 },
  { id: "aso", name: "ASO", price: 400 },
  { id: "rf-factor", name: "RF Factor", price: 400 },
  { id: "anti-ccp", name: "Anti-CCP", price: 1500 },
  { id: "widal", name: "Widal", price: 200 },
  { id: "typhi-dot", name: "Typhi Dot", price: 500 },
  { id: "dengue", name: "Dengue (IgG, IgM, NS1)", price: 1200 },
  { id: "ferritin", name: "Serum Ferritin", price: 1000 },
  { id: "serum-iron", name: "Serum Iron", price: 300 },
  { id: "iron-profile", name: "Iron Profile", price: 1000 },
  { id: "d-dimer", name: "D-Dimer", price: 1500 },
  { id: "pt-inr", name: "PT-INR", price: 350 },
  { id: "aptt", name: "APTT", price: 400 },
  { id: "vdrl", name: "VDRL", price: 200 },
  { id: "prolactin", name: "Prolactin", price: 575 },
  { id: "lh", name: "LH", price: 550 },
  { id: "fsh", name: "FSH", price: 550 },
  { id: "procalcitonin", name: "Procalcitonin", price: 2500 },
  { id: "amylase", name: "Serum Amylase", price: 750 },
  { id: "lipase", name: "Serum Lipase", price: 750 },
  { id: "ggt", name: "GGT", price: 500 },
  { id: "beta-hcg", name: "Beta-HCG", price: 1000 },
  { id: "amh", name: "AMH", price: 1500 },
];

const urineTests = [
  { id: "urine-routine", name: "Urine Routine", price: 100 },
  { id: "urine-culture", name: "Urine Culture", price: 500 },
  { id: "pus-culture", name: "Pus Culture", price: 800 },
  { id: "gram-stain", name: "Gram Stain", price: 200 },
  { id: "afb-stain", name: "AFB Stain", price: 200 },
  { id: "koh-mount", name: "KOH Mount", price: 150 },
];

const allTests = [...bloodTests, ...urineTests];

function FloatingLabIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Test tube 1 */}
      <div className="absolute top-12 left-12 animate-tube-sway opacity-20">
        <svg viewBox="0 0 20 60" className="w-6 h-16" aria-hidden="true">
          <rect x="6" y="0" width="8" height="50" rx="4" fill="none" stroke="oklch(0.58 0.13 192)" strokeWidth="2"/>
          <rect x="7" y="35" width="6" height="15" rx="3" fill="oklch(0.58 0.13 192)" opacity="0.5"/>
          <line x1="4" y1="4" x2="16" y2="4" stroke="oklch(0.58 0.13 192)" strokeWidth="2"/>
        </svg>
      </div>
      {/* Test tube 2 */}
      <div className="absolute top-16 right-20 animate-tube-sway opacity-20" style={{animationDelay:"1s"}}>
        <svg viewBox="0 0 20 60" className="w-5 h-14" aria-hidden="true">
          <rect x="6" y="0" width="8" height="50" rx="4" fill="none" stroke="oklch(0.55 0.22 28)" strokeWidth="2"/>
          <rect x="7" y="28" width="6" height="22" rx="3" fill="oklch(0.55 0.22 28)" opacity="0.5"/>
          <line x1="4" y1="4" x2="16" y2="4" stroke="oklch(0.55 0.22 28)" strokeWidth="2"/>
        </svg>
      </div>
      {/* Blood drop */}
      <div className="absolute top-20 left-1/3 opacity-20" style={{animation: "blood-fall 3s ease-in infinite", animationDelay:"0.5s"}}>
        <svg viewBox="0 0 20 30" className="w-5 h-8" aria-hidden="true">
          <path d="M10 2 C10 2 3 12 3 18 C3 24 17 24 17 18 C17 12 10 2 10 2Z" fill="oklch(0.55 0.22 28)" opacity="0.8"/>
        </svg>
      </div>
      {/* Microscope silhouette */}
      <div className="absolute bottom-20 right-16 animate-float-slow opacity-15" style={{animationDelay:"2s"}}>
        <svg viewBox="0 0 50 60" className="w-14 h-16" aria-hidden="true">
          <rect x="18" y="5" width="14" height="30" rx="5" fill="none" stroke="oklch(0.42 0.18 250)" strokeWidth="2"/>
          <circle cx="25" cy="8" r="5" fill="none" stroke="oklch(0.42 0.18 250)" strokeWidth="2"/>
          <line x1="25" y1="35" x2="25" y2="50" stroke="oklch(0.42 0.18 250)" strokeWidth="2.5"/>
          <line x1="12" y1="50" x2="38" y2="50" stroke="oklch(0.42 0.18 250)" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="25" cy="18" r="7" fill="none" stroke="oklch(0.42 0.18 250)" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  );
}

interface FormState {
  patientName: string;
  mobileNumber: string;
  selectedTests: string[];
  date: string;
  time: string;
  sampleCollectionType: string;
}

export function PathologyPage() {
  const { t, language } = useLanguage();
  const { show, message, showToast, hideToast } = useToast();
  const submitMutation = useSubmitPathologyBooking();
  const isSubmitting = submitMutation.isPending;
  const [searchQuery, setSearchQuery] = useState("");

  const [form, setForm] = useState<FormState>({
    patientName: "",
    mobileNumber: "",
    selectedTests: [],
    date: "",
    time: "",
    sampleCollectionType: "",
  });

  const filteredBloodTests = bloodTests.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredUrineTests = urineTests.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTest = (testName: string) => {
    setForm((prev) => ({
      ...prev,
      selectedTests: prev.selectedTests.includes(testName)
        ? prev.selectedTests.filter((x) => x !== testName)
        : [...prev.selectedTests, testName],
    }));
  };

  const totalCost = form.selectedTests.reduce((sum, name) => {
    const found = allTests.find((x) => x.name === name);
    return sum + (found?.price ?? 0);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientName || !form.mobileNumber || form.selectedTests.length === 0 || !form.date || !form.time || !form.sampleCollectionType) {
      return;
    }
    const [hourStr, minuteStr] = form.time.split(":");
    const hour = parseInt(hourStr ?? "0", 10);
    const minute = parseInt(minuteStr ?? "0", 10);

    submitMutation.mutate(
      {
        patientName: form.patientName,
        mobileNumber: form.mobileNumber,
        selectedTests: form.selectedTests,
        date: form.date,
        time: { hour, minute },
        sampleCollectionType: form.sampleCollectionType,
      },
      {
        onSuccess: () => {
          showToast(t.pathologySuccess);
          setForm({
            patientName: "",
            mobileNumber: "",
            selectedTests: [],
            date: "",
            time: "",
            sampleCollectionType: "",
          });
        },
        onError: (err) => console.error(err),
      }
    );
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-700 overflow-hidden text-white">
        <FloatingLabIcons />
        <div className="container mx-auto px-4 relative z-10">
          <span className="inline-block bg-white/15 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
            🧪 {language === "EN" ? "Pathology Services" : "पैथोलॉजी सेवाएँ"}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {t.pathologyHeading}
          </h1>
          <p className="text-teal-100 text-lg max-w-2xl">{t.pathologySubheading}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t.searchTests}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>

          {/* Test Rate Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Blood Tests */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-rose-500 px-5 py-3 flex items-center gap-2 text-white">
                <FlaskConical className="w-5 h-5" />
                <h2 className="font-serif text-lg font-bold">{t.bloodTests}</h2>
                <Badge className="ml-auto bg-white/20 text-white text-xs border-0">
                  {filteredBloodTests.length} tests
                </Badge>
              </div>
              <div className="divide-y divide-border max-h-96 overflow-y-auto">
                {filteredBloodTests.map((test) => (
                  <button
                    key={test.id}
                    type="button"
                    className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors text-left ${
                      form.selectedTests.includes(test.name)
                        ? "bg-teal-light"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => toggleTest(test.name)}
                    aria-pressed={form.selectedTests.includes(test.name)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                        form.selectedTests.includes(test.name)
                          ? "bg-teal border-teal"
                          : "border-border"
                      }`}>
                        {form.selectedTests.includes(test.name) && (
                          <svg viewBox="0 0 10 8" className="w-2.5 h-2" aria-hidden="true">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-foreground">{test.name}</span>
                    </div>
                    <span className="text-sm font-bold text-medical-blue shrink-0 ml-2">₹{test.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Urine & Microbiology Tests */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 flex items-center gap-2 text-white">
                <Microscope className="w-5 h-5" />
                <h2 className="font-serif text-lg font-bold">{t.urineTests}</h2>
                <Badge className="ml-auto bg-white/20 text-white text-xs border-0">
                  {filteredUrineTests.length} tests
                </Badge>
              </div>
              <div className="divide-y divide-border">
                {filteredUrineTests.map((test) => (
                  <button
                    key={test.id}
                    type="button"
                    className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors text-left ${
                      form.selectedTests.includes(test.name)
                        ? "bg-teal-light"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => toggleTest(test.name)}
                    aria-pressed={form.selectedTests.includes(test.name)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                        form.selectedTests.includes(test.name)
                          ? "bg-teal border-teal"
                          : "border-border"
                      }`}>
                        {form.selectedTests.includes(test.name) && (
                          <svg viewBox="0 0 10 8" className="w-2.5 h-2" aria-hidden="true">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-foreground">{test.name}</span>
                    </div>
                    <span className="text-sm font-bold text-medical-blue shrink-0 ml-2">₹{test.price}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Tests Summary */}
          {form.selectedTests.length > 0 && (
            <div className="bg-teal-light border border-teal rounded-2xl p-4 mb-8 animate-slide-in-up">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold text-teal mb-2">
                    {language === "EN" ? `${form.selectedTests.length} test(s) selected` : `${form.selectedTests.length} जाँच चुनी गईं`}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {form.selectedTests.map((name) => (
                      <span
                        key={name}
                        className="inline-flex items-center gap-1 bg-white text-teal text-xs font-medium px-2.5 py-1 rounded-full border border-teal/30"
                      >
                        {name}
                        <button
                          type="button"
                          onClick={() => toggleTest(name)}
                          className="ml-1 text-teal/60 hover:text-teal"
                          aria-label={`Remove ${name}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{language === "EN" ? "Estimated Total" : "अनुमानित कुल"}</p>
                  <p className="text-2xl font-bold text-medical-blue">₹{totalCost}</p>
                </div>
              </div>
            </div>
          )}

          {/* Booking Form */}
          <div className="max-w-2xl mx-auto">
            <div className="form-card-teal">
              <h2 className="font-serif text-2xl font-bold text-teal mb-6">
                {language === "EN" ? "Book Pathology Tests" : "पैथोलॉजी जाँच बुक करें"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="path-name" className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.patientName} *
                  </Label>
                  <Input
                    id="path-name"
                    type="text"
                    placeholder={language === "EN" ? "Enter patient name" : "मरीज़ का नाम दर्ज करें"}
                    value={form.patientName}
                    onChange={(e) => setForm((p) => ({ ...p, patientName: e.target.value }))}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="path-mobile" className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.mobileNumber} *
                  </Label>
                  <Input
                    id="path-mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.mobileNumber}
                    onChange={(e) => setForm((p) => ({ ...p, mobileNumber: e.target.value }))}
                    required
                    pattern="[0-9]{10}"
                    className="rounded-xl"
                  />
                </div>

                {/* Selected tests display */}
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-1.5 block">
                    {t.selectTests} * {language === "EN" ? "(select from the list above)" : "(ऊपर सूची से चुनें)"}
                  </Label>
                  {form.selectedTests.length === 0 ? (
                    <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                      {language === "EN" ? "No tests selected yet. Click tests from the list above." : "अभी कोई जाँच नहीं चुनी। ऊपर सूची से चुनें।"}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-teal bg-teal-light/50 px-4 py-3 text-sm text-teal font-medium">
                      {form.selectedTests.join(", ")}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="path-date" className="text-sm font-semibold text-foreground mb-1.5 block">
                      {t.selectDate} *
                    </Label>
                    <Input
                      id="path-date"
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="path-time" className="text-sm font-semibold text-foreground mb-1.5 block">
                      {t.selectTime} *
                    </Label>
                    <Input
                      id="path-time"
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-foreground mb-2 block">
                    {t.sampleCollection} *
                  </Label>
                  <div className="flex gap-4">
                    {[
                      { value: "home", label: t.homeCollection },
                      { value: "centre", label: t.visitCentre },
                    ].map((opt) => (
                      <label key={opt.value} className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        form.sampleCollectionType === opt.value
                          ? "border-teal bg-teal-light"
                          : "border-border hover:border-teal/50"
                      }`}>
                        <input
                          type="radio"
                          name="sampleCollection"
                          value={opt.value}
                          checked={form.sampleCollectionType === opt.value}
                          onChange={() => setForm((p) => ({ ...p, sampleCollectionType: opt.value }))}
                          className="accent-teal"
                        />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || form.selectedTests.length === 0}
                  className="w-full bg-teal text-white font-bold text-base py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.loading}</>
                  ) : (
                    <><Microscope className="mr-2 h-4 w-4" />{t.bookTestNow}</>
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
