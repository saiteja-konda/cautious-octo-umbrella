import React, { useState, createContext, useMemo } from "react";

export const DashboardContext = createContext();
const ComponentContextProvier = ({ children }) => {
  const [component, setComponent] = useState("ProductCrud");

  const value = useMemo(
    () => ({
      component,
      setComponent,
    }),
    [component]
  );
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
export default ComponentContextProvier;
