import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, Home, FileText, Download } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CalculatorData } from "./CalculatorForm";
import { UserData } from "./DataCollection";
import { CompanyDetails } from "./CompanyDetailsModal";

interface ThankYouScreenProps {
  confirmationNumber: string;
  calculatorData: CalculatorData;
  userData: UserData;
  selectedCompany: CompanyDetails;
  onReturnHome: () => void;
  onViewReceipt: () => void;
}

export function ThankYouScreen({
  confirmationNumber,
  calculatorData,
  userData,
  selectedCompany,
  onReturnHome,
  onViewReceipt,
}: ThankYouScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[800px] px-6 py-16">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>

          <h1 className="mb-4 font-bold text-[32px]">Köszönjük, ajánlatkérését sikeresen elküldtük!</h1>

          {/* Hero Image */}
          <div className="relative mb-8 h-48 w-full max-w-md overflow-hidden rounded-2xl shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758334587590-011cf260c10f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGZsb3dlciUyMGFycmFuZ2VtZW50JTIwbWVtb3JpYWx8ZW58MXx8fHwxNzYyNzgzMjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Temetkezési virágdekoráció"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>

          <div className="mb-8 space-y-4 text-muted-foreground">
            <p>
              <strong>1 órán belül</strong> felvesszük Önnel a kapcsolatot.
            </p>
            <p>
              Az ajánlat részleteit e-mailben is elküldtük az Ön által megadott
              címre.
            </p>
            <p>
              Az űrlap beküldése megkönnyíti és lerövidíti a személyes ügyintézést.
            </p>
            <p>
              A kalkuláció beküldése nem jár semmilyen kötelezettséggel, a fizetés kizárólag az irodában történik.
            </p>
          </div>

          {/* Confirmation Card */}
          <Card className="mb-8 w-full max-w-md border-primary/20 bg-secondary/30">
            <CardContent className="pt-6 bg-[rgb(255,255,255)]">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-bold">Ajánlatszám:</span>
              </div>
              <div className="mt-2 text-center text-primary font-bold text-[24px]">
                {confirmationNumber}
              </div>
              <p className="mt-4 text-center text-muted-foreground">
                Kérjük, jegyezze fel ezt a számot a későbbi kapcsolatfelvételhez.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onViewReceipt}
              size="lg"
              variant="outline"
              className="min-w-64 border-primary text-primary hover:bg-primary/10 bg-[rgb(255,255,255)]"
            >
              <Download className="mr-2 h-5 w-5" />
              Részletes összefoglaló
            </Button>
            <Button
              onClick={onReturnHome}
              size="lg"
              className="min-w-64 bg-button hover:bg-[#31587A] text-button-foreground hover:text-white"
            >
              <Home className="mr-2 h-5 w-5" />
              Vissza a kezdőlapra
            </Button>
          </div>

          {/* Support Info */}
          
        </div>
      </div>
    </div>
  );
}