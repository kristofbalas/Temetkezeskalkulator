import imgTemetkezes5 from "figma:asset/6db100fb20bf218ee69ebc7f744b1132a01c6d91.png";
import imgTemetkezes1 from "figma:asset/1fb4c986ed719cdfd5b554052f6ccf8b832f7be9.png";
import imgTemetkezes2 from "figma:asset/5837b14e9549c3b49b98b1197e38e3b77cd5059f.png";
import imgTemetkezes3 from "figma:asset/334aa22c5dceeb59afb66a63b5408e2f910f6b08.png";
import imgTemetkezes4 from "figma:asset/842541a78e938db10896c0b214a78cce278d332a.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgMayronOliveiraMibn6LLm9KAUnsplash1 from "figma:asset/f1528eedf1908f7b9a8d7f384739251f755e08a0.png";
import imgImage1 from "figma:asset/26b26521bb5a593f71c53b4a11f866c00427cc4f.png";

interface StartScreenProps {
  onStart: () => void;
  onNavigate?: (page: string) => void;
}

export function StartScreen({ onStart, onNavigate }: StartScreenProps) {
  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Hero Section */}
      <div className="bg-[#FCF4D7] rounded-bl-[40px] rounded-br-[40px] pb-12 md:pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Header with Logo and Navigation */}
          <div className="flex items-center justify-between py-6">
            
            

            {/* Navigation */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className="bg-[rgb(49,88,122)] text-[#31587A] px-4 py-2 rounded-[8px] text-[14px] leading-[20px] hover:bg-white/90 transition-colors text-[rgb(255,255,255)]"
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
                className="text-[rgb(0,0,0)] px-4 py-2 rounded-[8px] text-[14px] leading-[20px] hover:bg-white/10 transition-colors"
              >
                Kapcsolat
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white px-4 py-2"
              onClick={() => {/* Add mobile menu logic if needed */}}
            >
              ☰
            </button>
          </div>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-8 md:mt-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <h1 className="md:text-[36px] leading-[35px] md:leading-[42px] font-['Montserrat'] font-medium text-[rgb(0,0,0)] text-[40px]">
                10 budapesti temetkezés ajánlata – egy helyen.
              </h1>
              
              <p className="text-[16px] leading-[24px] text-[rgb(0,0,0)] font-bold font-[Montserrat]">
                Adja meg az alap adatokat, és hasonlítsa össze 10 budapesti temetkezés ajánlatát – gyorsan, átláthatóan. Az űrlap kitöltése után 1 órán belül felvesszük Önnel a kapcsolatot, a kiválasztott temetkezési iroda pedig már felkészülten várja Önt.
              </p>

              <button
                onClick={onStart}
                className="bg-[#31587A] text-white px-6 py-3 rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] font-['Montserrat'] font-semibold text-[14px] leading-[20px] hover:bg-white hover:text-[#31587A] transition-colors inline-block"
              >
                Kalkuláció indítása
              </button>
            </div>

            {/* Right Image */}
            <div className="rounded-[16px] overflow-hidden">
              <img 
                alt="Vízi búcsúztatás" 
                className="w-full h-auto object-cover rounded-[16px]" 
                src={imgMayronOliveiraMibn6LLm9KAUnsplash1} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Partnereink Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <h2 className="text-[28px] md:text-[36px] leading-[35px] text-black text-center font-['Montserrat'] font-medium mb-8 md:mb-12">
          Partnereink
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {[
            { src: imgTemetkezes1, alt: "Partner 1" },
            { src: imgTemetkezes2, alt: "Partner 2" },
            { src: imgTemetkezes3, alt: "Partner 3" },
            { src: imgTemetkezes4, alt: "Partner 4" },
            { src: imgTemetkezes5, alt: "Partner 5" }
          ].map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <img 
                alt={partner.alt} 
                className="h-[100px] w-auto object-contain" 
                src={partner.src} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hogyan működik Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
        <div className="bg-[rgb(252,244,215)] rounded-[22px] p-8 md:p-12 lg:p-16">
          <h2 className="text-[28px] md:text-[36px] leading-[35px] text-black text-center font-['Montserrat'] font-medium mb-8 md:mb-12">
            Hogyan működik?
          </h2>

          <div className="max-w-[800px] mx-auto space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="bg-[#31587A] rounded-full w-[48px] h-[48px] flex-shrink-0 flex items-center justify-center">
                <p className="text-white text-[16px] leading-[24px]">1</p>
              </div>
              <div className="flex-1">
                <h3 className="text-[#31587A] text-[16px] leading-[24px] font-['Montserrat'] font-semibold mb-2">
                  Adatok megadása
                </h3>
                <p className="text-[#6b7b8a] text-[16px] leading-[24px]">
                  Válassza ki az aktuális körülményeket.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="bg-[#31587A] rounded-full w-[48px] h-[48px] flex-shrink-0 flex items-center justify-center">
                <p className="text-white text-[16px] leading-[24px]">2</p>
              </div>
              <div className="flex-1">
                <h3 className="text-[#31587A] text-[16px] leading-[24px] font-['Montserrat'] font-semibold mb-2">
                  Kapcsolattartás rögzítése
                </h3>
                <p className="text-[#6b7b8a] text-[16px] leading-[24px]">
                  Adja meg elérhetőségeit, hogy ajánlatunkat személyre szabhassuk.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="bg-[#31587A] rounded-full w-[48px] h-[48px] flex-shrink-0 flex items-center justify-center">
                <p className="text-white text-[16px] leading-[24px]">3</p>
              </div>
              <div className="flex-1">
                <h3 className="text-[#31587A] text-[16px] leading-[24px] font-['Montserrat'] font-semibold mb-2">
                  Ajánlatok megtekintése
                </h3>
                <p className="text-[#6b7b8a] text-[16px] leading-[24px]">
                  A rendszer összehasonlítja 10 budapesti temetkezési partner ajánlatát – átláthatóan, rejtett költségek nélkül.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="bg-[#31587A] rounded-full w-[48px] h-[48px] flex-shrink-0 flex items-center justify-center">
                <p className="text-white text-[16px] leading-[24px]">4</p>
              </div>
              <div className="flex-1">
                <h3 className="text-[#31587A] text-[16px] leading-[24px] font-['Montserrat'] font-semibold mb-2">
                  Személyes kapcsolat 1 órán belül
                </h3>
                <p className="text-[#6b7b8a] text-[16px] leading-[24px]">
                  Munkatársunk felveszi Önnel a kapcsolatot a részletek pontosításához.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="bg-[#31587A] rounded-full w-[48px] h-[48px] flex-shrink-0 flex items-center justify-center">
                <p className="text-white text-[16px] leading-[24px]">5</p>
              </div>
              <div className="flex-1">
                <h3 className="text-[#31587A] text-[16px] leading-[24px] font-['Montserrat'] font-semibold mb-2">
                  Zökkenőmentes ügyintézés az irodában
                </h3>
                <p className="text-[#6b7b8a] text-[16px] leading-[24px]">
                  A kiválasztott temetkezés már látja az Ön ajánlatát – nem kell újra elmondani a körülményeket.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}