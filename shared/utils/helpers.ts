export const regionMap = [
  { label: "LAN", value: "LA1", color: "oklch(70.7% 0.165 254.624)" },
  { label: "LAS", value: "LA2", color: "oklch(75% 0.183 55.934)" },
  { label: "NA", value: "NA1", color: "oklch(70.2% 0.183 293.541)" },
  { label: "EUW", value: "EUW1", color: "oklch(76.5% 0.177 163.223)" },
  { label: "EUNE", value: "EUN1", color: "oklch(71.8% 0.202 349.761)" },
  { label: "BR", value: "BR1", color: "oklch(85.2% 0.199 91.936)" }
];

export const getRegionLabel = (value: string): string => {
  const region = regionMap.find(r => r.value === value);
  return region ? region.label : "Unknown";
};

export const getRegionColor = (value: string): string => {
  const region = regionMap.find(r => r.value === value);
  return region ? region.color : "oklch(92.8% 0.006 264.531)";
};
