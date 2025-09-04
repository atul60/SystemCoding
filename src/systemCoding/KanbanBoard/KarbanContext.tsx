import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IKarbanBordContext {
  list: Array<any>;
  setList: Dispatch<SetStateAction<any[]>>;
}

const Context = createContext<IKarbanBordContext>({
  list: [],
  setList: () => {},
});

export const useBoardContext = () => {
  return useContext(Context);
};

export const Provider = ({ children }: any) => {
  const [list, setList] = useState<Array<any>>([
    {
      name: "Test1",
      status: 1,
    },
    {
      name: "Test2",
      status: 1,
    },
    {
      name: "Test3",
      status: 2,
    },
    {
      name: "Test4",
      status: 3,
    },
  ]);
  return (
    <Context.Provider value={{ list, setList }}>{children}</Context.Provider>
  );
};
