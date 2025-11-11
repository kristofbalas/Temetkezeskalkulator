import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { StartScreen } from "./components/StartScreen";
import { AboutPage } from "./components/AboutPage";
import { FAQPage } from "./components/FAQPage";
import { ContactPage } from "./components/ContactPage";
import { CalculatorForm, CalculatorData } from "./components/CalculatorForm";
import { DataCollection, UserData } from "./components/DataCollection";
import { ResultsList, FuneralCompany } from "./components/ResultsList";
import {
  CompanyDetailsModal,
  CompanyDetails,
  ExtraServices,
} from "./components/CompanyDetailsModal";
import { SummaryScreen } from "./components/SummaryScreen";
import { ThankYouScreen } from "./components/ThankYouScreen";
import { PrintableReceipt } from "./components/PrintableReceipt";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

type Screen =
  | "home"
  | "about"
  | "faq"
  | "contact"
  | "calculator"
  | "data"
  | "results"
  | "summary"
  | "thankyou"
  | "receipt";

// Mock data for funeral companies
const mockCompanies: (FuneralCompany & {
  description: string;
  serviceBreakdown: any;
  offices: string[];
  contact: any;
  image?: string;
})[] = [
  {
    id: "1",
    name: "Aqua Memória Temetkezés",
    logo: "https://images.unsplash.com/photo-1557683316-973673baf926?w=200",
    image: "https://images.unsplash.com/photo-1759604218242-bb2e68ba7477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    price: 400000,
    rating: 4.8,
    reviewCount: 142,
    districts: ["I.", "II.", "XII."],
    earliestCeremony: 6,
    services: ["Nyugdíjfolyósító"],
    description:
      "Családias légkörben, professzionális szolgáltatással segítünk méltó búcsút venni szeretteitől. Több mint 25 éves tapasztalattal.",
    serviceBreakdown: {
      hamvasztas: 160000,
      elszallitas: 50000,
      urna: 30000,
      bucsuztatas: 120000,
      egyeb: 40000,
    },
    offices: ["Budapest, I. kerület, Ybl Miklós tér 9.", "Budapest, XII. kerület, Alkotás utca 53."],
    contact: {
      phone: "06704090553",
      email: "info@temetkezeskalkulator.hu",
    },
  },
  {
    id: "2",
    name: "Víztükör Temetkezési Szolgálat",
    logo: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=200",
    image: "https://images.unsplash.com/photo-1618322928259-b8e2a0db02ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    price: 1150000,
    rating: 4.9,
    reviewCount: 98,
    districts: ["V.", "VI.", "VII.", "VIII."],
    earliestCeremony: 7,
    services: [],
    description:
      "Modern, empatikus temetkezési szolgáltatás a belvárosban. Éjjel-nappal elérhetőek vagyunk. Speciális vízparti búcsúztatási lehetőségek.",
    serviceBreakdown: {
      hamvasztas: 170000,
      elszallitas: 60000,
      urna: 200000,
      bucsuztatas: 650000,
      egyeb: 70000,
    },
    offices: [
      "Budapest, V. kerület, Kossuth Lajos utca 10.",
      "Budapest, VIII. kerület, Rákóczi út 42.",
    ],
    contact: {
      phone: "06704090553",
      email: "info@temetkezeskalkulator.hu",
    },
  },
  {
    id: "3",
    name: "Dunakanyar Kegyeleti Intézet",
    logo: "https://images.unsplash.com/photo-1557682260-96773eb01377?w=200",
    image: "https://images.unsplash.com/photo-1758334587590-011cf260c10f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    price: 680000,
    rating: 4.7,
    reviewCount: 176,
    districts: ["III.", "IV.", "XIII.", "XV."],
    earliestCeremony: 8,
    services: ["Trombitás biztosítása"],
    description:
      "Hagyományos értékek modern kivitelezésben. Tapasztalt munkatársaink készen állnak segíteni a legnehezebb időszakban is.",
    serviceBreakdown: {
      hamvasztas: 150000,
      elszallitas: 45000,
      urna: 30000,
      bucsuztatas: 400000,
      egyeb: 55000,
    },
    offices: [
      "Budapest, III. kerület, Bécsi út 85.",
      "Budapest, XIII. kerület, Váci út 120.",
    ],
    contact: {
      phone: "06704090553",
      email: "info@temetkezeskalkulator.hu",
    },
  },
  {
    id: "4",
    name: "Tengerkék Búcsúztató",
    logo: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=200",
    image: "https://images.unsplash.com/photo-1654751131622-6681fb839925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    price: 580000,
    rating: 5.0,
    reviewCount: 64,
    districts: ["II.", "XI.", "XII.", "XXII."],
    earliestCeremony: 9,
    services: [
      "Nyugdíjfolyósító",
      "Trombitás biztosítása",
    ],
    description:
      "Prémium minőségű temetkezési szolgáltatások egyedi megoldásokkal. Különleges figyelmet fordítunk minden részletre.",
    serviceBreakdown: {
      hamvasztas: 165000,
      elszallitas: 55000,
      urna: 30000,
      bucsuztatas: 280000,
      egyeb: 50000,
    },
    offices: [
      "Budapest, II. kerület, Margit körút 64.",
      "Budapest, XI. kerület, Bartók Béla út 98.",
    ],
    contact: {
      phone: "06704090553",
      email: "info@temetkezeskalkulator.hu",
    },
  },
  {
    id: "5",
    name: "Folyami Nyugalom Temetkezés",
    logo: "https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=200",
    image: "https://images.unsplash.com/photo-1748898420118-0cc7548c0af6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    price: 1050000,
    rating: 4.6,
    reviewCount: 201,
    districts: ["IX.", "X.", "XVIII.", "XIX.", "XX."],
    earliestCeremony: 10,
    services: [],
    description:
      "Kedvező árakon, megbízható szolgáltatás. Több pesti kerületben is elérhetőek vagyunk, gyors reagálási idővel.",
    serviceBreakdown: {
      hamvasztas: 145000,
      elszallitas: 40000,
      urna: 200000,
      bucsuztatas: 600000,
      egyeb: 65000,
    },
    offices: [
      "Budapest, IX. kerület, Üllői út 123.",
      "Budapest, X. kerület, Kőbányai út 45.",
    ],
    contact: {
      phone: "06704090553",
      email: "info@temetkezeskalkulator.hu",
    },
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(
    null
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<CompanyDetails | null>(
    null
  );
  const [extraServices, setExtraServices] = useState<ExtraServices>({ trumpeter: false, pensionProcessor: false });
  const [selectedOffice, setSelectedOffice] = useState<string>("");
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsCompany, setDetailsCompany] = useState<CompanyDetails | null>(
    null
  );
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [overallProgress, setOverallProgress] = useState(0);

  const handleStartCalculator = () => {
    setCurrentScreen("calculator");
  };

  const handleCalculatorComplete = (data: CalculatorData) => {
    setCalculatorData(data);
    setCurrentScreen("data");
  };

  const handleDataComplete = (data: UserData) => {
    setUserData(data);
    setCurrentScreen("results");
  };

  const handleViewDetails = (company: FuneralCompany) => {
    const fullCompany = mockCompanies.find((c) => c.id === company.id);
    if (fullCompany) {
      setDetailsCompany(fullCompany as CompanyDetails);
      setDetailsModalOpen(true);
    }
  };

  const handleSelectCompany = (company: CompanyDetails | FuneralCompany, extras: ExtraServices) => {
    // Convert FuneralCompany to CompanyDetails if needed
    let fullCompany: CompanyDetails;
    
    if ('description' in company) {
      fullCompany = company as CompanyDetails;
    } else {
      // Find the full company data
      const foundCompany = mockCompanies.find((c) => c.id === company.id);
      if (!foundCompany) return;
      fullCompany = foundCompany as CompanyDetails;
    }
    
    setSelectedCompany(fullCompany);
    setExtraServices(extras);
    setDetailsModalOpen(false);
    setOverallProgress(75); // Company selected, move to summary (75%)
    toast.success(`${fullCompany.name} kiválasztva`, {
      description: "Folytassa az összegző oldalon",
    });
    setCurrentScreen("summary");
  };

  const handleCompare = (selectedCompanies: FuneralCompany[]) => {
    toast.info("Összehasonlítás", {
      description: `${selectedCompanies.length} ajánlat kiválasztva összehasonlításhoz`,
    });
  };

  const handleConfirmSummary = () => {
    // Generate confirmation number
    const number = `VB-${Date.now().toString().slice(-8)}`;
    setConfirmationNumber(number);
    setOverallProgress(100); // Completed!

    toast.success("Ajánlat sikeresen elküldve!", {
      description: `Ajánlatszám: ${number}`,
    });

    setCurrentScreen("thankyou");
  };

  const handleReturnHome = () => {
    // Reset all state
    setCurrentScreen("home");
    setCalculatorData(null);
    setUserData(null);
    setSelectedCompany(null);
    setExtraServices({ trumpeter: false, pensionProcessor: false });
    setConfirmationNumber("");
    setOverallProgress(0);
  };

  const handleNavigate = (page: string) => {
    setCurrentScreen(page as Screen);
  };

  const handleViewReceipt = () => {
    setCurrentScreen("receipt");
  };

  const handleCloseReceipt = () => {
    setCurrentScreen("thankyou");
  };

  const handleBack = () => {
    if (currentScreen === "calculator") {
      setCurrentScreen("home");
    } else if (currentScreen === "data") {
      setCurrentScreen("calculator");
    } else if (currentScreen === "results") {
      setCurrentScreen("data");
    } else if (currentScreen === "summary") {
      setCurrentScreen("results");
    }
    // Note: We keep calculatorData and userData intact for navigation
  };

  return (
    <div className="min-h-screen">
      <Toaster />
      
      {currentScreen === "home" && (
        <StartScreen onStart={handleStartCalculator} onNavigate={handleNavigate} />
      )}

      {currentScreen === "about" && <AboutPage onNavigate={handleNavigate} />}

      {currentScreen === "faq" && <FAQPage onNavigate={handleNavigate} />}

      {currentScreen === "contact" && <ContactPage onNavigate={handleNavigate} />}

      {currentScreen === "calculator" && (
        <CalculatorForm 
          onComplete={handleCalculatorComplete} 
          onBack={handleBack}
          initialData={calculatorData || undefined}
          overallProgress={overallProgress}
          onProgressUpdate={setOverallProgress}
        />
      )}

      {currentScreen === "data" && (
        <DataCollection 
          onComplete={handleDataComplete} 
          onBack={handleBack}
          initialData={userData || undefined}
          overallProgress={overallProgress}
          onProgressUpdate={setOverallProgress}
        />
      )}

      {currentScreen === "results" && (
        <>
          <ResultsList
            companies={mockCompanies}
            onViewDetails={handleViewDetails}
            onCompare={handleCompare}
            onSelectCompany={handleSelectCompany}
            onBack={handleBack}
            overallProgress={overallProgress}
            onProgressUpdate={setOverallProgress}
          />
          <CompanyDetailsModal
            company={detailsCompany}
            isOpen={detailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            onSelect={handleSelectCompany}
            ceremonyType={calculatorData?.ceremonyType}
            farewellType={calculatorData?.farewellType}
            hasBurialPlace={calculatorData?.hasBurialPlace}
          />
        </>
      )}

      {currentScreen === "summary" &&
        calculatorData &&
        userData &&
        selectedCompany && (
          <SummaryScreen
            calculatorData={calculatorData}
            userData={userData}
            selectedCompany={selectedCompany}
            extraServices={extraServices}
            onConfirm={handleConfirmSummary}
            onEdit={handleBack}
            onUserDataUpdate={(updatedUserData) => {
              setUserData(updatedUserData);
            }}
            onCalculatorDataUpdate={(updatedCalculatorData) => {
              setCalculatorData(updatedCalculatorData);
            }}
            onOfficeSelect={(office) => {
              setSelectedOffice(office);
            }}
            overallProgress={overallProgress}
            onProgressUpdate={setOverallProgress}
          />
        )}

      {currentScreen === "thankyou" &&
        calculatorData &&
        userData &&
        selectedCompany && (
          <ThankYouScreen
            confirmationNumber={confirmationNumber}
            calculatorData={calculatorData}
            userData={userData}
            selectedCompany={selectedCompany}
            onReturnHome={handleReturnHome}
            onViewReceipt={handleViewReceipt}
          />
        )}

      {currentScreen === "receipt" &&
        calculatorData &&
        userData &&
        selectedCompany && (
          <PrintableReceipt
            confirmationNumber={confirmationNumber}
            calculatorData={calculatorData}
            userData={userData}
            selectedCompany={selectedCompany}
            onClose={handleCloseReceipt}
          />
        )}
    </div>
  );
}