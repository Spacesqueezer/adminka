// ThemeProvider.js
import React, { createContext, useState } from "react";
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { LightTheme, DarkTheme } from "./Themes";
import RobotoFont from "./fonts/Roboto-Regular.ttf";
import EastmanFont from "./fonts/EastmanRomanTrial-Regular.otf";
import Montserrat from "./fonts/Montserrat-Regular.ttf";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

const Fonts = createGlobalStyle`
@font-face {
  font-family: 'Roboto';
  src: url(${RobotoFont}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Eastman';
  src: url(${EastmanFont}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Montserrat';
  src: url(${Montserrat}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
`;

export { ThemeContext, ThemeProvider, Fonts };
