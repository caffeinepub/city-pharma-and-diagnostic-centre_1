import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

// Pulsing map pin
function MapPinAnimation() {
  return (
    <div className="relative flex items-center justify-center h-32" aria-hidden="true">
      {/* Pulse rings */}
      {["ring-a", "ring-b", "ring-c"].map((key, i) => (
        <div
          key={key}
          className="absolute rounded-full border-2 border-medical-blue/40 animate-us-pulse"
          style={{
            width: `${60 + i * 30}px`,
            height: `${60 + i * 30}px`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}
      {/* Map pin icon */}
      <div className="relative z-10 animate-map-bounce">
        <div className="w-10 h-10 gradient-blue-teal rounded-full flex items-center justify-center shadow-blue">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        {/* Pin shadow */}
        <div className="w-4 h-2 bg-black/20 rounded-full mx-auto mt-1 blur-sm" />
      </div>
    </div>
  );
}

// Floating contact icons
function FloatingContactIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Envelope */}
      <div className="absolute top-12 left-16 animate-float-slow opacity-15">
        <svg viewBox="0 0 40 30" className="w-10 h-8" aria-hidden="true">
          <rect x="2" y="2" width="36" height="26" rx="4" fill="none" stroke="white" strokeWidth="2"/>
          <path d="M2,4 L20,18 L38,4" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
      </div>
      {/* Phone */}
      <div className="absolute top-20 right-20 animate-float-medium opacity-15" style={{animationDelay:"1s"}}>
        <svg viewBox="0 0 30 40" className="w-8 h-10" aria-hidden="true">
          <rect x="4" y="2" width="22" height="36" rx="4" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="15" cy="32" r="2" fill="white"/>
          <line x1="10" y1="8" x2="20" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      {/* Clock */}
      <div className="absolute bottom-16 left-20 animate-float-fast opacity-15" style={{animationDelay:"2s"}}>
        <svg viewBox="0 0 40 40" className="w-10 h-10" aria-hidden="true">
          <circle cx="20" cy="20" r="17" fill="none" stroke="white" strokeWidth="2"/>
          <line x1="20" y1="20" x2="20" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="20" y1="20" x2="28" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

const contactInfo = [
  {
    id: "phone1",
    icon: <Phone className="w-5 h-5" />,
    label: "Primary Phone",
    labelHi: "प्राथमिक फोन",
    value: "9931918438",
    href: "tel:9931918438",
    color: "bg-medical-blue-light text-medical-blue",
  },
  {
    id: "phone2",
    icon: <Phone className="w-5 h-5" />,
    label: "Secondary Phone",
    labelHi: "वैकल्पिक फोन",
    value: "7004655571",
    href: "tel:7004655571",
    color: "bg-medical-blue-light text-medical-blue",
  },
  {
    id: "email",
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    labelHi: "ईमेल",
    value: "citypharmanavdurga@gmail.com",
    href: "mailto:citypharmanavdurga@gmail.com",
    color: "bg-teal-light text-teal",
  },
  {
    id: "hours",
    icon: <Clock className="w-5 h-5" />,
    label: "Working Hours",
    labelHi: "काम के घंटे",
    value: "8:00 AM – 8:00 PM (All Days)",
    valueHi: "सुबह 8:00 – रात 8:00 (सभी दिन)",
    href: null,
    color: "bg-orange-50 text-orange-accent",
  },
];

export function ContactPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 overflow-hidden text-white">
        <FloatingContactIcons />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block bg-white/15 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                📍 {language === "EN" ? "Find Us" : "हमें खोजें"}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                {t.contactHeading}
              </h1>
              <p className="text-blue-100 text-lg max-w-xl">
                {language === "EN"
                  ? "Visit us at our facility in Bundu, Jharkhand or reach out through any of the contact channels below."
                  : "बुंडू, झारखंड में हमारी सुविधा पर जाएं या नीचे दिए गए किसी भी संपर्क चैनल के माध्यम से संपर्क करें।"}
              </p>
            </div>
            <MapPinAnimation />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-medical-blue mb-6">
                {language === "EN" ? "Get In Touch" : "संपर्क करें"}
              </h2>

              {/* Address */}
              <div className="bg-white rounded-2xl shadow-card p-5 mb-5 border-l-4 border-medical-blue">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-medical-blue-light rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-medical-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      {language === "EN" ? "Address" : "पता"}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Near College More Bundu,<br />
                      Opposite Bank of Baroda,<br />
                      Bundu Branch, NH-33,<br />
                      Bundu, Jharkhand
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact cards */}
              <div className="grid grid-cols-1 gap-3">
                {contactInfo.map((info) => (
                  <div key={info.id} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${info.color}`}>
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {language === "EN" ? info.label : info.labelHi}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm font-semibold text-foreground hover:text-medical-blue transition-colors truncate block"
                        >
                          {"valueHi" in info && language === "HI" ? info.valueHi : info.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-foreground">
                          {"valueHi" in info && language === "HI" ? info.valueHi : info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Language */}
              <div className="bg-white rounded-2xl shadow-card p-4 mt-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-light rounded-xl flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Languages</p>
                  <p className="text-sm font-semibold text-foreground">English | हिन्दी</p>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <a href="tel:9931918438">
                  <Button className="gradient-blue-teal text-white rounded-xl font-semibold">
                    <Phone className="mr-2 w-4 h-4" />
                    {language === "EN" ? "Call Now" : "अभी कॉल करें"}
                  </Button>
                </a>
                <a href="mailto:citypharmanavdurga@gmail.com">
                  <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white rounded-xl font-semibold transition-all">
                    <Mail className="mr-2 w-4 h-4" />
                    {language === "EN" ? "Email Us" : "ईमेल करें"}
                  </Button>
                </a>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-medical-blue mb-6">
                {language === "EN" ? "Find Us on Map" : "नक्शे पर हमें खोजें"}
              </h2>

              {/* Google Maps embed */}
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <iframe
                  title="City Pharma and Diagnostic Centre Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0!2d85.5808!3d23.1650!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCity+Pharma+Bundu+Jharkhand!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>

              {/* Directions card */}
              <div className="bg-white rounded-2xl shadow-card p-5 mt-4 border-l-4 border-teal">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal" />
                  {language === "EN" ? "How to Reach Us" : "हमारे यहाँ कैसे पहुँचें"}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {language === "EN" ? "Located on NH-33, main highway" : "NH-33, मुख्य राजमार्ग पर स्थित"}</li>
                  <li>• {language === "EN" ? "Opposite Bank of Baroda, Bundu Branch" : "बैंक ऑफ़ बड़ौदा, बुंडू शाखा के सामने"}</li>
                  <li>• {language === "EN" ? "Near College More, Bundu" : "कॉलेज मोड़, बुंडू के पास"}</li>
                  <li>• {language === "EN" ? "Easy access from Ranchi & surrounding areas" : "रांची और आसपास के क्षेत्रों से आसान पहुँच"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
