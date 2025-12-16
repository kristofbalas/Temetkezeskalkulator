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
import imgTemetkezes1 from "figma:asset/1fb4c986ed719cdfd5b554052f6ccf8b832f7be9.png";
import imgTemetkezes2 from "figma:asset/5837b14e9549c3b49b98b1197e38e3b77cd5059f.png";
import imgTemetkezes3 from "figma:asset/334aa22c5dceeb59afb66a63b5408e2f910f6b08.png";
import imgTemetkezes4 from "figma:asset/842541a78e938db10896c0b214a78cce278d332a.png";
import imgTemetkezes5 from "figma:asset/6db100fb20bf218ee69ebc7f744b1132a01c6d91.png";

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
const companies: FuneralCompany[] = [
  {
    id: "1",
    name: "Alcsík Temetkezés",
    logo: imgTemetkezes1,
    image: imgTemetkezes1,
    price: 400000,
    rating: 4.8,
    reviewCount: 142,
    districts: ["I.", "II.", "XII."],
    earliestCeremony: 6,
    services: ["Nyugdíjfolyósító"],
  },
  {
    id: "2",
    name: "Glória Temetkezési Vállalkozás",
    logo: imgTemetkezes2,
    image: imgTemetkezes2,
    price: 450000,
    rating: 4.9,
    reviewCount: 89,
    districts: ["V.", "VI.", "VII."],
    earliestCeremony: 3,
    services: [],
  },
  {
    id: "3",
    name: "PRG Temetkezés",
    logo: imgTemetkezes3,
    image: imgTemetkezes3,
    price: 380000,
    rating: 4.7,
    reviewCount: 201,
    districts: ["III.", "IV.", "XIII."],
    earliestCeremony: 5,
    services: ["Trombitás biztosítása"],
  },
  {
    id: "4",
    name: "ÍRISZ",
    logo: imgTemetkezes4,
    image: imgTemetkezes4,
    price: 520000,
    rating: 4.9,
    reviewCount: 156,
    districts: ["VIII.", "IX.", "X."],
    earliestCeremony: 2,
    services: [],
  },
  {
    id: "5",
    name: "Schaffer és Wagner Temetkezési Kft.",
    logo: imgTemetkezes5,
    image: imgTemetkezes5,
    price: 410000,
    rating: 4.6,
    reviewCount: 94,
    districts: ["XI.", "XIV.", "XV."],
    earliestCeremony: 4,
    services: [],
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
    const fullCompany = companies.find((c) => c.id === company.id);
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
      const foundCompany = companies.find((c) => c.id === company.id);
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
            companies={companies}
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