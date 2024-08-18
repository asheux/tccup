import React, { createContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const PreviousRouteContext = createContext(null);

export const PreviousRouteProvider = ({ children }) => {
  const location = useLocation();
  const previousLocation = useRef(location);

  useEffect(() => {
    previousLocation.current = location;
  }, [location]);

  return (
    <PreviousRouteContext.Provider value={previousLocation.current}>
      {children}
    </PreviousRouteContext.Provider>
  );
};
