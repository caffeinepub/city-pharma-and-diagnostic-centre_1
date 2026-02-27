import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: t.navHome },
    { to: "/medicines", label: t.navMedicine },
    { to: "/pathology", label: t.navPathology },
    { to: "/ultrasound", label: t.navUltrasound },
    { to: "/doctors", label: t.navDoctors },
    { to: "/contact", label: t.navContact },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-blue bg-medical-blue">
              <img src="/assets/generated/city-pharma-logo-transparent.dim_120x120.png" alt="City Pharma" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-sm font-bold text-medical-blue tracking-wide">
                CITY PHARMA
              </div>
              <div className="text-xs text-muted-foreground font-medium tracking-wider">
                & DIAGNOSTIC CENTRE
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-medical-blue text-white shadow-blue"
                    : "text-foreground hover:bg-medical-blue-light hover:text-medical-blue"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language toggle + mobile menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="font-semibold text-xs border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white transition-all duration-200 px-3"
            >
              {language === "EN" ? "हिन्दी" : "English"}
            </Button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-3 pb-3 border-t border-border pt-3 animate-slide-in-up">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? "bg-medical-blue text-white"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
