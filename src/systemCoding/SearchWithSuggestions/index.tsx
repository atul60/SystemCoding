import { useCallback, useEffect, useState } from "react";
import { debounce } from "./debounce";
import Search from "./Search";
import List from "./List";

export const SearchWithSuggestion = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestion, setSuggestion] = useState<Array<any>>([]);
  const handleChange = (value: string) => {
    setSearchText(value);
  };

  const getData = useCallback((searchParams: string = "") => {
    const url = `https://api.addsearch.com/v1/suggest/1bed1ffde465fddba2a53ad3ce69e6c2?term=${searchParams}`;
    fetch(url)
      .then((res) => res.json())
      .then((data: any) => {
        // return data.suggestions;
        setSuggestion(data.suggestions);
        // console.log(data.suggestions);
      });
  }, []);
  const optFn = useCallback(debounce(getData, 500), []);

  useEffect(() => {
    optFn(searchText);
  }, [searchText]);

  return (
    <Search>
      <Search.SearchBox
        value={searchText}
        handleChange={handleChange}
        searchIcon={() => <Search.Icon>O</Search.Icon>}
      />
      <Search.Suggestion>
        <List>
          {suggestion?.map((item, index) => (
            <List.Item key={index} id={index}>
              {item.value}
            </List.Item>
          ))}
        </List>
      </Search.Suggestion>
    </Search>
  );
};
