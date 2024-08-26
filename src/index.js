import * as React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import AppRoutes from "src/routes";
import { TccupTheme } from "src/commons/Themes";

import store from "src/redux/store";

const renderApp = () => {
  const container = document.getElementById("root");
  const root = createRoot(container);

  const App = () => {
    const [darkMode, setDarkMode] = React.useState(
      localStorage.getItem("darkTheme") === "true",
    );
    const [themeColor, setThemeColor] = React.useState(
      localStorage.themeColor != "undefined"
        ? localStorage.themeColor
        : "#000000",
    );

    const toggleTheme = () => {
      const newMode = !darkMode;
      setDarkMode(newMode);
      localStorage.setItem("darkTheme", String(newMode));
      const color = newMode ? "#ffffff" : "#000000";
      localStorage.setItem("themeColor", color);
      setThemeColor(color);
    };

    React.useEffect(() => {
      document.body.style.backgroundColor = themeColor; // Dark --> #202d3a
      return () => {
        document.body.style.backgroundColor = null;
      };
    }, [themeColor]);

    return (
      <Provider store={store}>
        <TccupTheme darkMode={darkMode}>
          <AppRoutes toggleTheme={toggleTheme} darkMode={darkMode} />
        </TccupTheme>
      </Provider>
    );
  };

  root.render(<App />);
};

// if (module.hot) {
//   module.hot.accept();
// }

renderApp();
