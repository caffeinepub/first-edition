import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FlipbookData } from '../contexts/ProjectContext';
import { cn } from '@/lib/utils';

interface FlipbookViewerProps {
  flipbook: FlipbookData;
}

export default function FlipbookViewer({ flipbook }: FlipbookViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const totalPages = flipbook.pages.length;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNextPage();
    } else if (e.key === 'ArrowLeft') {
      handlePrevPage();
    }
  };

  const page = flipbook.pages[currentPage];

  return (
    <div 
      className="flex flex-col items-center gap-6 py-8"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <h1 className="text-4xl font-story text-center">{flipbook.title}</h1>

      <div className="relative w-full max-w-4xl">
        <Card 
          className={cn(
            "relative bg-background border-4 border-primary/20 shadow-2xl transition-all duration-300",
            "min-h-[600px] p-8",
            isFlipping && "scale-95 opacity-50"
          )}
          style={{
            backgroundImage: 'url(/assets/generated/prompt-card-bg.dim_400x300.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10 h-full flex flex-col gap-6">
            {page.imageUrl && (
              <div className="flex justify-center">
                <img
                  src={page.imageUrl}
                  alt={`Page ${page.pageNumber} illustration`}
                  className="max-h-[300px] rounded-lg shadow-lg object-contain"
                />
              </div>
            )}

            {page.textContent && (
              <div className="flex-1 overflow-y-auto">
                <p className="text-lg leading-relaxed font-writing whitespace-pre-wrap">
                  {page.textContent}
                </p>
              </div>
            )}

            <div className="text-center text-sm text-muted-foreground font-story">
              Page {page.pageNumber} of {totalPages}
            </div>
          </div>
        </Card>

        {/* Page corner fold effect */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-primary/10 to-transparent pointer-events-none" />
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 0 || isFlipping}
          size="lg"
          variant="outline"
          className="gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground min-w-[100px] text-center">
          {currentPage + 1} / {totalPages}
        </div>

        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1 || isFlipping}
          size="lg"
          variant="outline"
          className="gap-2"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Use arrow keys ← → to navigate pages
      </p>
    </div>
  );
}
