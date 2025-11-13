// Species-based color mapping for character cards
export const getSpeciesColor = (speciesUrls: string[]): string => {
  if (!speciesUrls || speciesUrls.length === 0) {
    // Human - default gold/yellow
    return 'border-primary';
  }
  
  // Extract species ID from URL
  const speciesId = speciesUrls[0].match(/\/(\d+)\/$/)?.[1];
  
  const colorMap: Record<string, string> = {
    '1': 'border-primary', // Human - yellow/gold
    '2': 'border-space-blue', // Droid - blue
    '3': 'border-primary', // Wookiee
    '4': 'border-primary', // Rodian
    '5': 'border-space-blue', // Hutt
    '6': 'border-primary', // Yoda's species
  };
  
  return colorMap[speciesId || '1'] || 'border-primary';
};
