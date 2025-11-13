import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

export type CharacterFilters = {
  species: 'all' | 'human' | 'droid' | 'wookiee';
  homeworld: 'all' | 'tatooine' | 'alderaan' | 'naboo';
  film: 'all' | '1' | '2' | '3';
};

interface HeroSectionProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  filters: CharacterFilters;
  onFiltersChange: (next: Partial<CharacterFilters>) => void;
  onSearch?: () => void;
}

export const HeroSection = ({
  searchQuery,
  onSearchQueryChange,
  filters,
  onFiltersChange,
  onSearch,
}: HeroSectionProps) => {
  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] w-full max-w-5xl rounded-full bg-primary/10 blur-3xl" />

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-0">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/90 shadow-[0_0_25px_rgba(247,223,80,0.15)] animate-fade-in-down animate-glow-pulse">
          A Galaxy of Stories
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up animation-delay-200">
          <span className="text-foreground animate-fade-in">Explore the</span>{' '}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent drop-shadow-[0_10px_40px_rgba(247,223,80,0.35)] animate-glow-slow">
            Star Wars Galaxy
          </span>
        </h1>

        <p className="mt-6 text-base text-muted-foreground sm:text-lg md:text-xl animate-fade-in-up animation-delay-400">
          Discover iconic characters from a galaxy far, far away. Search, filter, and explore detailed information about your favorite heroes and villains.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center animate-fade-in-up animation-delay-600">
          <Input
            type="text"
            placeholder="Search characters by name..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="h-12 flex-1 min-w-0 border border-primary/40 bg-background/70 text-base shadow-[0_10px_35px_rgba(11,18,35,0.65)] backdrop-blur placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 transition-all duration-300 hover:border-primary/60 hover:shadow-[0_15px_45px_rgba(11,18,35,0.75)]"
          />
          <Button
            onClick={onSearch}
            className="h-12 w-full bg-primary text-primary-foreground shadow-[0_10px_40px_rgba(247,223,80,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_15px_50px_rgba(247,223,80,0.5)] hover:scale-105 active:scale-95 sm:w-auto"
          >
            Search
          </Button>
        </div>
      </div>

      <div
        id="filters"
        className="relative mx-auto mt-14 max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(5,10,20,0.65)] backdrop-blur-sm sm:p-8 animate-fade-in-up animation-delay-600 transition-all duration-500 hover:shadow-[0_35px_90px_rgba(5,10,20,0.75)] hover:border-primary/20"
      >
        <div className="flex items-center gap-2 text-primary animate-fade-in-left">
          <div className="group flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 transition-all duration-300 hover:bg-primary/30 hover:scale-110 hover:rotate-12">
            <Filter className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
          </div>
          <h3 className="text-lg font-semibold uppercase tracking-[0.3em] text-primary/80">
            Filters
          </h3>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          Fine-tune your search to surface the exact heroes, villains, and droids you are looking for.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Select value={filters.species} onValueChange={(v) => onFiltersChange({ species: v as HeroSectionProps['filters']['species'] })}>
            <SelectTrigger className="h-12 border border-white/10 bg-background/70 backdrop-blur">
              <SelectValue placeholder="All Species" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-popover/95 backdrop-blur">
              <SelectItem value="all">All Species</SelectItem>
              <SelectItem value="human">Human</SelectItem>
              <SelectItem value="droid">Droid</SelectItem>
              <SelectItem value="wookiee">Wookiee</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.homeworld} onValueChange={(v) => onFiltersChange({ homeworld: v as HeroSectionProps['filters']['homeworld'] })}>
            <SelectTrigger className="h-12 border border-white/10 bg-background/70 backdrop-blur">
              <SelectValue placeholder="All Homeworlds" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-popover/95 backdrop-blur">
              <SelectItem value="all">All Homeworlds</SelectItem>
              <SelectItem value="tatooine">Tatooine</SelectItem>
              <SelectItem value="alderaan">Alderaan</SelectItem>
              <SelectItem value="naboo">Naboo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.film} onValueChange={(v) => onFiltersChange({ film: v as HeroSectionProps['filters']['film'] })}>
            <SelectTrigger className="h-12 border border-white/10 bg-background/70 backdrop-blur">
              <SelectValue placeholder="All Films" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-popover/95 backdrop-blur">
              <SelectItem value="all">All Films</SelectItem>
              <SelectItem value="1">A New Hope</SelectItem>
              <SelectItem value="2">The Empire Strikes Back</SelectItem>
              <SelectItem value="3">Return of the Jedi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};
