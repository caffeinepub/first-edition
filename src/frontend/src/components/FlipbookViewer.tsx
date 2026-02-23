import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { FlipbookData } from '../contexts/ProjectContext';

interface FlipbookViewerProps {
  flipbook: FlipbookData;
}

export default function FlipbookViewer({ flipbook }: FlipbookViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < flipbook.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const page = flipbook.pages[currentPage];

  return (
    <div className="space-y-6">
      <Card className="shadow-professional">
        <CardContent className="p-8">
          <div className="min-h-[500px] flex flex-col justify-center">
            {page.imageUrl && (
              <div className="mb-6">
                <img
                  src={page.imageUrl}
                  alt={`Page ${page.pageNumber}`}
                  className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                />
              </div>
            )}
            <div className="prose prose-sm max-w-none">
              <p className="text-base leading-relaxed font-content whitespace-pre-wrap">
                {page.textContent}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          onClick={prevPage}
          disabled={currentPage === 0}
          variant="outline"
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <span className="text-sm text-muted-foreground font-medium">
          Page {currentPage + 1} of {flipbook.pages.length}
        </span>

        <Button
          onClick={nextPage}
          disabled={currentPage === flipbook.pages.length - 1}
          variant="outline"
          className="gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
