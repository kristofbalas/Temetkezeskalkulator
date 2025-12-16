import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Progress } from "./ui/progress";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { format } from "date-fns";
import { hu } from "date-fns/locale";

export interface CalculatorData {
  hospital: string;
  transportDate: Date | undefined;
  ceremonyType: string;
  boatCapacity?: string;
  hasBurialPlace: string;
  farewellType: string;
  farewellTypeOther?: string;
  cemeteryLocation: string;
}

interface CalculatorFormProps {
  onComplete: (data: CalculatorData) => void;
  onBack: () => void;
  initialData?: CalculatorData;
  overallProgress: number;
  onProgressUpdate: (progress: number) => void;
}

export function CalculatorForm({ onComplete, onBack, initialData, overallProgress, onProgressUpdate }: CalculatorFormProps) {
  const [formData, setFormData] = useState<CalculatorData>(
    initialData || {
      hospital: "",
      transportDate: undefined,
      ceremonyType: "",
      boatCapacity: undefined,
      hasBurialPlace: "",
      farewellType: "",
      farewellTypeOther: "",
      cemeteryLocation: "",
    }
  );

  // Calculate progress based on filled fields (0-40% of overall progress)
  useEffect(() => {
    const fields = [
      formData.hospital,
      formData.ceremonyType,
      formData.hasBurialPlace,
      formData.farewellType,
      formData.cemeteryLocation,
    ];

    // Adjust for conditional fields
    let totalFields = 5;
    
    // Add boat capacity field if hajos is selected
    if (formData.ceremonyType === "hajos") {
      totalFields = 4; // hospital, ceremonyType, boatCapacity, farewellType
    } else if (formData.ceremonyType === "szorasos") {
      totalFields = 4; // hospital, ceremonyType, farewellType, cemeteryLocation (skip burial place)
    } else if (formData.ceremonyType === "nem") {
      totalFields = 3; // hospital, ceremonyType, farewellType (no burial place or cemetery)
    }

    const filledFields = fields.filter((field) => {
      if (field instanceof Date) return true;
      return field !== "";
    }).length + (formData.ceremonyType === "hajos" && formData.boatCapacity ? 1 : 0);

    // Calculator form represents 0-30% of overall progress
    const localProgress = (filledFields / totalFields) * 30;
    onProgressUpdate(localProgress);
  }, [formData, onProgressUpdate]);

  const isFormValid = () => {
    if (
      !formData.hospital ||
      !formData.ceremonyType ||
      !formData.farewellType
    ) {
      return false;
    }

    // If "Egyéb" is selected, require custom text
    if (formData.farewellType === "egyeb" && !formData.farewellTypeOther?.trim()) {
      return false;
    }

    // Boat capacity is required for hajos
    if (formData.ceremonyType === "hajos" && !formData.boatCapacity) {
      return false;
    }

    // hasBurialPlace is required for urnas and koporsos (not for hajos, szorasos, or nem)
    if (formData.ceremonyType !== "hajos" && 
        formData.ceremonyType !== "szorasos" && 
        formData.ceremonyType !== "nem") {
      if (!formData.hasBurialPlace) return false;
    }

    // cemeteryLocation is required for urnas, koporsos, and szorasos (not for hajos or nem)
    if (formData.ceremonyType !== "hajos" && formData.ceremonyType !== "nem") {
      if (!formData.cemeteryLocation) return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-[1200px] px-6 py-4">
          <Progress value={overallProgress} className="h-2" />
          <p className="mt-2 text-center text-muted-foreground">
            {Math.round(overallProgress)}% kitöltve
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="mb-8">
          <h1 className="mb-2">Személyre szabott kalkuláció</h1>
          <p className="text-muted-foreground">
            Kérjük, válaszoljon az alábbi kérdésekre, hogy pontos ajánlatokat
            kaphasson.
          </p>
        </div>

        <div className="space-y-8 rounded-2xl bg-white p-8 shadow-sm">
          {/* Question 1: Hospital */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label>Az elhunyt melyik kórházban, halottasházban tartózkodik?</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>A pontos helyszín megadása segít az elszállítás kalkulációjában</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              value={formData.hospital}
              onValueChange={(value) =>
                setFormData({ ...formData, hospital: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Válasszon kórházat vagy halottasházat" />
              </SelectTrigger>
              <SelectContent position="item">
                <SelectItem value="semmelweis">Semmelweis Egyetem</SelectItem>
                <SelectItem value="szent-janos">Szent János Kórház</SelectItem>
                <SelectItem value="uzsoki">Uzsoki Kórház</SelectItem>
                <SelectItem value="szent-imre">Szent Imre Kórház</SelectItem>
                <SelectItem value="honved">Honvéd Kórház</SelectItem>
                <SelectItem value="heim-pal">Heim Pál Gyermekkórház</SelectItem>
                <SelectItem value="halottashaz-1">I. kerületi Halottasház</SelectItem>
                <SelectItem value="halottashaz-10">X. kerületi Halottasház</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Question 2: Ceremony Type */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label>Milyen búcsúztatás típusát szeretné?</Label>
            </div>
            <RadioGroup
              value={formData.ceremonyType}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  ceremonyType: value,
                  // Reset conditional fields
                  boatCapacity: value === "hajos" ? formData.boatCapacity : undefined,
                  hasBurialPlace: value === "hajos" || value === "szorasos" || value === "nem" ? "" : formData.hasBurialPlace,
                  cemeteryLocation: value === "hajos" || value === "nem" ? "" : formData.cemeteryLocation,
                })
              }
            >
              <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="szorasos" id="szorasos" />
                <Label htmlFor="szorasos" className="flex-1 cursor-pointer">
                  Szórásos (Temetői vízsugaras búcsúztatás)
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="urnas" id="urnas" />
                <Label htmlFor="urnas" className="flex-1 cursor-pointer">
                  Urnás búcsúztatás
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="koporsos" id="koporsos" />
                <Label htmlFor="koporsos" className="flex-1 cursor-pointer">
                  Koporsós búcsúztatás
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="hajos" id="hajos" />
                <Label htmlFor="hajos" className="flex-1 cursor-pointer">
                  Hajós búcsúztatás
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="nem" id="nem" />
                <Label htmlFor="nem" className="flex-1 cursor-pointer">
                  Haza szeretném vinni
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Question 2b: Boat Capacity - Conditional for Hajós */}
          {formData.ceremonyType === "hajos" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label>Mekkora létszámmal számolnak?</Label>
              </div>
              <RadioGroup
                value={formData.boatCapacity}
                onValueChange={(value) =>
                  setFormData({ ...formData, boatCapacity: value })
                }
              >
                <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="0-35" id="capacity-35" />
                  <Label htmlFor="capacity-35" className="flex-1 cursor-pointer">
                    0-35 fő
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="35-65" id="capacity-65" />
                  <Label htmlFor="capacity-65" className="flex-1 cursor-pointer">
                    35-65 fő
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="65-130" id="capacity-130" />
                  <Label htmlFor="capacity-130" className="flex-1 cursor-pointer">
                    65-130 fő
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="130+" id="capacity-130plus" />
                  <Label htmlFor="capacity-130plus" className="flex-1 cursor-pointer">
                    130 fő fölött
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Question 4: Has Burial Place - Conditional */}
          {formData.ceremonyType &&
            formData.ceremonyType !== "hajos" &&
            formData.ceremonyType !== "szorasos" &&
            formData.ceremonyType !== "nem" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label>Rendelkezik sírhellyel?</Label>
                </div>
                <RadioGroup
                  value={formData.hasBurialPlace}
                  onValueChange={(value) =>
                    setFormData({ ...formData, hasBurialPlace: value })
                  }
                >
                  <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="igen" id="burial-yes" />
                    <Label htmlFor="burial-yes" className="flex-1 cursor-pointer">
                      Igen, van sírhelyem
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="nem" id="burial-no" />
                    <Label htmlFor="burial-no" className="flex-1 cursor-pointer">
                      Nem, vásárolni szeretnék
                    </Label>
                  </div>
                  {formData.ceremonyType === "urnas" && (
                    <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="urnafal" id="burial-urnafal" />
                      <Label htmlFor="burial-urnafal" className="flex-1 cursor-pointer">
                        Urnafalban szeretnék nyughelyet vásárolni
                      </Label>
                    </div>
                  )}
                </RadioGroup>
              </div>
            )}

          {/* Question 5: Farewell Type */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label>Milyen búcsúztatási típust szeretne?</Label>
            </div>
            <RadioGroup
              value={formData.farewellType}
              onValueChange={(value) =>
                setFormData({ ...formData, farewellType: value })
              }
            >
              <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="polgari" id="farewell-polgari" />
                <Label htmlFor="farewell-polgari" className="flex-1 cursor-pointer">
                  Polgári
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="katolikus" id="farewell-katolikus" />
                <Label htmlFor="farewell-katolikus" className="flex-1 cursor-pointer">
                  Katolikus
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="reformatus" id="farewell-reformatus" />
                <Label htmlFor="farewell-reformatus" className="flex-1 cursor-pointer">
                  Református
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="nem" id="farewell-nem" />
                <Label htmlFor="farewell-nem" className="flex-1 cursor-pointer">
                  Nem szeretnék
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="egyeb" id="farewell-egyeb" />
                <Label htmlFor="farewell-egyeb" className="flex-1 cursor-pointer">
                  Egyéb
                </Label>
              </div>
            </RadioGroup>
            
            {/* Custom text field for "Egyéb" option */}
            {formData.farewellType === "egyeb" && (
              <div className="mt-3 pl-7">
                <Input
                  type="text"
                  placeholder="Kérem írja be milyen búcsúztatást szeretne..."
                  value={formData.farewellTypeOther || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, farewellTypeOther: e.target.value })
                  }
                  className="border-primary/50 focus:border-primary"
                />
              </div>
            )}
          </div>

          {/* Question 6: Cemetery Location - Conditional */}
          {formData.ceremonyType && formData.ceremonyType !== "hajos" && formData.ceremonyType !== "nem" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label>Melyik temetőben szeretné?</Label>
              </div>
              <Select
                value={formData.cemeteryLocation}
                onValueChange={(value) =>
                  setFormData({ ...formData, cemeteryLocation: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Válasszon temetőt" />
                </SelectTrigger>
                <SelectContent position="item">
                  <SelectItem value="farkasreti">Farkasréti temető</SelectItem>
                  <SelectItem value="kerepesi">Kerepesi temető</SelectItem>
                  <SelectItem value="koztemeto">Rákoskeresztúri köztemető</SelectItem>
                  <SelectItem value="ujkoztemetö">Új köztemető</SelectItem>
                  <SelectItem value="obuda">Óbudai temető</SelectItem>
                  <SelectItem value="pestszentlorinc">Pestszentlőrinci temető</SelectItem>
                  <SelectItem value="budafok">Budafoki temető</SelectItem>
                  <SelectItem value="cinkota">Cinkotai temető</SelectItem>
                  <SelectItem value="nemtudom">Nem tudom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Vissza
          </Button>
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className="bg-button hover:bg-[#31587A] text-button-foreground hover:text-white"
          >
            Tovább az adatbekéréshez
          </Button>
        </div>
      </div>
    </div>
  );
}