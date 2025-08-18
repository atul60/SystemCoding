import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

const SeachContext = createContext<{
  isSearchActive: boolean;
  setIsSearchActive: Dispatch<SetStateAction<boolean>>;
  selectedSuggestion: number;
  setSelectedSuggestion: Dispatch<SetStateAction<number>>;
  selectedRef: any;
}>({
  isSearchActive: false,
  setIsSearchActive: () => {},
  selectedSuggestion: -1,
  setSelectedSuggestion: () => {},
  selectedRef: { current: null },
});

export const useSearchContext = () => {
  return useContext(SeachContext);
};

export const Provider = ({ children }: { children: ReactNode }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);
  const selectedRef: any = useRef<any>(null);
  return (
    <SeachContext.Provider
      value={{
        isSearchActive,
        setIsSearchActive,
        selectedSuggestion,
        setSelectedSuggestion,
        selectedRef,
      }}
    >
      {children}
    </SeachContext.Provider>
  );
};
