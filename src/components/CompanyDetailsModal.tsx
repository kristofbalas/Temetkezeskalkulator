import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Star, MapPin, Phone, Mail, Info } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ServiceBreakdown {
  hamvasztas: number;
  elszallitas: number;
  urna: number;
  bucsuztatas: number;
  egyeb: number;
}

export interface CompanyDetails {
  id: string;
  name: string;
  logo: string;
  image?: string;
  price: number;
  rating: number;
  reviewCount: number;
  districts: string[];
  description: string;
  serviceBreakdown: ServiceBreakdown;
  offices: string[];
  contact: {
    phone: string;
    email: string;
  };
}

export interface ExtraServices {
  trumpeter: boolean;
  pensionProcessor: boolean;
}

interface CompanyDetailsModalProps {
  company: CompanyDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (company: CompanyDetails, extras: ExtraServices) => void;
  ceremonyType?: string;
  farewellType?: string;
  hasBurialPlace?: string;
}

export function CompanyDetailsModal({
  company,
  isOpen,
  onClose,
  onSelect,
  ceremonyType,
  farewellType,
  hasBurialPlace,
}: CompanyDetailsModalProps) {
  const [addTrumpeter, setAddTrumpeter] = useState(false);
  const [addPensionProcessor, setAddPensionProcessor] = useState(false);

  if (!company) return null;

  // Check if ceremony type is urnas
  const isUrnasCeremony = ceremonyType === "urnas" || ceremonyType === "szorasos";
  const isKoporsosCeremony = ceremonyType === "koporsos";
  
  // Check if farewell was requested (not "nem" and farewellType is set)
  const hasFarewell = farewellType && farewellType !== "" && ceremonyType !== "nem";

  // Calculate total price with extras
  const trumpeterPrice = 35000;
  const pensionProcessorPrice = 50000;
  const extrasPrice = (addTrumpeter ? trumpeterPrice : 0) + (addPensionProcessor ? pensionProcessorPrice : 0);
  const totalPrice = company.price + extrasPrice;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {/* Company Image */}
            {company.image && (
              <div className="overflow-hidden rounded-lg shadow-md flex-shrink-0">
                <ImageWithFallback
                  src={company.image}
                  alt={`${company.name} szolgáltatás`}
                  className="h-24 w-32 object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <DialogTitle>{company.name}</DialogTitle>
            </div>
          </div>
          <DialogDescription className="sr-only">
            Részletes árajánlat és szolgáltatás információk
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Price Breakdown */}
          <div>
            <h4 className="mb-3 font-bold">Ár részletezése</h4>
            <div className="space-y-3 rounded-lg bg-secondary/20 p-4">
              <div className="flex justify-between">
                <span>Elszállítás, egészségügyi csomag, hamvasztás</span>
                <span className="font-semibold">
                  {company.serviceBreakdown.hamvasztas.toLocaleString("hu-HU")}{" "}
                  Ft
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Hűtési, tárolási költség</span>
                <span className="font-semibold">
                  {company.serviceBreakdown.elszallitas.toLocaleString("hu-HU")}{" "}
                  Ft
                </span>
              </div>
              <Separator />
              
              {/* Urna - Only show if urnas ceremony was selected */}
              {isUrnasCeremony && (
                <>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>Urna ára</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>A végleges árat az Ön által kiválasztott urna befolyásolja.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-semibold">30.000 Ft-tól</span>
                  </div>
                  <Separator />
                </>
              )}
              
              {/* Koporsó - Only show if koporsos ceremony was selected */}
              {isKoporsosCeremony && (
                <>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>Koporsó ára</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>A végleges árat az Ön által kiválasztott koporsó befolyásolja.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-semibold">150.000 Ft-tól</span>
                  </div>
                  <Separator />
                </>
              )}
              
              {/* Búcsúztatás - Only show if farewell was requested */}
              {hasFarewell && (
                <>
                  <div className="flex justify-between">
                    <span>Búcsúztatás</span>
                    <span>0 Ft</span>
                  </div>
                  <Separator />
                </>
              )}
              
              <div className="flex justify-between">
                <span>Szónok</span>
                <span className="font-semibold">
                  {company.serviceBreakdown.egyeb.toLocaleString("hu-HU")} Ft
                </span>
              </div>
              
              {/* Sírhely/Urnafal - Show if burial place was selected */}
              {hasBurialPlace === "urnafal" && (
                <>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Urna fal</span>
                    <span className="font-semibold">80.000 Ft</span>
                  </div>
                </>
              )}
              
              {hasBurialPlace === "sirhely" && (
                <>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Sírhely</span>
                    <span className="font-semibold">120.000 Ft</span>
                  </div>
                </>
              )}
              
              {/* Extra Services */}
              <Separator className="bg-border" />
              <div className="space-y-3 pt-2">
                <h5 className="text-sm font-medium">Plusz szolgáltatások</h5>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="trumpeter"
                      checked={addTrumpeter}
                      onCheckedChange={(checked) => setAddTrumpeter(checked as boolean)}
                    />
                    <label htmlFor="trumpeter" className="cursor-pointer text-sm">
                      Trombitás
                    </label>
                  </div>
                  <span className="text-sm">
                    {addTrumpeter ? `+${trumpeterPrice.toLocaleString("hu-HU")} Ft` : `${trumpeterPrice.toLocaleString("hu-HU")} Ft`}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="pensionProcessor"
                      checked={addPensionProcessor}
                      onCheckedChange={(checked) => setAddPensionProcessor(checked as boolean)}
                    />
                    <label htmlFor="pensionProcessor" className="cursor-pointer text-sm">
                      Pénzügyi folyamatok kezelése
                    </label>
                  </div>
                  <span className="text-sm">
                    {addPensionProcessor ? `+${pensionProcessorPrice.toLocaleString("hu-HU")} Ft` : `${pensionProcessorPrice.toLocaleString("hu-HU")} Ft`}
                  </span>
                </div>
              </div>
              
              <Separator className="bg-primary" />
              <div className="flex justify-between text-primary">
                <span className="font-semibold">Összesen</span>
                <span className="font-semibold">
                  {totalPrice.toLocaleString("hu-HU")} Ft
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="mb-3">A szolgáltatásról</h4>
            <p className="text-muted-foreground">{company.description}</p>
          </div>

          {/* Locations */}
          <div>
            <h4 className="mb-3">Elérhetőségek</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="mb-1">Kiszolgált kerületek</div>
                  <div className="flex flex-wrap gap-1">
                    {company.districts.map((district) => (
                      <Badge key={district} variant="secondary">
                        {district}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="mb-1">Irodák</div>
                  <ul className="list-inside list-disc text-muted-foreground">
                    {company.offices.map((office, idx) => (
                      <li key={idx}>{office}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  {company.contact.phone}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  {company.contact.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="bg-[rgb(255,255,255)]">
            Bezárás
          </Button>
          <Button
            onClick={() => onSelect(company, { trumpeter: addTrumpeter, pensionProcessor: addPensionProcessor })}
            className="bg-button hover:bg-[#31587A] text-button-foreground hover:text-white shadow-md hover:shadow-lg transition-all"
          >
            Ezt választom
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}