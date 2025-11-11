import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Kezdőlap" },
    { id: "about", label: "Rólunk" },
    { id: "faq", label: "GYIK" },
    { id: "contact", label: "Kapcsolat" },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#314EFF] to-[#2640CC] shadow-md">
              <span className="select-none text-white text-lg font-bold">VB</span>
            </div>
            <div className="hidden md:block">
              <div className="text-lg font-semibold text-[#314EFF]">vizibucsuztatas.hu</div>
              <div className="text-sm text-gray-600">
                Méltó búcsúztatás szeretettel
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                onClick={() => handleNavigate(item.id)}
                className={
                  currentPage === item.id
                    ? "bg-[#31587A] hover:bg-[#264666] text-white h-11 px-6"
                    : "text-gray-700 hover:text-[#314EFF] hover:bg-[#E8F5FF] h-11 px-6"
                }
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#314EFF]" />
            ) : (
              <Menu className="h-6 w-6 text-[#314EFF]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => handleNavigate(item.id)}
                  className={
                    currentPage === item.id
                      ? "bg-[#31587A] hover:bg-[#264666] text-white justify-start h-12"
                      : "text-gray-700 hover:text-[#314EFF] hover:bg-[#E8F5FF] justify-start h-12"
                  }
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}