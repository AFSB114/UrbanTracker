import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from "lucide-react";
import type { PaginationData } from "../types/driverTypes";

interface PaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  isLoading?: boolean;
  showItemsPerPageSelect?: boolean;
  itemsPerPageOptions?: number[];
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  onItemsPerPageChange,
  isLoading = false,
  showItemsPerPageSelect = true,
  itemsPerPageOptions = [5, 10, 20, 50],
}) => {
  const { 
    currentPage, 
    totalPages, 
    totalItems, 
    itemsPerPage, 
    startIndex, 
    endIndex 
  } = pagination;

  // Don't render if no items or only one page and no items per page selector
  if (totalItems === 0 || (totalPages <= 1 && !showItemsPerPageSelect)) {
    return null;
  }

  const getVisiblePages = (): number[] => {
    const delta = 2;
    const pages: number[] = [];
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const showFirstPage = visiblePages[0] > 1;
  const showLastPage = visiblePages[visiblePages.length - 1] < totalPages;

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value, 10);
    onItemsPerPageChange?.(newItemsPerPage);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-6 px-1">
      {/* Left side: Results info and items per page selector */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Results info */}
        <div className="text-sm text-zinc-400 whitespace-nowrap">
          {totalItems === 0 ? (
            "No drivers found"
          ) : (
            <>
              Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
              <span className="font-medium text-white">{totalItems}</span>{" "}
              drivers
            </>
          )}
        </div>

        {/* Items per page selector */}
        {showItemsPerPageSelect && onItemsPerPageChange && totalItems > 0 && (
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="whitespace-nowrap">Rows per page:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-20 h-8 bg-zinc-800 border-zinc-700 text-zinc-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {itemsPerPageOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option.toString()}
                    className="text-zinc-300 hover:bg-zinc-700 focus:bg-zinc-700"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Right side: Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* First page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || isLoading}
            className="hidden sm:flex bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white disabled:opacity-50"
            title="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white disabled:opacity-50"
            title="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </Button>

          {/* First page number if not in visible range */}
          {showFirstPage && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(1)}
                disabled={isLoading}
                className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white min-w-[2.5rem]"
              >
                1
              </Button>
              {visiblePages[0] > 2 && (
                <span className="text-zinc-400 px-2 select-none">...</span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {visiblePages.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              className={
                currentPage === page
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 min-w-[2.5rem] font-medium"
                  : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white min-w-[2.5rem]"
              }
            >
              {page}
            </Button>
          ))}

          {/* Last page number if not in visible range */}
          {showLastPage && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="text-zinc-400 px-2 select-none">...</span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(totalPages)}
                disabled={isLoading}
                className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white min-w-[2.5rem]"
              >
                {totalPages}
              </Button>
            </>
          )}

          {/* Next page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white disabled:opacity-50"
            title="Next page"
          >
            <span className="hidden sm:inline mr-1">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || isLoading}
            className="hidden sm:flex bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white disabled:opacity-50"
            title="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};