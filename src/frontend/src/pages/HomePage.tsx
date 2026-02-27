import { useNavigate } from "@tanstack/react-router";
import { Pill, Microscope, Stethoscope, Phone, Mail, ChevronRight, Shield, Award, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

// ECG line SVG path
const ECG_PATH =
  "M0,30 L60,30 L70,30 L80,10 L90,50 L100,30 L110,30 L120,10 L130,30 L140,30 L150,30 L160,30 L170,10 L180,50 L190,30 L200,30 " +
  "L210,30 L220,30 L230,10 L240,50 L250,30 L260,30 L270,30 L280,10 L290,50 L300,30 L310,30 L320,30 L330,10 L340,50 L350,30 L360,30 " +
  "L370,30 L380,30 L390,10 L400,50 L410,30 L420,30 L430,30 L440,10 L450,50 L460,30 L470,30 L480,30 L490,10 L500,50 L510,30 L520,30";

function EcgAnimation() {
  return (
    <div className="overflow-hidden w-full h-16 opacity-60">
      <div className="flex w-[200%] animate-ecg-loop">
        {["ecg-a", "ecg-b"].map((key) => (
          <svg key={key} viewBox="0 0 520 60" className="w-1/2 h-16" preserveAspectRatio="none" aria-hidden="true">
            {/* Glow layer */}
            <path
              d={ECG_PATH}
              fill="none"
              stroke="oklch(0.75 0.18 168)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
              filter="blur(3px)"
            />
            {/* Sharp line */}
            <path
              d={ECG_PATH}
              fill="none"
              stroke="oklch(0.85 0.18 168)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}

function FloatingMedicalIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Pill */}
      <div className="absolute top-16 left-8 animate-float-slow opacity-20">
        <svg viewBox="0 0 40 20" className="w-12 h-6" aria-hidden="true">
          <rect x="0" y="2" width="40" height="16" rx="8" fill="none" stroke="white" strokeWidth="2"/>
          <line x1="20" y1="2" x2="20" y2="18" stroke="white" strokeWidth="2"/>
          <rect x="0" y="2" width="20" height="16" rx="8" fill="rgba(255,255,255,0.3)"/>
        </svg>
      </div>
      {/* Syringe */}
      <div className="absolute top-24 right-16 animate-float-medium opacity-20" style={{animationDelay:"1s"}}>
        <svg viewBox="0 0 40 40" className="w-10 h-10" aria-hidden="true">
          <line x1="5" y1="35" x2="35" y2="5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="12" y="12" width="16" height="10" rx="2" transform="rotate(-45 20 20)" fill="none" stroke="white" strokeWidth="1.5"/>
          <line x1="2" y1="38" x2="8" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      {/* Microscope */}
      <div className="absolute bottom-32 left-16 animate-float-slow opacity-20" style={{animationDelay:"2s"}}>
        <svg viewBox="0 0 40 40" className="w-10 h-10" aria-hidden="true">
          <rect x="16" y="4" width="8" height="20" rx="3" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="20" cy="4" r="4" fill="none" stroke="white" strokeWidth="2"/>
          <line x1="20" y1="24" x2="20" y2="36" stroke="white" strokeWidth="2"/>
          <line x1="10" y1="36" x2="30" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="20" cy="12" r="5" fill="none" stroke="white" strokeWidth="1.5"/>
        </svg>
      </div>
      {/* Stethoscope */}
      <div className="absolute bottom-24 right-12 animate-float-medium opacity-20" style={{animationDelay:"3s"}}>
        <svg viewBox="0 0 40 40" className="w-10 h-10" aria-hidden="true">
          <path d="M8,8 C8,8 8,20 14,24 C20,28 26,24 26,18" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="8" y1="8" x2="8" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="14" y1="8" x2="14" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="30" cy="18" r="4" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="30" cy="18" r="1.5" fill="white"/>
        </svg>
      </div>
      {/* Cross */}
      <div className="absolute top-40 left-1/2 animate-float-fast opacity-15" style={{animationDelay:"1.5s"}}>
        <svg viewBox="0 0 30 30" className="w-8 h-8" aria-hidden="true">
          <rect x="12" y="2" width="6" height="26" rx="2" fill="white"/>
          <rect x="2" y="12" width="26" height="6" rx="2" fill="white"/>
        </svg>
      </div>
    </div>
  );
}

const services = [
  {
    id: "medicine",
    icon: <Pill className="w-8 h-8" />,
    titleKey: "navMedicine" as const,
    description: "All branded & generic medicines with free home delivery within 20 KM",
    descHi: "20 KM के अंदर मुफ्त होम डिलीवरी सहित सभी दवाइयाँ",
    ctaKey: "bookMedicines" as const,
    route: "/medicines",
    iconColor: "from-blue-600 to-blue-800",
    accentColor: "oklch(0.42 0.18 250)",
    shadowColor: "oklch(0.42 0.18 250 / 0.2)",
    bgTint: "from-blue-50/80 to-transparent",
    btnClass: "bg-medical-blue hover:bg-blue-700",
    badge: "Free Delivery",
    badgeHi: "मुफ्त डिलीवरी",
    badgeClass: "bg-blue-50 text-blue-700",
  },
  {
    id: "pathology",
    icon: <Microscope className="w-8 h-8" />,
    titleKey: "navPathology" as const,
    description: "Accurate & affordable blood/urine tests with strict hygiene standards",
    descHi: "सख्त स्वच्छता के साथ सटीक और किफायती रक्त/मूत्र परीक्षण",
    ctaKey: "bookPathology" as const,
    route: "/pathology",
    iconColor: "from-teal-500 to-teal-700",
    accentColor: "oklch(0.58 0.13 192)",
    shadowColor: "oklch(0.58 0.13 192 / 0.2)",
    bgTint: "from-teal-50/80 to-transparent",
    btnClass: "bg-teal hover:opacity-90",
    badge: "75+ Tests",
    badgeHi: "75+ जाँचें",
    badgeClass: "bg-teal-50 text-teal-700",
  },
  {
    id: "ultrasound",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="10" ry="6" />
        <path d="M12 2 C8 6 8 18 12 22 M12 2 C16 6 16 18 12 22" />
        <path d="M2 12 C6 10 18 10 22 12 M2 12 C6 14 18 14 22 12" />
      </svg>
    ),
    titleKey: "navUltrasound" as const,
    description: "Safe & accurate ultrasound imaging by trained professionals",
    descHi: "प्रशिक्षित पेशेवरों द्वारा सुरक्षित और सटीक अल्ट्रासाउंड",
    ctaKey: "bookUltrasound" as const,
    route: "/ultrasound",
    iconColor: "from-green-500 to-green-700",
    accentColor: "oklch(0.55 0.16 150)",
    shadowColor: "oklch(0.55 0.16 150 / 0.2)",
    bgTint: "from-green-50/80 to-transparent",
    btnClass: "bg-medical-green hover:opacity-90",
    badge: "8 Services",
    badgeHi: "8 सेवाएँ",
    badgeClass: "bg-green-50 text-green-700",
  },
  {
    id: "doctors",
    icon: <Stethoscope className="w-8 h-8" />,
    titleKey: "navDoctors" as const,
    description: "10 specialist doctors across multiple medical disciplines",
    descHi: "विभिन्न चिकित्सा विशेषज्ञताओं में 10 विशेषज्ञ डॉक्टर",
    ctaKey: "bookDoctor" as const,
    route: "/doctors",
    iconColor: "from-orange-500 to-orange-700",
    accentColor: "oklch(0.72 0.19 55)",
    shadowColor: "oklch(0.72 0.19 55 / 0.2)",
    bgTint: "from-orange-50/80 to-transparent",
    btnClass: "gradient-orange hover:opacity-90",
    badge: "10 Doctors",
    badgeHi: "10 डॉक्टर",
    badgeClass: "bg-orange-50 text-orange-700",
  },
];

const trustBadges = [
  { id: "trust", icon: <Shield className="w-5 h-5" />, label: "Trusted Care", labelHi: "विश्वसनीय देखभाल" },
  { id: "quality", icon: <Award className="w-5 h-5" />, label: "Quality Assured", labelHi: "गुणवत्ता सुनिश्चित" },
  { id: "hours", icon: <Clock className="w-5 h-5" />, label: "Open Every Day", labelHi: "हर दिन खुला" },
];

const whyChooseUs = [
  {
    id: "modern",
    emoji: "🏥",
    title: "Modern Facility",
    titleHi: "आधुनिक सुविधा",
    desc: "State-of-the-art equipment and hygienic environment for accurate results.",
    descHi: "सटीक परिणामों के लिए अत्याधुनिक उपकरण और स्वच्छ वातावरण।",
  },
  {
    id: "quick",
    emoji: "⚡",
    title: "Quick Reports",
    titleHi: "त्वरित रिपोर्ट",
    desc: "Fast turnaround on lab results so you get answers when you need them.",
    descHi: "त्वरित लैब परिणाम ताकि आपको समय पर जवाब मिले।",
  },
  {
    id: "affordable",
    emoji: "💰",
    title: "Affordable Prices",
    titleHi: "किफायती कीमतें",
    desc: "Competitive pricing on all tests and medicines without compromising quality.",
    descHi: "गुणवत्ता से समझौता किए बिना सभी जाँचों और दवाओं पर प्रतिस्पर्धी मूल्य।",
  },
];

export function HomePage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] gradient-hero flex flex-col justify-center overflow-hidden">
        <FloatingMedicalIcons />

        {/* Atmospheric depth layers */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl animate-spin-slow pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-teal-500/10 blur-2xl animate-spin-slow pointer-events-none" style={{animationDirection:"reverse"}} aria-hidden="true" />
        {/* Radial focal glow behind heading */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-blue-400/8 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10 text-center text-white pt-8 pb-4">
          {/* Location chip */}
          <div className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-5 animate-fade-in text-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-scale inline-block" />
            Bundu, Jharkhand &nbsp;·&nbsp; Est. Healthcare Centre
          </div>

          {/* Main heading — bigger, tighter, more weight */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-3 animate-slide-in-up">
            {language === "EN" ? (
              <>
                CITY PHARMA
                <br />
                <span className="text-teal-300">&amp; DIAGNOSTIC</span>
                <br />
                <span className="text-white/90 text-3xl md:text-4xl lg:text-5xl font-normal tracking-normal">CENTRE</span>
              </>
            ) : (
              <>
                सिटी फार्मा
                <br />
                <span className="text-teal-300">एंड डायग्नोस्टिक</span>
                <br />
                <span className="text-white/90 text-3xl md:text-4xl lg:text-5xl font-normal tracking-normal">सेंटर</span>
              </>
            )}
          </h1>

          {/* Subtitle — one sentence, clearly below the brand */}
          <p className="text-base md:text-lg text-blue-200 max-w-xl mx-auto mb-6 leading-relaxed animate-slide-in-up" style={{animationDelay:"0.15s"}}>
            {language === "EN"
              ? "Your trusted healthcare partner — pharmacy, pathology, ultrasound & specialist doctors in Bundu Panch Pargana."
              : "बुंडू पंच परगना में आपका विश्वसनीय स्वास्थ्य केंद्र — फार्मेसी, पैथोलॉजी, अल्ट्रासाउंड और विशेषज्ञ डॉक्टर।"}
          </p>

          {/* CTA buttons — primary action first */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-slide-in-up" style={{animationDelay:"0.25s"}}>
            <Button
              onClick={() => navigate({ to: "/doctors" })}
              className="gradient-orange text-white shadow-orange hover:opacity-90 transition-opacity font-bold px-6 py-3 rounded-xl text-sm"
            >
              {t.bookDoctor} <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
            <Button
              onClick={() => navigate({ to: "/pathology" })}
              variant="outline"
              className="border-white/30 text-white bg-white/8 hover:bg-white/18 font-semibold px-6 py-3 rounded-xl text-sm backdrop-blur-sm"
            >
              {t.bookPathology} <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>

          {/* Contact strip — quieter, below CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-blue-300 animate-fade-in" style={{animationDelay:"0.4s"}}>
            <a href="tel:9931918438" className="flex items-center gap-1 hover:text-white transition-colors bg-white/8 rounded-full px-3 py-1.5">
              <Phone className="w-3 h-3" />9931918438
            </a>
            <a href="tel:7004655571" className="flex items-center gap-1 hover:text-white transition-colors bg-white/8 rounded-full px-3 py-1.5">
              <Phone className="w-3 h-3" />7004655571
            </a>
            <a href="mailto:citypharmanavdurga@gmail.com" className="flex items-center gap-1 hover:text-white transition-colors bg-white/8 rounded-full px-3 py-1.5">
              <Mail className="w-3 h-3" />citypharmanavdurga@gmail.com
            </a>
          </div>
        </div>

        {/* ECG line at bottom — brighter green pulse */}
        <div className="mt-auto">
          <EcgAnimation />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {trustBadges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-2 text-sm font-medium text-medical-blue">
                <span className="text-teal">{badge.icon}</span>
                {language === "EN" ? badge.label : badge.labelHi}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-medical-blue mb-3">
              {language === "EN" ? "Our Services" : "हमारी सेवाएँ"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "EN"
                ? "Comprehensive healthcare services under one roof — pharmacy, diagnostics, imaging, and specialist consultations."
                : "एक ही छत के नीचे व्यापक स्वास्थ्य सेवाएँ — फार्मेसी, डायग्नोस्टिक्स, इमेजिंग और विशेषज्ञ परामर्श।"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, idx) => (
              <div
                key={svc.id}
                className="service-card group animate-slide-in-up"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                  // Per-service accent color variables picked up by CSS
                  ["--card-accent" as string]: svc.accentColor,
                  ["--card-shadow" as string]: svc.shadowColor,
                }}
              >
                {/* Tinted bg wash from top */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${svc.bgTint} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} aria-hidden="true" />

                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${svc.iconColor} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  {svc.icon}
                </div>

                {/* Badge */}
                <span className={`relative inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${svc.badgeClass}`}>
                  {language === "EN" ? svc.badge : svc.badgeHi}
                </span>

                {/* Title */}
                <h3 className="relative font-serif text-xl font-bold text-medical-blue mb-2 leading-tight">
                  {t[svc.titleKey]}
                </h3>

                {/* Description */}
                <p className="relative text-sm text-muted-foreground mb-5 leading-relaxed">
                  {language === "EN" ? svc.description : svc.descHi}
                </p>

                {/* CTA — pushed to bottom */}
                <Button
                  onClick={() => navigate({ to: svc.route })}
                  className={`relative w-full text-white transition-opacity text-sm font-bold rounded-xl py-2.5 ${svc.btnClass}`}
                >
                  {t[svc.ctaKey]} <ChevronRight className="ml-1 w-3.5 h-3.5 inline" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-medical-blue text-center mb-8">
            {language === "EN" ? "Why Choose Us?" : "हमें क्यों चुनें?"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whyChooseUs.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-5 rounded-2xl bg-background border border-border hover:border-teal transition-colors">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <h4 className="font-semibold text-medical-blue mb-1">
                    {language === "EN" ? item.title : item.titleHi}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === "EN" ? item.desc : item.descHi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
