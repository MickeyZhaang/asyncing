import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { GlobalStyle, ThemeProvider, theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
