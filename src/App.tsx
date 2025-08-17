import { useState } from "react";
import "./App.css";
import InfiniteScroll from "./systemCoding/infiniteScroll/InfiniteScroll";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <InfiniteScroll />
    </div>
  );
}

export default App;
