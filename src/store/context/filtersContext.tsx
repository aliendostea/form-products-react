import { createContext, useState } from "react";

interface FiltersProviderProps {
  children: JSX.Element;
}

interface FiltersProps {
  stringToSearch: string;
  isFilteringOnKeydown: boolean;
}

interface FiltersContextProps {
  filters: FiltersProps;
  setFilters: (filters: FiltersProps) => void;
}

export const FiltersContext = createContext<FiltersContextProps | undefined>(
  undefined
);

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [filters, setFilters] = useState({
    stringToSearch: "",
    isFilteringOnKeydown: false,
  });

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
