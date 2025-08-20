import { ReactNode } from "react";
import "./style.css";
import { Provider, useSearchContext } from "./SearchContext";

const Search = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <div>{children}</div>
    </Provider>
  );
};

const SearchIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="searchIcon">{children}</span>
);

const SearchBox = (props: {
  value: string;
  handleChange: (value: string) => void;
  searchIcon: () => ReactNode;
}) => {
  const { value, handleChange, searchIcon } = props;
  const {
    setIsSearchActive,
    selectedSuggestion,
    setSelectedSuggestion,
    selectedRef,
  } = useSearchContext();

  const handleKeyDown = (e: any) => {
    console.log(e.key);
    if (e.key == "ArrowDown") {
      setSelectedSuggestion((index) => index + 1);
    } else if (e.key == "ArrowUp") {
      if (selectedSuggestion != 0) {
        setSelectedSuggestion((index) => index - 1);
      }
    }
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: "center" });
    }
    console.log("event", e.key);
  };

  return (
    <div className="searchBox">
      <input
        placeholder="Search..."
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setIsSearchActive(false)}
        onFocus={() => setIsSearchActive(true)}
        onKeyDown={handleKeyDown}
      />
      {searchIcon()}
    </div>
  );
};

const Suggestion = ({ children }: { children: ReactNode }) => {
  const { isSearchActive } = useSearchContext();
  if (!isSearchActive) return null;
  return <div className="suggestions">{children}</div>;
};

Search.Icon = SearchIcon;
Search.SearchBox = SearchBox;
Search.Suggestion = Suggestion;

export default Search;
