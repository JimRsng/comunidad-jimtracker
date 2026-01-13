export const regionMap = [
  { label: "LAN", value: "LA1", color: "oklch(80.9% 0.105 251.813)" },
  { label: "LAS", value: "LA2", color: "oklch(83.7% 0.128 66.29)" },
  { label: "NA", value: "NA1", color: "oklch(81.1% 0.111 293.571)" },
  { label: "EUW", value: "EUW1", color: "oklch(84.5% 0.143 164.978)" },
  { label: "EUNE", value: "EUN1", color: "oklch(82.3% 0.12 346.018)" },
  { label: "BR", value: "BR1", color: "oklch(90.5% 0.182 98.111)" }
];

export const getRegionLabel = (value: string): string => {
  const region = regionMap.find(r => r.value === value);
  return region ? region.label : "Unknown";
};

export const getRegionColor = (value: string): string => {
  const region = regionMap.find(r => r.value === value);
  return region ? region.color : "oklch(92.8% 0.006 264.531)";
};
