import { ReactNode, Ref, useRef } from "react";
import { useSearchContext } from "./SearchContext";
import "./style.css";

const List = ({ children }: { children: ReactNode }) => {
  return <ul className="list">{children}</ul>;
};

const Item = ({ children, id }: { children: ReactNode; id: any }) => {
  const { selectedSuggestion, selectedRef } = useSearchContext();
  return (
    <li
      className={`item ${selectedSuggestion == id && "selected"}`}
      ref={selectedSuggestion == id ? selectedRef : undefined}
    >
      {children}
    </li>
  );
};

List.Item = Item;

export default List;
