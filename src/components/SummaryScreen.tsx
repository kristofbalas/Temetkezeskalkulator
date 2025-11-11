import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  CheckCircle2,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Edit,
  Save,
  X,
} from "lucide-react";
import { CalculatorData } from "./CalculatorForm";
import { UserData } from "./DataCollection";
import { CompanyDetails, ExtraServices } from "./CompanyDetailsModal";
import { CompanyLogo } from "./CompanyLogo";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";
import { format } from "date-fns";
import { hu } from "date-fns/locale";

interface SummaryScreenProps {
  calculatorData: CalculatorData;
  userData: UserData;
  selectedCompany: CompanyDetails;
  extraServices: ExtraServices;
  onConfirm: () => void;
  onEdit: () => void;
  onUserDataUpdate: (userData: UserData) => void;
  onCalculatorDataUpdate: (calculatorData: CalculatorData) => void;
  onOfficeSelect: (office: string) => void;
  overallProgress: number;
  onProgressUpdate: (progress: number) => void;
}

export function SummaryScreen({
  calculatorData,
  userData,
  selectedCompany,
  extraServices,
  onConfirm,
  onEdit,
  onUserDataUpdate,
  onCalculatorDataUpdate,
  onOfficeSelect,
  overallProgress,
  onProgressUpdate,
}: SummaryScreenProps) {
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editedUserData, setEditedUserData] = useState<UserData>(userData);
  const [isEditingCalculator, setIsEditingCalculator] = useState(false);
  const [editedCalculatorData, setEditedCalculatorData] = useState<CalculatorData>(calculatorData);
  const [selectedOffice, setSelectedOffice] = useState<string>("");

  // Set progress to 75-95% for summary screen
  useEffect(() => {
    if (overallProgress < 75) {
      onProgressUpdate(75);
    }
  }, [overallProgress, onProgressUpdate]);

  const ceremonyTypeLabels: Record<string, string> = {
    urnas: "Urnás búcsúztatás",
    koporsos: "Koporsós búcsúztatás",
    hajos: "Hajós búcsúztatás",
    szorasos: "Szórásos temetés",
    nem: "Nem szeretnék szertartást",
  };

  const farewellTypeLabels: Record<string, string> = {
    polgari: "Polgári",
    katolikus: "Katolikus",
    reformatus: "Református",
    egyeb: "Egyéb",
    nem: "Nem szeretnék",
  };

  const cemeteryLocationLabels: Record<string, string> = {
    farkasreti: "Farkasréti temető",
    kerepesi: "Kerepesi temető",
    koztemeto: "Rákoskeresztúri köztemető",
    ujkoztemetö: "Új köztemető",
    duna: "Duna",
    balaton: "Balaton",
  };

  const handleSaveContact = () => {
    if (
      !editedUserData.fullName.trim() ||
      !editedUserData.phone.trim() ||
      !editedUserData.email.trim() ||
      !editedUserData.email.includes("@") ||
      !editedUserData.deceasedName.trim() ||
      !editedUserData.deceasedBirthPlace.trim() ||
      !editedUserData.deceasedBirthDate.trim()
    ) {
      toast.error("Kérjük, töltse ki az összes mezőt megfelelően");
      return;
    }

    onUserDataUpdate(editedUserData);
    setIsEditingContact(false);
    toast.success("Adatok frissítve");
  };

  const handleCancelEdit = () => {
    setEditedUserData(userData);
    setIsEditingContact(false);
  };

  const handleSaveCalculator = () => {
    if (
      !editedCalculatorData.hospital ||
      !editedCalculatorData.transportDate ||
      !editedCalculatorData.ceremonyType ||
      !editedCalculatorData.farewellType
    ) {
      toast.error("Kérjük, töltse ki az összes kötelező mezőt");
      return;
    }

    // If "Egyéb" is selected, require custom text
    if (editedCalculatorData.farewellType === "egyeb" && !editedCalculatorData.farewellTypeOther?.trim()) {
      toast.error("Kérjük, írja be az egyéb búcsúztatás típusát");
      return;
    }

    // Validate conditional fields
    if (
      editedCalculatorData.ceremonyType !== "hajos" &&
      editedCalculatorData.ceremonyType !== "szorasos"
    ) {
      if (!editedCalculatorData.hasBurialPlace) {
        toast.error("Kérjük, válassza ki a sírhely opciót");
        return;
      }
    }

    if (editedCalculatorData.ceremonyType !== "hajos") {
      if (!editedCalculatorData.cemeteryLocation) {
        toast.error("Kérjük, válassza ki a temető helyszínét");
        return;
      }
    }

    onCalculatorDataUpdate(editedCalculatorData);
    setIsEditingCalculator(false);
    toast.success("Kalkulátor adatok frissítve");
  };

  const handleCancelCalculatorEdit = () => {
    setEditedCalculatorData(calculatorData);
    setIsEditingCalculator(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1000px] px-6 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-2 font-bold text-[32px]">Összegzés és beküldés</h1>
          <p className="text-muted-foreground font-bold">
            Kérjük, ellenőrizze az adatokat beküldés előtt
          </p>
          <div className="mt-4 max-w-2xl mx-auto text-muted-foreground text-sm space-y-2">
            <p>1 órán belül felvesszük Önnel a kapcsolatot.</p>
            <p>Az űrlap beküldése megkönnyíti és lerövidíti a személyes ügyintézést.</p>
            <p>A kalkuláció beküldése nem jár semmilyen kötelezettséggel, a fizetés kizárólag az irodában történik.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Selected Company */}
          <Card>
            <CardHeader className="bg-secondary/30">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Kiválasztott temetkezési szolgáltató</h3>
                <Button variant="ghost" size="sm" onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Módosítás
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                {/* Company Image */}
                {selectedCompany.image && (
                  <div className="overflow-hidden rounded-lg shadow-md flex-shrink-0">
                    <ImageWithFallback
                      src={selectedCompany.image}
                      alt={`${selectedCompany.name} szolgáltatás`}
                      className="h-24 w-32 object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-[24px] font-bold">{selectedCompany.name}</h4>
                  <div className="mt-2 text-muted-foreground">
                    {selectedCompany.description}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-muted-foreground">Kiszolgált kerületek:</span>
                    {selectedCompany.districts.map((district) => (
                      <Badge key={district} variant="secondary" className="bg-primary/10 text-primary">
                        {district} kerület
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h4 className="mb-2 font-bold">Szolgáltatás részletezése</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Elszállítás, egészségügyi csomag, hamvasztás{selectedCompany.services.includes("Anyakönyveztetés") && ", anyakönyveztetés"}{selectedCompany.services.includes("Nyugdíjfolyósító") && ", nyugdíjfolyósító"}</span>
                    <span className="font-semibold">
                      {selectedCompany.serviceBreakdown.hamvasztas.toLocaleString(
                        "hu-HU"
                      )}{" "}
                      Ft
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hűtési, tárolási költség</span>
                    <span className="font-semibold">
                      {selectedCompany.serviceBreakdown.elszallitas.toLocaleString(
                        "hu-HU"
                      )}{" "}
                      Ft
                    </span>
                  </div>
                  {calculatorData.ceremonyType === "urnas" && (
                    <div className="flex justify-between">
                      <span>Urna - 30.000 Ft-tól</span>
                      <span className="text-muted-foreground">
                        ⓘ A végleges árat az Ön által kiválasztott urna befolyásolja
                      </span>
                    </div>
                  )}
                  {calculatorData.ceremonyType === "koporsos" && (
                    <div className="flex justify-between">
                      <span>Koporsó - 150.000 Ft-tól</span>
                      <span className="text-muted-foreground">
                        ⓘ A végleges árat az Ön által kiválasztott koporsó befolyásolja
                      </span>
                    </div>
                  )}
                  {calculatorData.farewellType !== "nem" && (
                    <>
                      <div className="flex justify-between">
                        <span>Sírhely / Urna / Szónok</span>
                        <span>
                          {selectedCompany.serviceBreakdown.bucsuztatas.toLocaleString(
                            "hu-HU"
                          )}{" "}
                          Ft
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Egyéb költségek</span>
                        <span>
                          {selectedCompany.serviceBreakdown.egyeb.toLocaleString(
                            "hu-HU"
                          )}{" "}
                          Ft
                        </span>
                      </div>
                    </>
                  )}
                  
                  {/* Extra Services */}
                  {extraServices && (extraServices.trumpeter || extraServices.pensionProcessor) && (
                    <>
                      <Separator className="my-2" />
                      <div className="pt-2">
                        <h5 className="mb-2 text-sm font-medium text-foreground">Extra szolgáltatások</h5>
                        {extraServices.trumpeter && (
                          <div className="flex justify-between">
                            <span>Trombitás</span>
                            <span>35.000 Ft</span>
                          </div>
                        )}
                        {extraServices.pensionProcessor && (
                          <div className="flex justify-between">
                            <span>Pénzügyi folyamatok kezelése</span>
                            <span>50.000 Ft</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-primary">
                  <span className="font-semibold font-bold">Becsült összeg:</span>
                  <span className="text-xl font-semibold font-bold">
                    {(selectedCompany.price + 
                      (extraServices?.trumpeter ? 35000 : 0) + 
                      (extraServices?.pensionProcessor ? 50000 : 0)
                    ).toLocaleString("hu-HU")} Ft
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculator Data */}
          <Card>
            <CardHeader className="bg-secondary/30">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Megadott információk</h3>
                {!isEditingCalculator && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingCalculator(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Szerkesztés
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {!isEditingCalculator ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-muted-foreground">Kórház/Halottasház</div>
                      <div className="mt-1">{calculatorData.hospital}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-muted-foreground">Szertartás típusa</div>
                      <div className="mt-1">
                        {ceremonyTypeLabels[calculatorData.ceremonyType]}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-muted-foreground">Búcsúztatás típusa</div>
                      <div className="mt-1">
                        {farewellTypeLabels[calculatorData.farewellType]}
                        {calculatorData.farewellType === "egyeb" && calculatorData.farewellTypeOther && (
                          <span className="text-muted-foreground"> - {calculatorData.farewellTypeOther}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {calculatorData.hasBurialPlace && (
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-muted-foreground">Sírhely</div>
                        <div className="mt-1">
                          {calculatorData.hasBurialPlace === "igen"
                            ? "Van sírhelyem"
                            : "Vásárolni szeretnék"}
                        </div>
                      </div>
                    </div>
                  )}

                  {calculatorData.cemeteryLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-muted-foreground">Temető helyszíne</div>
                        <div className="mt-1">{cemeteryLocationLabels[calculatorData.cemeteryLocation] || calculatorData.cemeteryLocation}</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Hospital */}
                  <div className="space-y-2">
                    <Label>Kórház / Halottasház</Label>
                    <Select
                      value={editedCalculatorData.hospital}
                      onValueChange={(value) =>
                        setEditedCalculatorData({
                          ...editedCalculatorData,
                          hospital: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
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

                  {/* Transport Date */}
                  <div className="space-y-2">
                    <Label>Elszállítás dátuma</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex h-10 w-full items-center justify-start rounded-md border border-border bg-input-background px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground">
                          {editedCalculatorData.transportDate ? (
                            format(editedCalculatorData.transportDate, "PPP", { locale: hu })
                          ) : (
                            <span className="text-muted-foreground">Válasszon dátumot</span>
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={editedCalculatorData.transportDate}
                          onSelect={(date) =>
                            setEditedCalculatorData({
                              ...editedCalculatorData,
                              transportDate: date,
                            })
                          }
                          initialFocus
                          locale={hu}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Ceremony Type */}
                  <div className="space-y-2">
                    <Label>Szertartás típusa</Label>
                    <RadioGroup
                      value={editedCalculatorData.ceremonyType}
                      onValueChange={(value) =>
                        setEditedCalculatorData({
                          ...editedCalculatorData,
                          ceremonyType: value,
                          boatCapacity: value === "hajos" ? editedCalculatorData.boatCapacity : undefined,
                          hasBurialPlace:
                            value === "hajos" || value === "szorasos"
                              ? ""
                              : editedCalculatorData.hasBurialPlace,
                          cemeteryLocation:
                            value === "hajos" ? "" : editedCalculatorData.cemeteryLocation,
                        })
                      }
                    >
                      <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-3">
                        <RadioGroupItem value="urnas" id="edit-urnas" />
                        <Label htmlFor="edit-urnas" className="flex-1 cursor-pointer">
                          Urnás búcsúztatás
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-3">
                        <RadioGroupItem value="koporsos" id="edit-koporsos" />
                        <Label htmlFor="edit-koporsos" className="flex-1 cursor-pointer">
                          Koporsós búcsúztatás
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-3">
                        <RadioGroupItem value="hajos" id="edit-hajos" />
                        <Label htmlFor="edit-hajos" className="flex-1 cursor-pointer">
                          Hajós búcsúztatás
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-3">
                        <RadioGroupItem value="szorasos" id="edit-szorasos" />
                        <Label htmlFor="edit-szorasos" className="flex-1 cursor-pointer">
                          Szórásos temetés
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Has Burial Place - Conditional */}
                  {editedCalculatorData.ceremonyType &&
                    editedCalculatorData.ceremonyType !== "hajos" &&
                    editedCalculatorData.ceremonyType !== "szorasos" && (
                      <div className="space-y-2">
                        <Label>Rendelkezik sírhellyel?</Label>
                        <RadioGroup
                          value={editedCalculatorData.hasBurialPlace}
                          onValueChange={(value) =>
                            setEditedCalculatorData({
                              ...editedCalculatorData,
                              hasBurialPlace: value,
                            })
                          }
                        >
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-3">
                            <RadioGroupItem value="igen" id="edit-burial-yes" />
                            <Label htmlFor="edit-burial-yes" className="flex-1 cursor-pointer">
                              Igen, van sírhelyem
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-3">
                            <RadioGroupItem value="nem" id="edit-burial-no" />
                            <Label htmlFor="edit-burial-no" className="flex-1 cursor-pointer">
                              Nem, vásárolni szeretnék
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                  {/* Farewell Type */}
                  <div className="space-y-2">
                    <Label>Búcsúztatás típusa</Label>
                    <RadioGroup
                      value={editedCalculatorData.farewellType}
                      onValueChange={(value) =>
                        setEditedCalculatorData({
                          ...editedCalculatorData,
                          farewellType: value,
                          farewellTypeOther: value === "egyeb" ? editedCalculatorData.farewellTypeOther : "",
                        })
                      }
                    >
                      <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-3">
                        <RadioGroupItem value="polgari" id="edit-polgari-farewell" />
                        <Label htmlFor="edit-polgari-farewell" className="flex-1 cursor-pointer">
                          Polgári
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-3">
                        <RadioGroupItem value="katolikus" id="edit-katolikus" />
                        <Label htmlFor="edit-katolikus" className="flex-1 cursor-pointer">
                          Katolikus
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-3">
                        <RadioGroupItem value="reformatus" id="edit-reformatus" />
                        <Label htmlFor="edit-reformatus" className="flex-1 cursor-pointer">
                          Református
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-3">
                        <RadioGroupItem value="nem" id="edit-nem" />
                        <Label htmlFor="edit-nem" className="flex-1 cursor-pointer">
                          Nem szeretnék
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border border-border bg-secondary/30 p-3">
                        <RadioGroupItem value="egyeb" id="edit-egyeb" />
                        <Label htmlFor="edit-egyeb" className="flex-1 cursor-pointer">
                          Egyéb
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {/* Custom text field for "Egyéb" option */}
                    {editedCalculatorData.farewellType === "egyeb" && (
                      <div className="mt-3 pl-7">
                        <Input
                          type="text"
                          placeholder="Kérem írja be milyen búcsúztatást szeretne..."
                          value={editedCalculatorData.farewellTypeOther || ""}
                          onChange={(e) =>
                            setEditedCalculatorData({
                              ...editedCalculatorData,
                              farewellTypeOther: e.target.value,
                            })
                          }
                          className="border-primary/50 focus:border-primary"
                        />
                      </div>
                    )}
                  </div>

                  {/* Cemetery Location - Conditional */}
                  {editedCalculatorData.ceremonyType &&
                    editedCalculatorData.ceremonyType !== "hajos" && (
                      <div className="space-y-2">
                        <Label>Temető helyszíne</Label>
                        <Select
                          value={editedCalculatorData.cemeteryLocation}
                          onValueChange={(value) =>
                            setEditedCalculatorData({
                              ...editedCalculatorData,
                              cemeteryLocation: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent position="item">
                            <SelectItem value="farkasreti">Farkasréti temető</SelectItem>
                            <SelectItem value="kerepesi">Kerepesi temető</SelectItem>
                            <SelectItem value="koztemeto">Rákoskeresztúri köztemető</SelectItem>
                            <SelectItem value="ujkoztemetö">Új köztemető</SelectItem>
                            {editedCalculatorData.ceremonyType === "szorasos" && (
                              <>
                                <SelectItem value="duna">Duna</SelectItem>
                                <SelectItem value="balaton">Balaton</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleSaveCalculator}
                      className="flex-1 bg-button hover:bg-button/90 text-button-foreground"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Mentés
                    </Button>
                    <Button
                      onClick={handleCancelCalculatorEdit}
                      variant="outline"
                      className="flex-1"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Mégse
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Data */}
          <Card>
            <CardHeader className="bg-secondary/30">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Kapcsolatfelvételi adatok</h3>
                {!isEditingContact && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingContact(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Szerkesztés
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {!isEditingContact ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-3 text-sm font-medium">Kapcsolattartó adatai</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-muted-foreground">Név</div>
                          <div className="mt-1">{userData.fullName}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-muted-foreground">Telefonszám</div>
                          <div className="mt-1">{userData.phone}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-muted-foreground">E-mail</div>
                          <div className="mt-1">{userData.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="mb-3 text-sm font-medium">Elhunyt adatai</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-muted-foreground">Elhunyt neve</div>
                          <div className="mt-1">{userData.deceasedName}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-muted-foreground">Születési hely</div>
                          <div className="mt-1">{userData.deceasedBirthPlace}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-muted-foreground">Születési dátum</div>
                          <div className="mt-1">{userData.deceasedBirthDate}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-3 text-sm font-medium">Kapcsolattartó adatai</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-fullName">Teljes név *</Label>
                        <Input
                          id="edit-fullName"
                          type="text"
                          value={editedUserData.fullName}
                          onChange={(e) =>
                            setEditedUserData({
                              ...editedUserData,
                              fullName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-phone">Telefonszám *</Label>
                        <Input
                          id="edit-phone"
                          type="tel"
                          value={editedUserData.phone}
                          onChange={(e) =>
                            setEditedUserData({
                              ...editedUserData,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-email">E-mail cím *</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={editedUserData.email}
                          onChange={(e) =>
                            setEditedUserData({
                              ...editedUserData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="mb-3 text-sm font-medium">Elhunyt adatai</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-deceasedName">Elhunyt neve *</Label>
                        <Input
                          id="edit-deceasedName"
                          type="text"
                          value={editedUserData.deceasedName}
                          onChange={(e) =>
                            setEditedUserData({
                              ...editedUserData,
                              deceasedName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-deceasedBirthPlace">Születési hely *</Label>
                        <Input
                          id="edit-deceasedBirthPlace"
                          type="text"
                          value={editedUserData.deceasedBirthPlace}
                          onChange={(e) =>
                            setEditedUserData({
                              ...editedUserData,
                              deceasedBirthPlace: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-deceasedBirthDate">Születési dátum *</Label>
                        <Input
                          id="edit-deceasedBirthDate"
                          type="text"
                          value={editedUserData.deceasedBirthDate}
                          onChange={(e) =>
                            setEditedUserData({
                              ...editedUserData,
                              deceasedBirthDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleSaveContact}
                      className="flex-1 bg-button hover:bg-button/90 text-button-foreground"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Mentés
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="flex-1"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Mégse
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Terms Info */}
          <Card className="border-accent bg-secondary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <div className="text-muted-foreground">
                  Az adatkezelési feltételeket elfogadtam. A megadott adatokat a
                  kiválasztott temetkezési szolgáltatóval osztjuk meg.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Office Selection */}
          <Card className="mb-6">
            <CardHeader className="bg-secondary/30">
              <h3 className="font-bold">Irodaválasztás</h3>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label>Melyik irodától vegyék fel Önnel a kapcsolatot? *</Label>
                <Select value={selectedOffice} onValueChange={(value) => {
                  setSelectedOffice(value);
                  onOfficeSelect(value);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Válasszon irodát" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCompany.offices.map((office, index) => (
                      <SelectItem key={index} value={office}>
                        {office}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={onEdit}>
            Módosítás
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={!selectedOffice}
            className="bg-button hover:bg-[#31587A] text-button-foreground hover:text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Véglegesítés és beküldés
          </Button>
        </div>
      </div>
    </div>
  );
}