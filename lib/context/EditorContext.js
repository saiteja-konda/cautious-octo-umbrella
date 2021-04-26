import React, { createContext, useState } from "react";

export const EditorContext = createContext();
const EditorContextProvider = ({ children }) => {
  const [openthis, setOpenthis] = useState(false);
    const [component, setComponent] = useState("");

  const value = {
    openthis,
    setOpenthis,

    component,
    setComponent,
  };
  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

export default EditorContextProvider;
