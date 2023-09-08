import React, { createContext, useState } from 'react';

const OpenSearchContext = createContext();

function SearchContextProvider({ children }) {
  const [openSearch, setOpenSearch] = useState(false);
  return <OpenSearchContext.Provider value={{ openSearch, setOpenSearch }}>{children}</OpenSearchContext.Provider>;
}

export { SearchContextProvider, OpenSearchContext };
