import { Phone, Mail, Clock, MapPin, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-medical-blue-dark text-white">
      {/* Contact strip */}
      <div className="bg-medical-blue py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm">
            <a href="tel:9931918438" className="flex items-center gap-2 hover:text-orange-300 transition-colors">
              <Phone className="w-4 h-4" />
              <span>9931918438</span>
            </a>
            <a href="tel:7004655571" className="flex items-center gap-2 hover:text-orange-300 transition-colors">
              <Phone className="w-4 h-4" />
              <span>7004655571</span>
            </a>
            <a href="mailto:citypharmanavdurga@gmail.com" className="flex items-center gap-2 hover:text-orange-300 transition-colors">
              <Mail className="w-4 h-4" />
              <span>citypharmanavdurga@gmail.com</span>
            </a>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{t.workingHoursValue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-3">CITY PHARMA</h3>
            <p className="text-sm text-blue-200 mb-2">& DIAGNOSTIC CENTRE</p>
            <p className="text-sm text-blue-100 leading-relaxed">
              Your trusted healthcare partner providing quality pharmacy, pathology, ultrasound, and doctor consultation services in Bundu, Jharkhand.
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold text-lg mb-3">{t.address}</h4>
            <div className="flex items-start gap-2 text-sm text-blue-100">
              <MapPin className="w-4 h-4 mt-1 shrink-0" />
              <p className="leading-relaxed">
                Near College More Bundu,<br />
                Opposite Bank of Baroda,<br />
                Bundu Branch, NH-33,<br />
                Bundu, Jharkhand
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-lg mb-3">{t.workingHours}</h4>
            <div className="flex items-center gap-2 text-sm text-blue-100 mb-2">
              <Clock className="w-4 h-4" />
              <span>{t.workingHoursValue}</span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-blue-300 mb-1 uppercase tracking-wide">Emergency Contact</p>
              <a href="tel:9931918438" className="text-orange-300 font-semibold hover:text-orange-200 transition-colors">
                📞 9931918438
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-blue-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-blue-300">
          <p>© 2026 City Pharma and Diagnostic Centre. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-heartbeat" /> using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-300 hover:text-orange-200 transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
