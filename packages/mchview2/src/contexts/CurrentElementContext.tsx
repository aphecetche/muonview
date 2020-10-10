import * as React from "react";
import { EnvelopWithValue } from "../__generated__/graphql-react";

type CurrentElementContextType = {
  currentElement: EnvelopWithValue | null;
  setCurrentElement: (element: EnvelopWithValue | null) => void
};

const CurrentElementContext = React.createContext<CurrentElementContextType | null>(
  null
);

const CurrentElementProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [
    currentElement,
    setCurrentElement,
  ] = React.useState<EnvelopWithValue | null>(null);

  return (
    <CurrentElementContext.Provider
      value={{ currentElement, setCurrentElement }}
    >
      {children}
    </CurrentElementContext.Provider>
  );
};

const useCurrentElement = () => {
  const context= React.useContext(CurrentElementContext);
  if (context === null) {
    throw new Error(
      "useCurrentElement must be used within a CurrentElementProvider"
    );
  } else {
    return context
  }
};

export { CurrentElementProvider, useCurrentElement };
