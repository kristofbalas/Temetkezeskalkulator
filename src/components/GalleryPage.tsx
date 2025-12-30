import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgTemetkezes1 from "figma:asset/1fb4c986ed719cdfd5b554052f6ccf8b832f7be9.png";
import imgTemetkezes2 from "figma:asset/5837b14e9549c3b49b98b1197e38e3b77cd5059f.png";
import imgTemetkezes3 from "figma:asset/334aa22c5dceeb59afb66a63b5408e2f910f6b08.png";
import imgTemetkezes4 from "figma:asset/842541a78e938db10896c0b214a78cce278d332a.png";
import imgTemetkezes5 from "figma:asset/6db100fb20bf218ee69ebc7f744b1132a01c6d91.png";
import imgMayronOliveiraMibn6LLm9KAUnsplash1 from "figma:asset/f1528eedf1908f7b9a8d7f384739251f755e08a0.png";
import imgImage1 from "figma:asset/26b26521bb5a593f71c53b4a11f866c00427cc4f.png";

interface GalleryPageProps {
  onBack: () => void;
}

export function GalleryPage({ onBack }: GalleryPageProps) {
  const images = [
    { src: imgTemetkezes1, name: "Alcsík Temetkezés (imgTemetkezes1)" },
    { src: imgTemetkezes2, name: "Glória Temetkezés (imgTemetkezes2)" },
    { src: imgTemetkezes3, name: "PRG Temetkezés (imgTemetkezes3)" },
    { src: imgTemetkezes4, name: "ÍRISZ Temetkezés (imgTemetkezes4)" },
    { src: imgTemetkezes5, name: "Schaffer és Wagner (imgTemetkezes5)" },
    { src: imgMayronOliveiraMibn6LLm9KAUnsplash1, name: "Főoldali Hero Kép (Mayron Oliveira)" },
    { src: imgImage1, name: "Egyéb kép (imgImage1)" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Képgaléria Letöltéshez</h1>
          <Button onClick={onBack} variant="outline">
            Vissza a főoldalra
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-blue-800">
          <p className="font-medium">Hogyan mentse le a képeket?</p>
          <p>Kattintson jobb egérgombbal a képre, és válassza a <strong>"Kép mentése másként..." (Save image as...)</strong> opciót.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              <div className="p-4 bg-gray-100 flex items-center justify-center min-h-[250px] border-b">
                <ImageWithFallback
                  src={img.src}
                  alt={img.name}
                  className="max-h-[200px] w-auto object-contain"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-800 mb-2">{img.name}</p>
                <p className="text-xs text-gray-500 break-all">{img.src}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
