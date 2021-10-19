import React, { createContext, useState } from "react";

export const UiContext = createContext();

export const UiProvider = ({ children }) => {
  const [menuState, setMenuState] = useState(false);

  const showMenu = () => {
    setMenuState(false);
  };

  const hideMenu = () => {
    setMenuState(true);
  };

  return (
    <UiContext.Provider
      value={{
        hideMenu,
        showMenu,
        menuState,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
