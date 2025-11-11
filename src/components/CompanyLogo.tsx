interface CompanyLogoProps {
  name: string;
  className?: string;
}

export function CompanyLogo({ name, className = "" }: CompanyLogoProps) {
  // Generate monogram from company name (first letters of first two words)
  const getMonogram = (companyName: string): string => {
    const words = companyName.split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return companyName.substring(0, 2).toUpperCase();
  };

  // Generate a consistent color based on company name
  const getColorFromName = (companyName: string): string => {
    const colors = [
      "bg-[#314EFF]",
      "bg-[#2640CC]",
      "bg-[#4A5FFF]",
      "bg-[#5B6FFF]",
      "bg-[#1E3ACC]",
    ];
    
    let hash = 0;
    for (let i = 0; i < companyName.length; i++) {
      hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const monogram = getMonogram(name);
  const bgColor = getColorFromName(name);

  return (
    <div
      className={`flex items-center justify-center rounded-lg ${bgColor} text-white ${className}`}
    >
      <span className="select-none">{monogram}</span>
    </div>
  );
}