import { CalculatorData } from "./CalculatorForm";
import { UserData } from "./DataCollection";
import { CompanyDetails } from "./CompanyDetailsModal";
import { CompanyLogo } from "./CompanyLogo";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import { ArrowLeft, Printer } from "lucide-react";

interface PrintableReceiptProps {
  confirmationNumber: string;
  calculatorData: CalculatorData;
  userData: UserData;
  selectedCompany: CompanyDetails;
  onClose: () => void;
}

export function PrintableReceipt({
  confirmationNumber,
  calculatorData,
  userData,
  selectedCompany,
  onClose,
}: PrintableReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getServiceLabel = (key: string): string => {
    const labels: Record<string, string> = {
      hamvasztas: "Hamvasztás",
      elszallitas: "Elszállítás",
      urna: "Urna",
      bucsuztatas: "Búcsúztatás",
      egyeb: "Egyéb szolgáltatások",
    };
    return labels[key] || key;
  };

  const ceremonyTypeLabels: Record<string, string> = {
    urnas: "Urnás búcsúztatás",
    koporsos: "Koporsós búcsúztatás",
    hajos: "Hajós búcsúztatás",
    szorasos: "Szórásos temetés",
  };

  const farewellTypeLabels: Record<string, string> = {
    polgari: "Polgári",
    katolikus: "Katolikus",
    reformatus: "Református",
    egyeb: "Egyéb",
    nem: "Nem szeretnék",
  };

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Print Controls - Hidden when printing */}
      <div className="mb-8 flex items-center justify-between print:hidden">
        <Button onClick={onClose} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Vissza
        </Button>
        <Button onClick={handlePrint} className="bg-primary">
          <Printer className="mr-2 h-4 w-4" />
          Nyomtatás
        </Button>
      </div>

      {/* Printable Content */}
      <div className="mx-auto max-w-4xl rounded-lg border bg-white p-12 shadow-sm">
        {/* Header */}
        <div className="mb-8 border-b pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2">Ajánlat összefoglaló</h1>
              <p className="text-muted-foreground">
                vizibucsuztatas.hu - Temetkezési kalkulátor
              </p>
            </div>
            <div className="text-right">
              <div className="mb-1 text-muted-foreground">Ajánlatszám:</div>
              <div className="text-primary">{confirmationNumber}</div>
              <div className="mt-2 text-muted-foreground">
                {format(new Date(), "yyyy. MMMM d.", { locale: hu })}
              </div>
            </div>
          </div>
        </div>

        {/* User Contact Information */}
        <div className="mb-8">
          <h3 className="mb-4 border-b pb-2">Kapcsolatfelvételi adatok</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1 text-muted-foreground">Név</div>
              <div>{userData.fullName}</div>
            </div>
            <div>
              <div className="mb-1 text-muted-foreground">Telefonszám</div>
              <div>{userData.phone}</div>
            </div>
            <div>
              <div className="mb-1 text-muted-foreground">E-mail cím</div>
              <div>{userData.email}</div>
            </div>
          </div>
        </div>

        {/* Calculator Data */}
        <div className="mb-8">
          <h3 className="mb-4 border-b pb-2">Megadott információk</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1 text-muted-foreground">Kórház / Halottasház</div>
              <div>{calculatorData.hospital}</div>
            </div>
            {calculatorData.transportDate && (
              <div>
                <div className="mb-1 text-muted-foreground">Elszállítás dátuma</div>
                <div>
                  {format(calculatorData.transportDate, "yyyy. MMMM d.", { locale: hu })}
                </div>
              </div>
            )}
            <div>
              <div className="mb-1 text-muted-foreground">Szertartás típusa</div>
              <div>{ceremonyTypeLabels[calculatorData.ceremonyType]}</div>
            </div>
            {calculatorData.boatCapacity && (
              <div>
                <div className="mb-1 text-muted-foreground">Létszám</div>
                <div>{calculatorData.boatCapacity} fő</div>
              </div>
            )}
            <div>
              <div className="mb-1 text-muted-foreground">Búcsúztatás típusa</div>
              <div>
                {farewellTypeLabels[calculatorData.farewellType]}
                {calculatorData.farewellType === "egyeb" && calculatorData.farewellTypeOther && (
                  <span> - {calculatorData.farewellTypeOther}</span>
                )}
              </div>
            </div>
            {calculatorData.hasBurialPlace && (
              <div>
                <div className="mb-1 text-muted-foreground">Sírhely</div>
                <div>
                  {calculatorData.hasBurialPlace === "igen"
                    ? "Van sírhelyem"
                    : "Vásárolni szeretnék"}
                </div>
              </div>
            )}
            {calculatorData.cemeteryLocation && (
              <div>
                <div className="mb-1 text-muted-foreground">Temető helyszíne</div>
                <div>{calculatorData.cemeteryLocation}</div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Company */}
        <div className="mb-8">
          <h3 className="mb-4 border-b pb-2">Kiválasztott szolgáltató</h3>
          <div className="flex items-start gap-6">
            <CompanyLogo name={selectedCompany.name} className="h-24 w-24" />
            <div className="flex-1">
              <h4 className="mb-2">{selectedCompany.name}</h4>
              <p className="mb-4 text-muted-foreground">
                {selectedCompany.description}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="mb-1 text-muted-foreground">Értékelés</div>
                  <div>
                    ⭐ {selectedCompany.rating} ({selectedCompany.reviewCount}{" "}
                    értékelés)
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-muted-foreground">
                    Legkorábbi időpont
                  </div>
                  <div>{selectedCompany.earliestCeremony} napon belül</div>
                </div>
                <div>
                  <div className="mb-1 text-muted-foreground">Telefon</div>
                  <div>{selectedCompany.contact.phone}</div>
                </div>
                <div>
                  <div className="mb-1 text-muted-foreground">E-mail</div>
                  <div>{selectedCompany.contact.email}</div>
                </div>
              </div>
              
              {selectedCompany.districts && selectedCompany.districts.length > 0 && (
                <div className="mt-4">
                  <div className="mb-1 text-muted-foreground">Kiszolgált kerületek</div>
                  <div>{selectedCompany.districts.join(", ")}</div>
                </div>
              )}
              
              {selectedCompany.offices && selectedCompany.offices.length > 0 && (
                <div className="mt-4">
                  <div className="mb-1 text-muted-foreground">Irodák</div>
                  <ul className="space-y-1">
                    {selectedCompany.offices.map((office, index) => (
                      <li key={index}>{office}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mb-8">
          <h3 className="mb-4 border-b pb-2">Részletes árbontás</h3>
          <div className="space-y-3">
            {Object.entries(selectedCompany.serviceBreakdown).map(
              ([key, value]) => (
                <div key={key} className="flex justify-between border-b py-2">
                  <span>{getServiceLabel(key)}</span>
                  <span>{formatCurrency(value as number)}</span>
                </div>
              )
            )}
            <div className="flex justify-between border-t-2 pt-3">
              <span>Teljes összeg</span>
              <span>{formatCurrency(selectedCompany.price)}</span>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        {selectedCompany.services && selectedCompany.services.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 border-b pb-2">További szolgáltatások</h3>
            <ul className="list-inside list-disc space-y-1">
              {selectedCompany.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 border-t pt-6 text-center text-muted-foreground">
          <p className="mb-2">
            Ez egy ajánlat, amely az Ön által megadott adatok alapján készült.
          </p>
          <p className="mb-2">
            A kiválasztott temetkezési szolgáltató munkatársa 1 órán belül
            felveszi Önnel a kapcsolatot.
          </p>
          <p className="mt-4">
            <strong>vizibucsuztatas.hu</strong> | info@vizibucsuztatas.hu |
            +36 1 234 5678
          </p>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
}
