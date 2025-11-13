export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface CharactersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string | null;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const BASE_URL = 'https://swapi.dev/api';

export const fetchCharacters = async (page: number = 1): Promise<CharactersResponse> => {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};

export const fetchPlanet = async (url: string): Promise<Planet> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch planet');
  }
  return response.json();
};

export const fetchSpecies = async (url: string): Promise<Species> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch species');
  }
  return response.json();
};

// Fetch all characters across all SWAPI pages (used for client-side filtering and custom pagination)
export const fetchAllCharacters = async (): Promise<CharactersResponse> => {
  const firstPage = await fetchCharacters(1);
  const total = firstPage.count;
  const totalPages = Math.ceil(total / 10);

  if (totalPages === 1) {
    return firstPage;
  }

  const pagePromises: Promise<CharactersResponse>[] = [];
  for (let p = 2; p <= totalPages; p++) {
    pagePromises.push(fetchCharacters(p));
  }

  const restPages = await Promise.all(pagePromises);
  const results = [firstPage.results, ...restPages.map((p) => p.results)].flat();

  return {
    count: total,
    next: null,
    previous: null,
    results,
  };
};
