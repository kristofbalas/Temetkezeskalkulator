import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Star, MapPin, Calendar, FileText, Phone, Filter, X } from "lucide-react";
import { Progress } from "./ui/progress";
import { CompanyLogo } from "./CompanyLogo";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
// Comparison feature temporarily hidden - do not delete
// import { ComparisonModal } from "./ComparisonModal";

export interface FuneralCompany {
  id: string;
  name: string;
  logo: string;
  image?: string;
  price: number;
  rating: number;
  reviewCount: number;
  districts: string[];
  earliestCeremony: number;
  services: string[];
}

interface ResultsListProps {
  companies: FuneralCompany[];
  onViewDetails: (company: FuneralCompany) => void;
  onCompare: (selectedCompanies: FuneralCompany[]) => void;
  onSelectCompany: (company: FuneralCompany) => void;
  onBack: () => void;
  overallProgress: number;
  onProgressUpdate: (progress: number) => void;
}

export function ResultsList({
  companies,
  onViewDetails,
  onCompare,
  onSelectCompany,
  onBack,
  overallProgress,
  onProgressUpdate,
}: ResultsListProps) {
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating" | "earliest-ceremony">("price-asc");
  // Comparison feature temporarily hidden - do not delete
  // const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterDistrict, setFilterDistrict] = useState<string>("all");
  
  // Calculate progress for results screen (60-75%)
  useEffect(() => {
    // Start at 60% (data collection complete)
    // Incrementally increase to 75% as user browses
    const timer = setTimeout(() => {
      if (overallProgress < 75) {
        onProgressUpdate(Math.min(overallProgress + 5, 75));
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [overallProgress, onProgressUpdate]);
  const [filterMaxDays, setFilterMaxDays] = useState<string>("all");
  const [filterMinRating, setFilterMinRating] = useState<string>("all");
  const [filterService, setFilterService] = useState<string>("all");

  // Get all unique values for filters
  const allDistricts = Array.from(
    new Set(companies.flatMap((c) => c.districts))
  ).sort();
  const allServices = Array.from(
    new Set(companies.flatMap((c) => c.services))
  ).sort();

  // Apply filters
  const filteredCompanies = companies.filter((company) => {
    if (filterDistrict !== "all" && !company.districts.includes(filterDistrict)) {
      return false;
    }
    if (filterMaxDays !== "all" && company.earliestCeremony > parseInt(filterMaxDays)) {
      return false;
    }
    if (filterMinRating !== "all" && company.rating < parseFloat(filterMinRating)) {
      return false;
    }
    if (filterService !== "all" && !company.services.includes(filterService)) {
      return false;
    }
    return true;
  });

  // Apply sorting
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "earliest-ceremony") {
      return a.earliestCeremony - b.earliestCeremony;
    }
    return b.rating - a.rating;
  });

  const hasActiveFilters = 
    filterDistrict !== "all" ||
    filterMaxDays !== "all" ||
    filterMinRating !== "all" ||
    filterService !== "all";

  const clearFilters = () => {
    setFilterDistrict("all");
    setFilterMaxDays("all");
    setFilterMinRating("all");
    setFilterService("all");
  };

  // Comparison feature temporarily hidden - do not delete
  // const toggleSelection = (id: string) => {
  //   if (selectedIds.includes(id)) {
  //     setSelectedIds(selectedIds.filter((sid) => sid !== id));
  //   } else {
  //     if (selectedIds.length < 3) {
  //       setSelectedIds([...selectedIds, id]);
  //     }
  //   }
  // };

  // const [comparisonModalOpen, setComparisonModalOpen] = useState(false);

  // const handleCompare = () => {
  //   const selected = companies.filter((c) => selectedIds.includes(c.id));
  //   if (selected.length > 0) {
  //     setComparisonModalOpen(true);
  //   }
  // };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-[1200px] px-6 py-4">
          <Progress value={overallProgress} className="h-2" />
          <p className="mt-2 text-center text-muted-foreground">
            {Math.round(overallProgress)}% kitöltve
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="mb-8">
          <h1 className="mb-2">Temetkezési ajánlatok</h1>
          <p className="text-muted-foreground">
            {sortedCompanies.length} ajánlat{" "}
            {sortedCompanies.length !== companies.length && 
              `(${companies.length} közül szűrve)`}
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Rendezés:</span>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                  <SelectTrigger className="w-52">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="item">
                    <SelectItem value="price-asc">Ár szerint (növekvő)</SelectItem>
                    <SelectItem value="price-desc">Ár szerint (csökkenő)</SelectItem>
                    <SelectItem value="rating">Értékelés szerint</SelectItem>
                    <SelectItem value="earliest-ceremony">Legkorábbi búcsúztatás szerint</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <button className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border bg-input-background px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    <Filter className="h-4 w-4" />
                    Szűrők
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground">
                        Aktív
                      </Badge>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent className="p-6">
                  <SheetHeader>
                    <SheetTitle>Szűrési beállítások</SheetTitle>
                    <SheetDescription>
                      Szűrje le az ajánlatokat az igényei szerint
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* District Filter */}
                    <div className="space-y-2">
                      <Label>Kerület</Label>
                      <Select value={filterDistrict} onValueChange={setFilterDistrict}>
                        <SelectTrigger>
                          <SelectValue placeholder="Összes kerület" />
                        </SelectTrigger>
                        <SelectContent position="item">
                          <SelectItem value="all">Összes kerület</SelectItem>
                          {allDistricts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Days Filter */}
                    <div className="space-y-2">
                      <Label>Legkorábbi búcsúztatás</Label>
                      <Select value={filterMaxDays} onValueChange={setFilterMaxDays}>
                        <SelectTrigger>
                          <SelectValue placeholder="Bármikor" />
                        </SelectTrigger>
                        <SelectContent position="item">
                          <SelectItem value="all">Bármikor</SelectItem>
                          <SelectItem value="2">2 napon belül</SelectItem>
                          <SelectItem value="3">3 napon belül</SelectItem>
                          <SelectItem value="5">5 napon belül</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-2">
                      <Label>Minimális értékelés</Label>
                      <Select value={filterMinRating} onValueChange={setFilterMinRating}>
                        <SelectTrigger>
                          <SelectValue placeholder="Bármilyen" />
                        </SelectTrigger>
                        <SelectContent position="item">
                          <SelectItem value="all">Bármilyen</SelectItem>
                          <SelectItem value="4.5">4.5+ csillag</SelectItem>
                          <SelectItem value="4.7">4.7+ csillag</SelectItem>
                          <SelectItem value="4.9">4.9+ csillag</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Service Filter */}
                    <div className="space-y-2">
                      <Label>Szolgáltatás</Label>
                      <Select value={filterService} onValueChange={setFilterService}>
                        <SelectTrigger>
                          <SelectValue placeholder="Összes szolgáltatás" />
                        </SelectTrigger>
                        <SelectContent position="item">
                          <SelectItem value="all">Összes szolgáltatás</SelectItem>
                          {allServices.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="w-full gap-2"
                      >
                        <X className="h-4 w-4" />
                        Szűrők törlése
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Comparison feature temporarily hidden - do not delete */}
            {/* <Button
              onClick={handleCompare}
              variant="outline"
              className={
                selectedIds.length > 0
                  ? "border-primary text-primary"
                  : "opacity-50"
              }
              disabled={selectedIds.length === 0}
            >
              {selectedIds.length > 0
                ? `${selectedIds.length} ajánlat összehasonlítása`
                : "Összehasonlítás (válasszon ajánlatokat)"}
            </Button> */}
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              <span className="text-muted-foreground">Aktív szűrők:</span>
              {filterDistrict !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Kerület: {filterDistrict}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFilterDistrict("all")}
                  />
                </Badge>
              )}
              {filterMaxDays !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Max {filterMaxDays} nap
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFilterMaxDays("all")}
                  />
                </Badge>
              )}
              {filterMinRating !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Min {filterMinRating}⭐
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFilterMinRating("all")}
                  />
                </Badge>
              )}
              {filterService !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {filterService}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFilterService("all")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Cards */}
        <div className="space-y-6">
          {sortedCompanies.map((company) => (
            <Card
              key={company.id}
              className="overflow-hidden transition-shadow hover:shadow-md"
            >
              <CardHeader className="bg-secondary/30 pb-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  {/* Left side: Image and Company Info */}
                  <div className="flex items-start gap-4">
                    {/* Company Image - Large */}
                    {company.image && (
                      <div className="overflow-hidden rounded-lg shadow-md flex-shrink-0 bg-white">
                        <ImageWithFallback
                          src={company.image}
                          alt={`${company.name} szolgáltatás`}
                          className="h-32 w-40 object-contain"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="text-[24px]">{company.name}</h3>
                      
                    </div>
                  </div>

                  {/* Right side: Price */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-[rgb(4,4,4)]">Becsült ár</div>
                    <div className="text-primary text-[24px]">
                      {company.price.toLocaleString("hu-HU")} Ft
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {/* Districts */}
                  <div className="flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-primary">
                        Kiszolgált kerületek
                      </div>
                      <div className="mt-1">
                        {company.districts.join(", ")}
                      </div>
                    </div>
                  </div>

                  {/* Earliest Ceremony */}
                  <div className="flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-primary">
                        Legkorábbi búcsúztatás
                      </div>
                      <div className="mt-1">
                        {company.earliestCeremony} napon belül
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-primary">
                        Extra szolgáltatások
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {company.services.map((service) => (
                          <Badge
                            key={service}
                            variant="secondary"
                            className="bg-accent/50"
                          >
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t bg-secondary/10">
                <div className="flex w-full flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => onViewDetails(company)} className="bg-[rgb(255,255,255)]"
                    >
                      Részletek megtekintése
                    </Button>
                    {/* Comparison feature temporarily hidden - do not delete */}
                    {/* <Button
                      variant={
                        selectedIds.includes(company.id) ? "default" : "outline"
                      }
                      onClick={() => toggleSelection(company.id)}
                      disabled={
                        !selectedIds.includes(company.id) &&
                        selectedIds.length >= 3
                      }
                      className={
                        selectedIds.includes(company.id)
                          ? "bg-accent text-accent-foreground hover:bg-accent/90"
                          : ""
                      }
                    >
                      <div className="mr-2 flex h-4 w-4 items-center justify-center rounded border border-current">
                        {selectedIds.includes(company.id) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      Összehasonlítom
                    </Button> */}
                  </div>
                  <Button
                    className="bg-button hover:bg-[#31587A] text-button-foreground hover:text-white shadow-md hover:shadow-lg transition-all"
                    onClick={() => onSelectCompany(company)}
                  >
                    Ezt választom
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Vissza
          </Button>
        </div>
      </div>

      {/* Comparison feature temporarily hidden - do not delete */}
      {/* <ComparisonModal
        companies={companies.filter((c) => selectedIds.includes(c.id))}
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        onSelectCompany={(company) => {
          setComparisonModalOpen(false);
          onSelectCompany(company);
        }}
      /> */}
    </div>
  );
}