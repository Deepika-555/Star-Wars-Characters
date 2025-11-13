import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCharacters, Character } from '@/lib/api';
import { CharacterCard } from '@/components/CharacterCard';
import { CharacterModal } from '@/components/CharacterModal';
import { HeroSection } from '@/components/HeroSection';
import { Pagination } from '@/components/Pagination';
import { Navbar } from '@/components/Navbar';
import { Star, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    species: 'all' as 'all' | 'human' | 'droid' | 'wookiee',
    homeworld: 'all' as 'all' | 'tatooine' | 'alderaan' | 'naboo',
    film: 'all' as 'all' | '1' | '2' | '3',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', 'all'],
    queryFn: () => fetchAllCharacters(),
  });

  // Client-side search + filters + 12-per-page pagination
  const pageSize = 12;
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const matchesSpecies = (c: Character) => {
    if (filters.species === 'all') return true;
    if (filters.species === 'human') return c.species.length === 0 || c.species.some((s) => s.includes('/species/1/'));
    if (filters.species === 'droid') return c.species.some((s) => s.includes('/species/2/'));
    if (filters.species === 'wookiee') return c.species.some((s) => s.includes('/species/3/'));
    return true;
  };

  const planetIdMap: Record<string, string> = { tatooine: '1', alderaan: '2', naboo: '8' };
  const matchesHomeworld = (c: Character) => {
    if (filters.homeworld === 'all') return true;
    const pid = planetIdMap[filters.homeworld];
    return !!pid && c.homeworld.includes(`/planets/${pid}/`);
  };

  const matchesFilm = (c: Character) => {
    if (filters.film === 'all') return true;
    return c.films.some((f) => f.includes(`/films/${filters.film}/`));
  };

  const filteredCharacters = (data?.results ?? [])
    .filter((c) => (!normalizedSearch ? true : c.name.toLowerCase().includes(normalizedSearch)))
    .filter(matchesSpecies)
    .filter(matchesHomeworld)
    .filter(matchesFilm);

  const totalPages = Math.ceil(filteredCharacters.length / pageSize) || 1;
  const start = (currentPage - 1) * pageSize;
  const paginatedCharacters = filteredCharacters.slice(start, start + pageSize);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(247,223,80,0.08),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_60%)] pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[length:200px_200px] bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] opacity-30" />

      <Navbar />

      <main className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          filters={filters}
          onFiltersChange={(next) => setFilters((prev) => ({ ...prev, ...next }))}
          onSearch={() => setCurrentPage(1)}
        />

        <section id="characters" className="py-10 sm:py-14">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-20 shadow-[0_25px_60px_rgba(5,10,20,0.45)] backdrop-blur">
              <div className="relative mb-5 flex items-center justify-center">
                <Star className="h-16 w-16 animate-star-trail text-primary/30" />
                <Star className="absolute h-10 w-10 animate-star-pulse text-primary" />
              </div>
              <p className="text-center text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Loading characters from a galaxy far, far away...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="mb-8 border border-destructive/30 bg-destructive/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load characters. The Force is not with us right now. Please try again.
              </AlertDescription>
            </Alert>
          )}

          {/* Character Grid */}
          {data && !isLoading && (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                {paginatedCharacters.map((character) => (
                  <CharacterCard
                    key={character.url}
                    character={character}
                    onClick={() => handleCharacterClick(character)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  hasNext={hasNext}
                  hasPrevious={hasPrevious}
                  onPageChange={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            </>
          )}
        </section>
      </main>

      {/* Character Modal */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
