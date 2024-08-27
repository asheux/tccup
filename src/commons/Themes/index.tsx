import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { isMobile } from "src/helpers";

declare module "@mui/material/styles" {
  interface Components {
    MuiDateCalendar?: {
      styleOverrides?: {
        root?: React.CSSProperties;
      };
    };
    MuiPickersArrowSwitcher?: {
      styleOverrides?: {
        button?: React.CSSProperties;
      };
    };
    MuiPickersCalendarHeader?: {
      styleOverrides?: {
        root?: React.CSSProperties;
        switchViewIcon?: React.CSSProperties;
        label?: React.CSSProperties;
      };
    };
    MuiPickersDay?: {
      styleOverrides?: {
        today?: React.CSSProperties;
      };
    };
    MuiPickersYear?: {
      styleOverrides?: {
        yearButton?: React.CSSProperties;
      };
    };
  }
}

const commonThemes = {
  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          color: "inherit",
          backgroundColor: "inherit",
        },
        weekDayLabel: {
          fontSize: isMobile ? 20 : 12,
        },
      },
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        button: {
          color: "#ffffff",
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          backgroundColor: "#35495E",
        },
        switchViewIcon: {
          color: "#ffffff",
        },
        label: {
          fontSize: isMobile ? 20 : 12,
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontSize: isMobile ? 20 : 12,
        },
        today: {
          borderColor: "#35495E",
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        yearButton: {
          fontSize: isMobile ? 20 : 12,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          zIndex: "1400 !important",
        },
      },
    },
  },
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
    },
    text: {
      primary: "#BFBFBF",
    },
  },
  ...commonThemes,
  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#35495E",
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
    text: {
      primary: "#525252",
    },
  },
  ...commonThemes,
});

export const TccupTheme = (props) => {
  const { children, darkMode } = props;
  const theme = darkMode ? darkTheme : lightTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
