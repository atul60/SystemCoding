import { useEffect, useState } from "react";
import "../../App.css";

const API_URL = "https://api.escuelajs.co/api/v1/products"; //";

async function callData(offset = 0, limit = 10): Promise<any> {
  try {
    const promise = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`);
    const data = await promise.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
interface ItemType {
  id: number;
  title: string;
}

const InfiniteScroll = () => {
  const [pageInfo, setPageInfo] = useState({
    offset: 0,
    limit: 20,
  });
  const [data, setData] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const { offset, limit } = pageInfo;
        setIsLoading(true);
        const newData = await callData(offset, limit);
        setData((prev) => [...prev, ...newData]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [pageInfo]);

  const handleScroll = (event: any) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const position = Math.ceil(
      ((scrollTop + clientHeight) / scrollHeight) * 100
    );
    if (position > 90 && !isLoading) {
      setPageInfo((prev) => ({ ...prev, offset: prev.offset + 1 }));
    }
  };

  return (
    <ul onScroll={handleScroll} className="ItemsList">
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
      {isLoading && <div>...Loading</div>}
    </ul>
  );
};

export default InfiniteScroll;
