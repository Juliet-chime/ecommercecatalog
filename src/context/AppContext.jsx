import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState("xdd");
  const [allProduct, setAllProduct] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [allCategories, setAllCategories] = useState([]);

  return (
    <AppContext.Provider value={{ user, allProduct, setAllProduct,allCategories, setAllCategories,singleProduct, setSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
