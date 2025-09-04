import { Column } from "./Column";
import { Provider, useBoardContext } from "./KarbanContext";

const Board = [
  {
    name: "New",
    status: 1,
  },
  {
    name: "Dev In Progress",
    status: 2,
  },
  {
    name: "Done",
    status: 3,
  },
];

export const KanbanBoard = () => {
  return (
    <div className="board">
      {Board.map((item) => (
        <Column name={item.name} id={item.status} />
      ))}
    </div>
  );
};
