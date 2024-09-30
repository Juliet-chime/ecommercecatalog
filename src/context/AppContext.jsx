import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [allProduct, setAllProduct] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <AppContext.Provider
      value={{
        user,
        allProduct,
        setAllProduct,
        allCategories,
        setAllCategories,
        singleProduct,
        setSingleProduct,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
