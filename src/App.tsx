import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import Search from "./systemCoding/SearchWithSuggestions/Search";
import List from "./systemCoding/SearchWithSuggestions/List";
import { debounce } from "./systemCoding/SearchWithSuggestions/debounce";
// import InfiniteScroll from "./systemCoding/infiniteScroll/InfiniteScroll";

function App() {
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
    <div>
      {/* <InfiniteScroll /> */}
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
    </div>
  );
}

export default App;
