import * as React from "react";
import { Envelop } from "../__generated__/graphql-react";

type CurrentElementContextType = {
    currentElement: Envelop | null
    setCurrentElement: React.Dispatch<any>
}

const CurrentElementContext = React.createContext<CurrentElementContextType|null>(null);

const CurrentElementProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [currentElement, setIt] = React.useState(null);

  const setCurrentElement = (element: any) => {
      console.log("setCurrentElement with element=",element)
      setIt(element)
  }
  return (
    <CurrentElementContext.Provider value={{currentElement,setCurrentElement}}>
      {children}
    </CurrentElementContext.Provider>
  );
};

const useCurrentElement = () => {
    const context = React.useContext(CurrentElementContext)
    if (context===undefined) {
        throw new Error("useCurrentElement must be used within a CurrentElementProvider")
    }
    return context
}

export { CurrentElementProvider, useCurrentElement };
