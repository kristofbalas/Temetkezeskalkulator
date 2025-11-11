import imgTemetkezes5 from "figma:asset/6db100fb20bf218ee69ebc7f744b1132a01c6d91.png";
import imgTemetkezes1 from "figma:asset/1fb4c986ed719cdfd5b554052f6ccf8b832f7be9.png";
import imgTemetkezes2 from "figma:asset/5837b14e9549c3b49b98b1197e38e3b77cd5059f.png";
import imgTemetkezes3 from "figma:asset/334aa22c5dceeb59afb66a63b5408e2f910f6b08.png";
import imgTemetkezes4 from "figma:asset/842541a78e938db10896c0b214a78cce278d332a.png";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute left-0 size-[220px] top-0" data-name="Temetkezés 5">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgTemetkezes5} />
      </div>
      <div className="absolute h-[218px] left-[260px] top-[2px] w-[260px]" data-name="Temetkezés 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgTemetkezes1} />
      </div>
      <div className="absolute left-[822px] size-[220px] top-[23px]" data-name="Temetkezés 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgTemetkezes2} />
      </div>
      <div className="absolute h-[220px] left-0 top-[260px] w-[225px]" data-name="Temetkezés 3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgTemetkezes3} />
      </div>
      <div className="absolute h-[214px] left-[265px] top-[260px] w-[474px]" data-name="Temetkezés 4">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgTemetkezes4} />
      </div>
    </div>
  );
}