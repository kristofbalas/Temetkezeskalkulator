import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Köszönjük üzenetét! Hamarosan felvesszük Önnel a kapcsolatot.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Hero Section */}
      <div className="bg-[#f3edda] rounded-bl-[40px] rounded-br-[40px] pb-12 md:pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Header with Logo and Navigation */}
          <div className="flex items-center justify-between py-6">
            {/* Navigation */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className="text-[rgb(0,0,0)] px-4 py-2 rounded-[8px] text-[14px] leading-[20px] hover:bg-white/10 transition-colors"
              >
                Kezdőlap
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-[rgb(0,0,0)] px-4 py-2 rounded-[8px] text-[14px] leading-[20px] hover:bg-white/10 transition-colors"
              >
                Rólunk
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className="text-[rgb(0,0,0)] px-4 py-2 rounded-[8px] text-[14px] leading-[20px] hover:bg-white/10 transition-colors"
              >
                GYIK
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="bg-[rgb(49,88,122)] text-[#31587A] px-4 py-2 rounded-[8px] text-[14px] leading-[20px] hover:bg-white/90 transition-colors text-[rgb(255,255,255)]"
              >
                Kapcsolat
              </button>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center py-12 md:py-16">
            <h1 className="text-[48px] md:text-[64px] leading-[56px] md:leading-[72px] text-black font-['Montserrat'] font-medium mb-6">
              Kapcsolat
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Keressen minket bizalommal, szívesen válaszolunk kérdéseire.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Telefonszám */}
            <div className="rounded-2xl bg-gradient-to-br from-[#E8F4F8] to-white p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#31587A] to-[#264666]">
                  <Phone className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-[#31587A]">Telefonszám</h3>
                  <a
                    href="tel:+36704090553"
                    className="text-gray-700 hover:text-[#31587A] transition-colors"
                  >
                    06 70 409 0553
                  </a>
                </div>
              </div>
            </div>

            {/* E-mail */}
            <div className="rounded-2xl bg-gradient-to-br from-[#E8F4F8] to-white p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#31587A] to-[#264666]">
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-[#31587A]">E-mail</h3>
                  <a
                    href="mailto:info@temetkezeskalkulator.hu"
                    className="text-gray-700 hover:text-[#31587A] transition-colors break-all"
                  >
                    info@temetkezeskalkulator.hu
                  </a>
                </div>
              </div>
            </div>

            {/* Cím */}
            <div className="rounded-2xl bg-gradient-to-br from-[#E8F4F8] to-white p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#31587A] to-[#264666]">
                  <MapPin className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-[#31587A]">Cím</h3>
                  <p className="text-gray-700">
                    Budapest
                  </p>
                </div>
              </div>
            </div>

            {/* Nyitvatartás */}
            <div className="rounded-2xl bg-gradient-to-br from-[#E8F4F8] to-white p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#31587A] to-[#264666]">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-[#31587A]">Nyitvatartás</h3>
                  <p className="text-gray-700">
                    Hétfő-Péntek: 8:00-18:00
                    <br />
                    Szombat: 9:00-14:00
                    <br />
                    Vasárnap: Zárva
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}