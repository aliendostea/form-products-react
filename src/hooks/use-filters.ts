import { useContext } from "react";
import { FiltersContext } from "@/store/context/filtersContext";

export function useFilters() {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersContextProvider");
  }
  const { filters, setFilters } = context;

  return { filters, setFilters } as const;
}
