import imgMayronOliveiraMibn6LLm9KAUnsplash1 from "figma:asset/f1528eedf1908f7b9a8d7f384739251f755e08a0.png";
import imgImage1 from "figma:asset/26b26521bb5a593f71c53b4a11f866c00427cc4f.png";

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[19.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[19.109px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-black text-nowrap top-[-2px] whitespace-pre">VB</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[90px] pl-0 pr-[0.016px] py-0 rounded-[10px] size-[40px] top-[36px]" data-name="Container">
      <Text />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#ff6f55] box-border content-stretch flex gap-[8px] h-[40px] items-center justify-center left-[100px] px-[24px] py-0 rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[417px] w-[256px]" data-name="Button">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Kalkuláció indítása</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[90.531px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-[90.531px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#314eff] text-[14px] text-nowrap whitespace-pre">Kezdőlap</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[36px] relative rounded-[8px] shrink-0 w-[76.047px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-[76.047px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Rólunk</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[36px] relative rounded-[8px] shrink-0 w-[62.484px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-[62.484px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">GYIK</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Kapcsolat</p>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[36px] items-center left-[945px] top-[20px] w-[346.375px]" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#314eff] h-[550px] left-0 overflow-clip rounded-bl-[40px] rounded-br-[40px] top-0 w-[1400px]">
      <Container />
      <p className="absolute font-['Montserrat:Medium',sans-serif] leading-[35px] left-[100px] not-italic text-[36px] text-white top-[148px] w-[441px]">10 budapesti temetkezés ajánlata – egy helyen.</p>
      <div className="absolute h-[394px] left-[700px] rounded-[16px] top-[93px] w-[591px]" data-name="mayron-oliveira-mibn6LLm9kA-unsplash 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgMayronOliveiraMibn6LLm9KAUnsplash1} />
      </div>
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-[100px] not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-[275px] w-[409px]">Adja meg az alap adatokat, és hasonlítsa össze 10 budapesti temetkezés ajánlatát – gyorsan, átláthatóan. Az űrlap kitöltése után 1 órán belül felvesszük Önnel a kapcsolatot, a kiválasztott temetkezési iroda pedig már felkészülten várja Önt.</p>
      <Button />
      <Container1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[121px] top-[707px]">
      <div className="absolute h-[83px] left-[121px] top-[707px] w-[215px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[83px] left-[357px] top-[707px] w-[215px]" data-name="image 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[83px] left-[593px] top-[707px] w-[215px]" data-name="image 3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[83px] left-[829px] top-[707px] w-[215px]" data-name="image 4">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[83px] left-[1065px] top-[707px] w-[215px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#314eff] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] left-0 text-[#314eff] text-[16px] text-nowrap top-[-2px] whitespace-pre">Adatok megadása</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#6b7b8a] text-[16px] text-nowrap top-[-2px] whitespace-pre">Válassza ki az aktuális körülményeket.</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[56px] items-start relative w-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[16px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#314eff] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] left-0 text-[#314eff] text-[16px] text-nowrap top-[-2px] whitespace-pre">Kapcsolattartás rögzítése</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#6b7b8a] text-[16px] text-nowrap top-[-2px] whitespace-pre">Adja meg elérhetőségeit, hogy ajánlatunkat személyre szabhassuk.</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[56px] items-start relative w-full">
        <Heading1 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[16px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#314eff] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] left-0 text-[#314eff] text-[16px] text-nowrap top-[-2px] whitespace-pre">Ajánlatok megtekintése</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#6b7b8a] text-[16px] top-[-2px] w-[710px]">A rendszer összehasonlítja 10 budapesti temetkezési partner ajánlatát – átláthatóan, rejtett költségek nélkül.</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 grow h-[80px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[80px] items-start relative w-full">
        <Heading2 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[16px] h-[80px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#314eff] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white whitespace-pre">4</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] left-0 text-[#314eff] text-[16px] text-nowrap top-[-2px] whitespace-pre">Személyes kapcsolat 1 órán belül</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#6b7b8a] text-[16px] text-nowrap top-[-2px] whitespace-pre">Munkatársunk felveszi Önnel a kapcsolatot a részletek pontosításához.</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[56px] items-start relative w-full">
        <Heading3 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[16px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#314eff] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] left-0 text-[#314eff] text-[16px] text-nowrap top-[-2px] whitespace-pre">Zökkenőmentes ügyintézés az irodában</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#6b7b8a] text-[16px] text-nowrap top-[-2px] whitespace-pre">A kiválasztott temetkezés már látja az Ön ajánlatát – nem kell újra elmondani a körülményeket.</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[56px] items-start relative w-full">
        <Heading4 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[16px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[432px] items-start left-[291px] top-[1005px] w-[800px]" data-name="Container">
      <Container4 />
      <Container7 />
      <Container10 />
      <Container13 />
      <Container16 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <Frame1 />
      <p className="absolute font-['Montserrat:Medium',sans-serif] leading-[35px] left-[calc(50%+0.5px)] not-italic text-[36px] text-black text-center text-nowrap top-[618px] translate-x-[-50%] whitespace-pre">Partnereink</p>
      <Group />
      <div className="absolute bg-[#eff3f5] h-[625px] left-[121px] rounded-[22px] top-[897px] w-[1159px]" />
      <p className="absolute font-['Montserrat:Medium',sans-serif] leading-[35px] left-[calc(50%+0.5px)] not-italic text-[36px] text-black text-center text-nowrap top-[928px] translate-x-[-50%] whitespace-pre">Hogyan működik?</p>
      <Container17 />
    </div>
  );
}