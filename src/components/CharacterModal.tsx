import { useEffect, useState } from 'react';
import { Character, Planet, fetchPlanet } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDate, formatHeight, formatMass, formatPopulation } from '@/lib/utils/format';
import { Loader2, Ruler, Weight, Calendar, Film, Home, User } from 'lucide-react';

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterModal = ({ character, isOpen, onClose }: CharacterModalProps) => {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (character && isOpen) {
      setLoading(true);
      fetchPlanet(character.homeworld)
        .then(setPlanet)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [character, isOpen]);

  if (!character) return null;

  const imageUrl = `https://picsum.photos/seed/${character.name}/600/400`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-2 border-primary/20 animate-scale-in">
        <DialogHeader className="animate-fade-in-down">
          <DialogTitle className="text-3xl font-bold text-primary animate-glow-slow">
            {character.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Image */}
          <div className="space-y-4 animate-fade-in-left">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
              <img
                src={imageUrl}
                alt={character.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Species badge */}
              <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-sm font-medium">Human</span>
              </div>
            </div>
          </div>

          {/* Right Column - Information */}
          <div className="space-y-6 animate-fade-in-right">
            {/* Basic Information */}
            <div className="animate-slide-up animation-delay-200">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-primary animate-float" />
                <h3 className="text-xl font-semibold text-primary">Basic Information</h3>
              </div>
              <div className="space-y-3">
                <InfoRow icon={<Ruler className="w-4 h-4" />} label="Height" value={formatHeight(character.height)} />
                <InfoRow icon={<Weight className="w-4 h-4" />} label="Mass" value={formatMass(character.mass)} />
                <InfoRow icon={<Calendar className="w-4 h-4" />} label="Birth Year" value={character.birth_year} />
                <InfoRow icon={<Calendar className="w-4 h-4" />} label="Date Added" value={formatDate(character.created)} />
                <InfoRow icon={<Film className="w-4 h-4" />} label="Films Appeared In" value={`${character.films.length} films`} />
              </div>
            </div>

            {/* Homeworld Information */}
            <div className="animate-slide-up animation-delay-400">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-primary animate-float animation-delay-200" />
                <h3 className="text-xl font-semibold text-primary">Homeworld</h3>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : planet ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name</span>
                      <p className="text-foreground font-medium">{planet.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Population</span>
                      <p className="text-foreground font-medium">{formatPopulation(planet.population)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Terrain</span>
                      <p className="text-foreground capitalize">{planet.terrain}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Climate</span>
                      <p className="text-foreground capitalize">{planet.climate}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Unable to load homeworld data</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-3">
    <div className="text-muted-foreground mt-0.5">{icon}</div>
    <div className="flex-1">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-base font-semibold text-foreground">{value}</div>
    </div>
  </div>
);
