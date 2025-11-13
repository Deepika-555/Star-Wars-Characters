import { Character } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { getSpeciesColor } from '@/lib/utils/colors';
import { User } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  index?: number;
}

export const CharacterCard = ({ character, onClick, index = 0 }: CharacterCardProps) => {
  const imageUrl = `https://picsum.photos/seed/${character.name}/400/500`;
  const borderColor = getSpeciesColor(character.species);
  const delay = index * 50; // Stagger delay in milliseconds

  return (
    <Card
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative overflow-hidden cursor-pointer animate-fade-in-up bg-card border-2 ${borderColor} transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_20px_60px_rgba(247,223,80,0.3)] hover:border-primary/60 hover:-translate-y-2`}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={imageUrl}
          alt={character.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
        
        {/* Character badge */}
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 animate-fade-in-right transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
          <User className="w-3 h-3 transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-xs font-medium">Character</span>
        </div>

        {/* Character info overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-card/95 border-b border-border transform -translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out">
          <h3 className="text-lg font-bold text-foreground mb-1">
            {character.name}
          </h3>
          <p className="text-sm text-muted-foreground">Birth Year: {character.birth_year}</p>
          <p className="text-xs text-primary mt-2">Click for details</p>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-foreground mb-1">
            {character.name}
          </h3>
          <p className="text-sm text-muted-foreground">Birth Year: {character.birth_year}</p>
          <p className="text-xs text-muted-foreground mt-1">Click for details</p>
          
          {/* Colored indicator dot */}
          <div className="absolute bottom-4 right-4 transition-transform duration-300 group-hover:scale-150 group-hover:rotate-180">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(247,223,80,0.8)] ${character.species.length > 0 ? 'bg-primary animate-glow-pulse' : 'bg-space-blue'}`} />
          </div>
        </div>
      </div>
    </Card>
  );
};
