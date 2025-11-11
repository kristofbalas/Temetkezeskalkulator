import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Info } from "lucide-react";

export interface UserData {
  fullName: string;
  phone: string;
  email: string;
  deceasedName: string;
  deceasedBirthPlace: string;
  deceasedBirthDate: string;
  acceptTerms: boolean;
}

interface DataCollectionProps {
  onComplete: (data: UserData) => void;
  onBack: () => void;
  initialData?: UserData;
  overallProgress: number;
  onProgressUpdate: (progress: number) => void;
}

export function DataCollection({ onComplete, onBack, initialData, overallProgress, onProgressUpdate }: DataCollectionProps) {
  const [userData, setUserData] = useState<UserData>(
    initialData || {
      fullName: "",
      phone: "",
      email: "",
      deceasedName: "",
      deceasedBirthPlace: "",
      deceasedBirthDate: "",
      acceptTerms: false,
    }
  );

  const [showTerms, setShowTerms] = useState(false);

  // Calculate progress (30-100% of overall progress)
  // 100% is reached when all fields are filled and ready to view results
  useEffect(() => {
    const fields = [
      userData.fullName.trim() !== "",
      userData.phone.trim() !== "",
      userData.email.trim() !== "" && userData.email.includes("@"),
      userData.deceasedName.trim() !== "",
      userData.deceasedBirthPlace.trim() !== "",
      userData.deceasedBirthDate.trim() !== "",
      userData.acceptTerms,
    ];
    
    const filledFields = fields.filter(Boolean).length;
    // Data collection represents 30-100% of overall progress (70% range)
    const localProgress = 30 + (filledFields / 7) * 70;
    onProgressUpdate(localProgress);
  }, [userData, onProgressUpdate]);

  const isFormValid = () => {
    return (
      userData.fullName.trim() !== "" &&
      userData.phone.trim() !== "" &&
      userData.email.trim() !== "" &&
      userData.email.includes("@") &&
      userData.deceasedName.trim() !== "" &&
      userData.deceasedBirthPlace.trim() !== "" &&
      userData.deceasedBirthDate.trim() !== "" &&
      userData.acceptTerms
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onComplete(userData);
    }
  };

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

      <div className="mx-auto max-w-[800px] px-6 py-12">
        <div className="mb-8">
          <h1 className="mb-2">Kapcsolatfelvételi adatok</h1>
          <p className="text-muted-foreground">
            Töltse ki az adatokat, és hasonlítsa össze 10 budapesti temetkezés ajánlatát – gyorsan és egyszerűen.
          </p>
        </div>

        <Alert className="mb-8 border-accent bg-secondary/30 bg-[rgb(255,255,255)]">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Az Ön adatai biztonságban vannak. Csak a kiválasztott temetkezési
            szolgáltatóval osztjuk meg őket.
          </AlertDescription>
        </Alert>

        <div className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
          {/* Az Ön adatai Section */}
          <div className="mb-6">
            <h3 className="mb-4 text-primary font-bold">Az Ön adatai</h3>
            
            {/* Full Name */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="fullName">Teljes név *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Kovács János"
                value={userData.fullName}
                onChange={(e) =>
                  setUserData({ ...userData, fullName: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="phone">Telefonszám *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+36704090553"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
             
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail cím *</Label>
              <Input
                id="email"
                type="email"
                placeholder="info@temetkezeskalkulator.hu"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              <p className="text-muted-foreground">
                E-mailben is megkapja az ajánlat részleteit
              </p>
            </div>
          </div>

          {/* Elhunyt adatai Section */}
          <div className="pt-6 border-t border-border">
            <h3 className="mb-4 text-primary font-bold">Elhunyt adatai</h3>
            
            {/* Deceased Name */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="deceasedName">Teljes név *</Label>
              <Input
                id="deceasedName"
                type="text"
                placeholder="Kovács István"
                value={userData.deceasedName}
                onChange={(e) =>
                  setUserData({ ...userData, deceasedName: e.target.value })
                }
              />
            </div>

            {/* Deceased Birth Place */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="deceasedBirthPlace">Születési hely *</Label>
              <Input
                id="deceasedBirthPlace"
                type="text"
                placeholder="Budapest"
                value={userData.deceasedBirthPlace}
                onChange={(e) =>
                  setUserData({ ...userData, deceasedBirthPlace: e.target.value })
                }
              />
            </div>

            {/* Deceased Birth Date */}
            <div className="space-y-2">
              <Label htmlFor="deceasedBirthDate">Születési idő *</Label>
              <Input
                id="deceasedBirthDate"
                type="text"
                placeholder="1950. január 15."
                value={userData.deceasedBirthDate}
                onChange={(e) =>
                  setUserData({ ...userData, deceasedBirthDate: e.target.value })
                }
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="space-y-4 pt-6">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={userData.acceptTerms}
                onCheckedChange={(checked) =>
                  setUserData({ ...userData, acceptTerms: checked as boolean })
                }
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="terms" className="cursor-pointer">
                  Elfogadom az adatkezelési feltételeket *
                </Label>
                <button
                  onClick={() => setShowTerms(!showTerms)}
                  className="mt-1 text-primary underline"
                >
                  {showTerms ? "Elrejtés" : "Adatkezelési tájékoztató"}
                </button>
              </div>
            </div>

            {showTerms && (
              <div className="mt-4 space-y-2 rounded border border-border bg-white p-4 text-muted-foreground">
                <p>
                  <strong>Adatkezelési tájékoztató</strong>
                </p>
                <p>
                  A megadott személyes adatokat kizárólag az ajánlatkérés
                  teljesítése céljából kezeljük. Az adatokat a kiválasztott
                  temetkezési szolgáltatóval osztjuk meg, hogy felvehesse Önnel
                  a kapcsolatot.
                </p>
                <p>
                  Az adatok kezelése a GDPR és a magyar adatvédelmi törvények
                  szerint történik. Adatait biztonságosan tároljuk, és nem adjuk
                  át harmadik félnek marketing célokra.
                </p>
                <p>
                  Bármikor kérheti adatai törlését vagy módosítását az
                  info@vizibucsuztatas.hu címen.
                </p>
              </div>
            )}
          </div>

          <p className="text-muted-foreground">* Kötelező mezők</p>
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
            Kalkulációk megtekintése
          </Button>
        </div>
      </div>
    </div>
  );
}