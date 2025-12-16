import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Mail, Phone } from "lucide-react";

interface FAQPageProps {
  onNavigate?: (page: string) => void;
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const faqs = [
    {
      question: "Fizetnem kell a szolgáltatás használatáért?",
      answer:
        "Nem, a temetkezeskalkulator.hu platform használata teljesen ingyenes. Csak a kiválasztott temetkezési szolgáltatóval kötött szerződés értelmében kell fizetnie a temetkezési szolgáltatásokért.",
    },
    {
      question: "Mennyire pontosak az árkalkulációk?",
      answer:
        "Az árak tájékoztató jellegűek és a megadott információk alapján kerülnek kiszámításra. A végleges ár a kiválasztott temetkezési szolgáltatóval való egyeztetés után alakul ki, figyelembe véve az összes egyedi igényt és körülményt.",
    },
    {
      question: "Milyen temetkezési típusokat támogat a platform?",
      answer:
        "Jelenleg a hamvasztásos és a hagyományos temetkezési formákat támogatjuk. Mindkét esetben részletes árbontást és szolgáltatás-összehasonlítást biztosítunk.",
    },
    {
      question: "Hogyan választjátok ki a partnertemetkezési szolgáltatókat?",
      answer:
        "Partnereink gondosan kiválasztott, ellenőrzött és megbízható temetkezési szolgáltatók. Minden partner rendelkezik a szükséges engedélyekkel, tapasztalattal és pozitív ügyfélértékelésekkel.",
    },
    {
      question: "Mikor veszi fel velem a kapcsolatot a kiválasztott szolgáltató?",
      answer:
        "A kiválasztott temetkezési szolgáltató munkatársa 1 órán belül felveszi Önnel a kapcsolatot a megadott elérhetőségen (telefon vagy email), hogy megbeszéljék a részleteket és egyeztessenek az időpontot.",
    },
    {
      question: "Mi történik, ha nem vagyok elégedett a kiválasztott szolgáltatóval?",
      answer:
        "Ha bármilyen problémája adódik a kiválasztott szolgáltatóval, kérjük, jelezze felénk az ügyfélszolgálaton keresztül. Segítünk megoldani a helyzetet vagy ajánlunk másik szolgáltatót.",
    },
    {
      question: "Milyen információkat kell megadnom a kalkulátorban?",
      answer:
        "A kalkulátorban alapvető információkat kell megadnia: temetési típus (hamvasztás vagy hagyományos), időpont, helyszín, kerület, résztvevők száma és egyéb speciális igények. Ezután kapcsolatfelvételi adatait (név, telefon, email) kérjük.",
    },
    {
      question: "Biztonságban vannak a megadott adataim?",
      answer:
        "Igen, az Ön által megadott adatokat bizalmasan kezeljük és kizárólag a kiválasztott temetkezési szolgáltatóval osztjuk meg. Adatait nem adjuk át harmadik félnek és nem használjuk marketing célokra.",
    },
    {
      question: "Módosíthatom a megadott információkat az ajánlat elküldése után?",
      answer:
        "Az ajánlat elküldése után a módosításokat közvetlenül a kiválasztott temetkezési szolgáltatóval kell egyeztetnie, amikor felveszi Önnel a kapcsolatot.",
    },
    {
      question: "Milyen kerületekben érhetők el a szolgáltatók?",
      answer:
        "Partnereink Budapest minden kerületében elérhetők. A kalkulátor eredményei között csak azok a szolgáltatók jelennek meg, akik az Ön által megadott kerületben is szolgáltatnak.",
    },
    {
      question: "Milyen kiegészítő szolgáltatásokat lehet választani?",
      answer:
        "A kalkulátorban számos kiegészítő szolgáltatást választhat: anyakönyveztetés, nyugdíjfolyósító ügyintézés, virágdekoráció, zenés búcsúztatás, sírkő készítés és egyéb speciális igények.",
    },
    {
      question: "Elérhető nonstop ügyfélszolgálat?",
      answer:
        "Az online kalkulátor 0-24 órában elérhető. Telefonos ügyfélszolgálatunk munkanapokon 8-18 óra között áll rendelkezésére. Sürgős esetben partnereink közül többen is rendelkeznek nonstop elérhetőséggel.",
    },
  ];

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
                className="bg-[rgb(49,88,122)] text-[#31587A] px-4 py-2 rounded-[8px] text-[14px] leading-[20px] hover:bg-white/90 transition-colors text-[rgb(255,255,255)]"
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
              Gyakran Ismételt Kérdések
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Válaszok a leggyakrabban felmerülő kérdésekre a
              temetkezeskalkulator.hu használatával kapcsolatban.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl bg-white border border-gray-200 p-8 shadow-lg">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-[#31587A] hover:text-[#264666]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      
    </div>
  );
}