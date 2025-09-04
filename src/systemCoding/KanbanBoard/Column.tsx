import { useBoardContext } from "./KarbanContext";
import { StatusCode } from "./enumeration";
import "./style.css";

interface IColumn {
  id: StatusCode;
  name: string;
}

interface IItem {
  name: string;
  status: StatusCode;
}

const Column = ({ id, name }: IColumn) => {
  console.log("id", id);
  const { list, setList } = useBoardContext();

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    id: StatusCode
  ) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    data.status = id;
    const updatedItemIndex = list.findIndex((item) => item.name == data.name);
    const copiedList = JSON.parse(JSON.stringify(list));
    copiedList[updatedItemIndex] = data;
    setList(copiedList);
  };

  const filteredList = list.filter((item) => item.status == id);
  console.log("filteredList", filteredList);
  return (
    <div className="column">
      <div className="header">{name}</div>
      <div
        className="section"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => handleDrop(event, id)}
      >
        {filteredList.map((item: IItem) => {
          return <Item key={item.name} name={item.name} status={item.status} />;
        })}
      </div>
    </div>
  );
};

const Item = ({ name, status }: IItem) => {
  const handleDragStart = (event: any, { name, status }: any) => {
    event.dataTransfer.setData("text/plain", JSON.stringify({ name, status })); // or JSON.stringify({ name, status })
  };

  return (
    <div
      className="item"
      draggable={true}
      onDragStart={(event) => handleDragStart(event, { name, status })}
      // onDrop={(event) => event.stopPropagation()}
    >
      <p>{name}</p>
    </div>
  );
};

export { Column };
