import { Heart, Users, Shield, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
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
                className="bg-[rgb(49,88,122)] text-[#31587A] px-4 py-2 rounded-[8px] text-[14px] leading-[20px] hover:bg-white/90 transition-colors text-[rgb(255,255,255)]"
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
          </div>

          {/* Hero Content */}
          <div className="text-center py-12 md:py-16">
            <h1 className="text-[48px] md:text-[64px] leading-[56px] md:leading-[72px] text-black font-['Montserrat'] font-medium mb-6">
              Rólunk
            </h1>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p>
              Amikor valakit elveszítünk, a világ hirtelen megáll. Ilyenkor nem árakról, hanem emlékekről, szeretetről és méltó búcsúról gondolkodunk.
            </p>
            <p>
              Mégis, a döntések sora elkerülhetetlen — és épp ezekben a pillanatokban a legnehezebb józanul választani.
            </p>
            <p>
              Ezért hoztuk létre temetkezési kalkulátorunkat.
            </p>
            <p>
              Nem üzletet látunk a gyászban, hanem lehetőséget a segítségre.
            </p>
            <p>
              Célunk, hogy mindenki, aki temetést szervez, átlátható információkat kapjon — hogy ne a sietség, hanem a szeretet vezesse a döntéseket.
            </p>
            <p>
              Tapasztalt szakemberekként tudjuk, mennyi kérdés és bizonytalanság kíséri ezt az időszakot. Mi azért dolgozunk, hogy kíméletesen, tisztelettel és őszinte figyelemmel támogassuk Önt abban, hogy megtalálja a legjobb megoldást — emberileg és anyagilag egyaránt.
            </p>
            <p>
              Hiszünk abban, hogy egy méltó búcsú nem a kiadások nagyságán, hanem a törődés mélységén múlik.
            </p>
            <p>
              Most nehéz döntések előtt áll, mi pedig azért vagyunk, hogy segítsünk könnyebbé tenni ezt az utat.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}