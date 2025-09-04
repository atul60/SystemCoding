import "./App.css";
import { KanbanBoard } from "./systemCoding/KanbanBoard";
import { Provider } from "./systemCoding/KanbanBoard/KarbanContext";
import { SearchWithSuggestion } from "./systemCoding/SearchWithSuggestions";
// import InfiniteScroll from "./systemCoding/infiniteScroll/InfiniteScroll";

function App() {
  return (
    <div>
      <Provider>
        {/* <InfiniteScroll /> */}
        {/* <SearchWithSuggestion /> */}
        <KanbanBoard />
      </Provider>
    </div>
  );
}

export default App;
