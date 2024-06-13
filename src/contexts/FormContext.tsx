import { createContext, useMemo, useContext } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }: any) => {
  const bet = {};
  const values = useMemo(() => {bet}, [bet]);

  return <FormContext.Provider value={{values}}>{children}</FormContext.Provider>;
};

export const useFormController = () => useContext(FormContext);
