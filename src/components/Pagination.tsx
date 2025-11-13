import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  totalPages?: number;
}

export const Pagination = ({
  currentPage,
  hasNext,
  hasPrevious,
  onPageChange,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        variant="outline"
        size="lg"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="group border-primary/30 hover:border-primary hover:bg-primary/10 disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border">
        <span className="text-sm text-muted-foreground">Page</span>
        <span className="text-lg font-bold text-primary">{currentPage}</span>
        {totalPages && (
          <>
            <span className="text-sm text-muted-foreground">of</span>
            <span className="text-lg font-bold text-foreground">{totalPages}</span>
          </>
        )}
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="group border-primary/30 hover:border-primary hover:bg-primary/10 disabled:opacity-50"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
