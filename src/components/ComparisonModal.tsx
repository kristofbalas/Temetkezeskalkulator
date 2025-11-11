import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, MapPin, Calendar, Check, X } from "lucide-react";
import { FuneralCompany } from "./ResultsList";
import { CompanyLogo } from "./CompanyLogo";

interface ComparisonModalProps {
  companies: FuneralCompany[];
  isOpen: boolean;
  onClose: () => void;
  onSelectCompany: (company: FuneralCompany) => void;
}

export function ComparisonModal({
  companies,
  isOpen,
  onClose,
}: ComparisonModalProps) {
  if (companies.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-[1290px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajánlatok összehasonlítása</DialogTitle>
          <DialogDescription>
            Hasonlítsa össze a kiválasztott temetkezési szolgáltatók ajánlatait egymással
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Tulajdonság</th>
                {companies.map((company) => (
                  <th key={company.id} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <CompanyLogo name={company.name} className="h-16 w-16" />
                      <span className="text-center">
                        {company.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price */}
              <tr className="border-b bg-secondary/20">
                <td className="p-4">Becsült ár</td>
                {companies.map((company) => (
                  <td key={company.id} className="p-4 text-center text-primary">
                    {company.price.toLocaleString("hu-HU")} Ft
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr className="border-b">
                <td className="p-4">Értékelés</td>
                {companies.map((company) => (
                  <td key={company.id} className="p-4">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>
                        {company.rating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground">
                        ({company.reviewCount})
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Earliest Ceremony */}
              <tr className="border-b bg-secondary/20">
                <td className="p-4">Legkorábbi búcsúztatás</td>
                {companies.map((company) => (
                  <td key={company.id} className="p-4 text-center">
                    {company.earliestCeremony} napon belül
                  </td>
                ))}
              </tr>

              {/* Districts */}
              <tr className="border-b">
                <td className="p-4">Elérhető kerületek</td>
                {companies.map((company) => (
                  <td key={company.id} className="p-4">
                    <div className="flex flex-wrap justify-center gap-1">
                      {company.districts.map((district) => (
                        <Badge key={district} variant="secondary" className="text-xs">
                          {district}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Services */}
              {[
                "Anyakönyveztetés",
                "Nyugdíjfolyósító",
                "Virágdekoráció",
                "Zenés búcsúztatás",
                "Sírkő készítés",
              ].map((service) => (
                <tr key={service} className="border-b">
                  <td className="p-4">{service}</td>
                  {companies.map((company) => (
                    <td key={company.id} className="p-4 text-center">
                      {company.services.includes(service) ? (
                        <Check className="mx-auto h-5 w-5 text-primary" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-muted-foreground/30" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 border-t pt-6">
          <div className="mb-4 text-center text-muted-foreground">
            Válasszon egy temetkezési szolgáltatót a folytatáshoz
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {companies.map((company) => (
              <div key={company.id} className="rounded-lg border border-border bg-secondary/20 p-4">
                <div className="mb-2 text-center">{company.name}</div>
                <Button 
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white shadow-md hover:shadow-lg transition-all"
                  onClick={() => {
                    onSelectCompany(company);
                    onClose();
                  }}
                >
                  Ezt választom
                </Button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Bezárás
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}