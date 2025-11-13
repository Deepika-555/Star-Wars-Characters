import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd-MM-yyyy');
  } catch {
    return 'Unknown';
  }
};

export const formatHeight = (height: string): string => {
  const heightNum = parseFloat(height);
  if (isNaN(heightNum)) return 'Unknown';
  return `${(heightNum / 100).toFixed(2)} m`;
};

export const formatMass = (mass: string): string => {
  if (mass === 'unknown') return 'Unknown';
  return `${mass} kg`;
};

export const formatPopulation = (population: string): string => {
  if (population === 'unknown') return 'Unknown';
  const num = parseInt(population);
  if (isNaN(num)) return population;
  return num.toLocaleString();
};
