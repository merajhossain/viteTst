import React, { ReactNode, createContext, useState } from "react";

//defined type
interface contextDataType {
  context: any;
  setContext: any;
}

// export const MainStateContext = createContext<contextDataType | undefined>(undefined);
export const MainStateContext = createContext<contextDataType | undefined>(
  undefined
);

type MainStateContextProps = {
  children: ReactNode;
};

export const MainStateContextProvider: React.FC<MainStateContextProps> = ({
  children,
}) => {
   // Define your context value
   const initialeditorData = useState<any>(); // You can replace this with your actual data

   // Use the useState hook to manage the context value
   const [context, setContext] = useState(initialeditorData);;
   
  return (
    <MainStateContext.Provider value={{ context, setContext }}>
      {children}
    </MainStateContext.Provider>
  );
};
